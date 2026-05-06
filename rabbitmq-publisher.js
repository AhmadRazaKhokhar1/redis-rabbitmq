const redis = require('redis');
const createRabbitMQConnection = require('./config/rabbit-mq');

(async()=>{
  const { amqp_channel, amqp_connection } =  await createRabbitMQConnection()

const queue = 'amqp_queue';
const msg = 'Hello World!';

amqp_channel.assertQueue(queue, {
  durable: true,
  arguments: {
    'x-queue-type': 'quorum'
  }
}).then((value)=>console.info(value)).catch((err)=>console.error(err));
const dt = new Date();
const date = `${dt.toDateString()} - ${dt.toLocaleTimeString("en-US",{
  "hour":"2-digit",
  "minute":"2-digit",
  "hour12":true
})}`
const content = JSON.stringify({msg, date});
amqp_channel.sendToQueue(queue, Buffer.from(content));
console.log("[%s] Sent %s", date, msg);

setTimeout(function() {
  amqp_connection.close();
  process.exit(0)
}, 500);
})()