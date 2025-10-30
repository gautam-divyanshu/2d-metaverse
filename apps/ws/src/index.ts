require('dotenv').config();
import { WebSocketServer } from 'ws';
import { User } from './User';

const wss = new WebSocketServer({ port: 3001 });

wss.on('connection', async function connection(ws) {
  ws.send(
    JSON.stringify({
      class: 'game',
      type: 'workers-created',
      payload: {},
    })
  );

  let user = new User(ws);

  ws.on('error', console.error);

  ws.on('close', () => {
    user.destroy();
  });
});
