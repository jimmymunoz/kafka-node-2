const {Kafka} = require('kafkajs')

async function run() {
  try {
    // Establish TCP connection
    const kafka = new Kafka({
      'clientId': 'myapp',
      'brokers': ['Jimmys-iMac.local:9092'],
    })

    const admin = kafka.admin()
    console.log('Connecting...')
    await admin.connect()
    console.log('Connected')
    // A-M - M-Z
    await admin.createTopics({
      'topics': [
        {
          topic: "Users",
          numPartitions: 2,
        }
      ]
    })
    console.log('Done')
    await admin.disconnect()
  } catch (e) {
    console.error('Some error' + e);
  }
  finally {
    process.exit(0)
  }
}

run()