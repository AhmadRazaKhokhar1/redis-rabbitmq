const { createClient } = require("redis")

async function subscribeToRedisEvent(channel){
    const subscriber = await createClient({
        url:"redis://localhost:6379"
    })
    await subscriber.connect()
    subscriber.subscribe(channel, (stringData)=>{
        const parsedData = JSON.parse(stringData)
        console.info("data from redis:%s", parsedData)
    })
}

subscribeToRedisEvent("order_data")