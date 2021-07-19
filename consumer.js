const {Kafka} = require('kafkajs')


async function run() {
  try {
    // Establish TCP connection
    const kafka = new Kafka({
      'clientId': 'myapp',
      'brokers': ['Jimmys-iMac.local:9092'],
    })

    const consumer = kafka.consumer({groupId: 'test'})
    console.log('Connecting...')
    await consumer.connect()
    console.log('Connected')

    await consumer.subscribe({
      topic: "Users",
      fromBeginning: true
    })

    await consumer.run({
      eachMessage: async result => {
        console.log(`RDV Message ${result.message.value} on partition ${result.partition}`)
      }
    })
    
    
    // console.log(`Send successfully ${JSON.stringify(result, null, 2)}`)
  } catch (e) {
    console.error('Some error' + e);
  }
}

run()