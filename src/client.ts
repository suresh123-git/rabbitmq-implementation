import { ClientProxyFactory, Transport } from '@nestjs/microservices';

async function sendMessage() {
  const client = ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'main_queue',
      queueOptions: { durable: true },
    },
  });

  await client.connect();
    client.emit('hello', { msg: 'Hello from client!' });

  // work queue
    client.emit('process_task', {taskId: 123} );

    // RPC (Request-Reply) – Command-Driven
    client.send('get_user_details', 101).subscribe(response => {
    console.log('User details:', response);
  });

  // fanout
  client.emit('logs_exchange', { message: 'New log from fanout broadcast!' });
}

sendMessage();
