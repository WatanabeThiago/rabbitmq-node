import express from 'express'
import { Request, Response} from 'express'
import amqp  from 'amqplib/callback_api'
const app = express()

app.use(express.json())

app.post('/publishMessage', (req: Request, res: Response) => {
  console.log(req.body)
  const { message } = req.body
  amqp.connect('amqp://sovereign:secret@localhost', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1: unknown, channel: any) {
      if (error1) {
        throw error1;
      }
      var queue = 'hello';

      channel.assertQueue(queue, {
        durable: false
      });

      channel.sendToQueue(queue, Buffer.from(message));
      console.log(" [x] Sent %s", message);
    });
  });})

app.get('/messages', (req: Request, res: Response) => {
    return 'rota ok tbm'
})

app.listen(3000, () => {
  console.log(['📢 Servidor iniciado.'])
})
