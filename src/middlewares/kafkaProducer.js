// kafkaProducer.js

const { Kafka } = require('kafkajs');

// Function to send message to Kafka
const sendToKafka = async (topic, message) => {
  try {
    // Create Kafka producer instance
    const kafka = new Kafka({
      clientId: 'my-app', 
      brokers: ['localhost:9092'], 
    });

    const producer = kafka.producer();

    console.log("connected");
    await producer.connect();

    // Example of sending a message to Kafka topic
    await producer.send({
      topic:"appoiment",
      messages: [
        { value: JSON.stringify(message) },
      ],
    });

    // Disconnect from Kafka
    await producer.disconnect();
    console.log('Message sent to Kafka:', message);
  } catch (err) {
    // Handle producer error
    console.error('Failed to send message to Kafka:', err);
    throw err;
  }
};

module.exports = {
  sendToKafka,
};
