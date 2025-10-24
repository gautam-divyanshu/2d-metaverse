import { WebSocket } from "ws";
import { RoomManager } from "./RoomManager";
import { OutgoingMessage } from "./types";
import client from "@repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

function getRandomString(length: number) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export class User {
    public id: string;
    public userId?: string;
    private spaceId?: string;
    public x: number;
    public y: number;
    private ws: WebSocket;

    constructor(ws: WebSocket) {
        this.id = getRandomString(10);
        this.x = 0;
        this.y = 0;
        this.ws = ws;
        this.initHandlers()
    }

    initHandlers() {
        this.ws.on("message", async (data) => {
            console.log(data)
            const parsedData = JSON.parse(data.toString());
            console.log(parsedData)
            console.log("parsedData")
            switch (parsedData.type) {
                case "join":
                    console.log("join received")
                    const spaceId = parsedData.payload.spaceId;
                    const token = parsedData.payload.token;
                    
                    // Validate required fields
                    if (!spaceId || !token) {
                        console.log("Missing spaceId or token in join request")
                        this.ws.close()
                        return
                    }
                    
                    let userId;
                    try {
                        userId = (jwt.verify(token, JWT_PASSWORD) as JwtPayload).userId
                    } catch (error) {
                        console.log("Invalid token:", error instanceof Error ? error.message : "Unknown error")
                        this.ws.close()
                        return
                    }
                    
                    if (!userId) {
                        console.log("No userId found in token")
                        this.ws.close()
                        return
                    }
                    console.log("jouin receiverdfd 2")
                    this.userId = userId
                    const space = await client.space.findFirst({
                        where: {
                            id: spaceId
                        }
                    })
                    console.log("jouin receiverdfd 3")
                    if (!space) {
                        this.ws.close()
                        return;
                    }
                    console.log("jouin receiverdfd 4")
                    this.spaceId = spaceId
                    RoomManager.getInstance().addUser(spaceId, this);
                    // Spawn at a safe position within the space bounds
                    this.x = Math.floor(Math.random() * space.width);
                    this.y = Math.floor(Math.random() * space.height);
                    this.send({
                        type: "space-joined",
                        payload: {
                            spawn: {
                                x: this.x,
                                y: this.y
                            },
                            userId: this.userId,
                            users: RoomManager.getInstance().rooms.get(spaceId)?.filter(x => x.id !== this.id)?.map((u) => ({id: u.id, userId: u.userId, x: u.x, y: u.y})) ?? []
                        }
                    });
                    console.log("jouin receiverdf5")
                    RoomManager.getInstance().broadcast({
                        type: "user-joined",
                        payload: {
                            userId: this.userId,
                            x: this.x,
                            y: this.y
                        }
                    }, this, this.spaceId!);
                    break;
                case "move":
                    const moveX = parsedData.payload.x;
                    const moveY = parsedData.payload.y;
                    const isTeleport = parsedData.payload.teleport || false;
                    const xDisplacement = Math.abs(this.x - moveX);
                    const yDisplacement = Math.abs(this.y - moveY);
                    
                    if (isTeleport) {
                        console.log(`Teleport request: ${this.userId} from (${this.x}, ${this.y}) to (${moveX}, ${moveY})`);
                    }
                    
                    // Get space dimensions and validate movement
                    if (!this.spaceId) {
                        return;
                    }
                    
                    const isValidMove = await this.validateMovement(moveX, moveY, xDisplacement, yDisplacement, isTeleport);
                    
                    if (isValidMove) {
                        // Update position immediately
                        this.x = moveX;
                        this.y = moveY;
                        
                        // Broadcast to other users FIRST for speed
                        RoomManager.getInstance().broadcast({
                            type: "movement",
                            payload: {
                                userId: this.userId,
                                x: this.x,
                                y: this.y
                            }
                        }, this, this.spaceId!);
                        
                        // Send acknowledgment to the moving user
                        this.send({
                            type: "movement-accepted",
                            payload: {
                                x: this.x,
                                y: this.y
                            }
                        });
                        return;
                    }
                    
                    // Movement rejected - send current position
                    this.send({
                        type: "movement-rejected",
                        payload: {
                            x: this.x,
                            y: this.y
                        }
                    });
                    
            }
        });
    }

    async validateMovement(newX: number, newY: number, xDisplacement: number, yDisplacement: number, isTeleport: boolean = false): Promise<boolean> {
        try {
            // 1. Movement validation: allow teleport or single step movement
            if (!isTeleport && !((xDisplacement == 1 && yDisplacement == 0) || (xDisplacement == 0 && yDisplacement == 1))) {
                return false;
            }
            
            // 2. Quick check: collision with other players (no DB query needed)
            const roomUsers = RoomManager.getInstance().rooms.get(this.spaceId!) || [];
            for (const otherUser of roomUsers) {
                if (otherUser.id !== this.id && otherUser.x === newX && otherUser.y === newY) {
                    return false; // Player collision
                }
            }
            
            // 3. Get space data (optimized query - only get what we need)
            const space = await client.space.findFirst({
                where: { id: parseInt(this.spaceId!) },
                select: {
                    width: true,
                    height: true,
                    elements: {
                        select: {
                            x: true,
                            y: true,
                            element: {
                                select: {
                                    width: true,
                                    height: true
                                }
                            }
                        }
                    }
                }
            });
            
            if (!space) {
                return false;
            }
            
            // 4. Check boundaries
            if (newX < 0 || newX >= space.width || newY < 0 || newY >= space.height) {
                return false;
            }
            
            // 5. Check element collisions (all elements are obstacles)
            for (const spaceElement of space.elements) {
                const element = spaceElement.element;
                
                if (newX >= spaceElement.x &&
                    newX < spaceElement.x + element.width &&
                    newY >= spaceElement.y &&
                    newY < spaceElement.y + element.height) {
                    return false; // Element collision
                }
            }
            
            return true;
        } catch (error) {
            return false;
        }
    }

    destroy() {
        RoomManager.getInstance().broadcast({
            type: "user-left",
            payload: {
                userId: this.userId
            }
        }, this, this.spaceId!);
        RoomManager.getInstance().removeUser(this, this.spaceId!);
    }

    send(payload: OutgoingMessage) {
        this.ws.send(JSON.stringify(payload));
    }
}