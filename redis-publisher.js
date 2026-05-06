const { connectRedis, client } = require("./redis-client");

async function publishRedisEvent(channel, data) {
    await connectRedis()
    await client.publish(channel, JSON.stringify(data))
    console.info("Published to %s data:%s", channel, data)
}

publishRedisEvent("order_data", { id: 2, title: "small box of candies", amount: 1.99, currency: "USD", currencySymbol: "$" })