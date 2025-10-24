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
                    // Spawn within a smaller area for testing (20x15 grid for 800x600 canvas with 40px grid)
                    this.x = Math.floor(Math.random() * Math.min(20, space?.width || 20));
                    this.y = Math.floor(Math.random() * Math.min(15, space?.height || 15));
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
                    console.log(`Move request received from user ${this.userId}: (${this.x}, ${this.y}) -> (${parsedData.payload.x}, ${parsedData.payload.y})`);
                    const moveX = parsedData.payload.x;
                    const moveY = parsedData.payload.y;
                    const xDisplacement = Math.abs(this.x - moveX);
                    const yDisplacement = Math.abs(this.y - moveY);
                    
                    // Validate bounds (20x15 for testing)
                    if (moveX < 0 || moveX >= 20 || moveY < 0 || moveY >= 15) {
                        console.log(`Movement rejected - out of bounds: (${moveX}, ${moveY})`);
                        this.send({
                            type: "movement-rejected",
                            payload: {
                                x: this.x,
                                y: this.y
                            }
                        });
                        return;
                    }
                    
                    if ((xDisplacement == 1 && yDisplacement== 0) || (xDisplacement == 0 && yDisplacement == 1)) {
                        console.log(`Movement accepted: (${this.x}, ${this.y}) -> (${moveX}, ${moveY})`);
                        this.x = moveX;
                        this.y = moveY;
                        
                        // Send acknowledgment to the moving user
                        this.send({
                            type: "movement-accepted",
                            payload: {
                                x: this.x,
                                y: this.y
                            }
                        });
                        
                        // Broadcast to other users
                        RoomManager.getInstance().broadcast({
                            type: "movement",
                            payload: {
                                userId: this.userId,
                                x: this.x,
                                y: this.y
                            }
                        }, this, this.spaceId!);
                        return;
                    }
                    
                    console.log(`Movement rejected - invalid displacement: x=${xDisplacement}, y=${yDisplacement}`);
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