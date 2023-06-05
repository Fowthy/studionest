import json
from ssl import SSLContext
import uuid
from aio_pika import connect_robust, IncomingMessage, ExchangeType, Message
import pika
import logging

logging.basicConfig()
logger = logging.getLogger("uvicorn")


class PikaClient:
    def __init__(self, process_callable):
        self.publish_queue_name = 'foo_publish_queue'
        credentials = pika.PlainCredentials('prplgkdh', 'qmbitoyvshaCmKaONi5hckYEaki1lDv6')
        
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='rattlesnake.rmq.cloudamqp.com',port=5672, virtual_host='prplgkdh', credentials=credentials)
        )

        self.channel = self.connection.channel()
        self.publish_queue = self.channel.queue_declare(queue=self.publish_queue_name)
        self.callback_queue = self.publish_queue.method.queue
        self.response = None
        self.process_callable = process_callable
        logger.info('Pika connection initialized')
        
    async def consume(self, loop):
        connection = await connect_robust(host='rattlesnake.rmq.cloudamqp.com',
                                        port=5672,
                                        login='prplgkdh',
                                        password='qmbitoyvshaCmKaONi5hckYEaki1lDv6',
                                        virtualhost='prplgkdh',
                                        loop=loop)
        channel = await connection.channel()
        queue = await channel.declare_queue( 'foo_publish_queue')
        await queue.consume(self.process_incoming_message, no_ack=False)
        logger.info('Established pika async listener')
        return connection

    async def process_incoming_message(self, message):
        message.ack()
        body = message.body
        logger.info('Received message')
        if body:
            self.process_callable(json.loads(body))
            


    def send_message(self, message: dict):
        self.channel.basic_publish(
            exchange='',
            routing_key=self.publish_queue_name,
            properties=pika.BasicProperties(
                reply_to=self.callback_queue,
                correlation_id=str(uuid.uuid4())
            ),
            body=json.dumps(message)
        )
