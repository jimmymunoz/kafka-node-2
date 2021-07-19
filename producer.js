const {Kafka} = require('kafkajs')

const msg = process.argv[2]

async function run() {
  try {
    // Establish TCP connection
    const kafka = new Kafka({
      'clientId': 'myapp',
      'brokers': ['Jimmys-iMac.local:9092'],
    })

    const producer = kafka.producer()
    console.log('Connecting...')
    await producer.connect()
    console.log('Connected')
    // A-M - M-Z
    const partition = msg[0] < "N" ? 0 :1
    const result = await producer.send({
      topic: 'Users',
      messages: [
        {
          value: msg,
          partition 
        }
      ]
    })
    console.log(`Send successfully ${JSON.stringify(result, null, 2)}`)
    await producer.disconnect()
  } catch (e) {
    console.error('Some error' + e);
  }
  finally {
    process.exit(0)
  }
}

run()