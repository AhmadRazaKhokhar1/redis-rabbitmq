const amqp = require('amqplib');

async function createRabbitMQConnection(){
    const amqp_connection = await amqp.connect('amqp://localhost');
    const amqp_channel = await amqp_connection.createChannel();

    return {
        amqp_connection,
        amqp_channel
    }
}

module.exports = createRabbitMQConnection