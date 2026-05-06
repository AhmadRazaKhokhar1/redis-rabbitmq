const amqp = require('amqplib');
const createRabbitMQConnection = require('./config/rabbit-mq');

(async () => {
  const { amqp_channel } = await createRabbitMQConnection()
  const queue = 'amqp_queue';

  await amqp_channel.assertQueue(queue, {
    durable: true,
    arguments: {
      'x-queue-type': 'quorum'
    }
  });

  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
  amqp_channel.consume(queue, function (msg) {
    const {date, msg:message} = JSON.parse(msg.content);

    console.log(" [%s] Received %s",date, message);
  }, {
    noAck: true
  });
})()