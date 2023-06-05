import json
from ssl import SSLContext
import uuid
from aio_pika import connect_robust, IncomingMessage, ExchangeType, Message
import pika
import threading
from bson import json_util


import logging

logging.basicConfig()
logger = logging.getLogger("uvicorn")

class PikaClient:
    def __init__(self, process_callable):
        credentials = pika.PlainCredentials('prplgkdh', 'qmbitoyvshaCmKaONi5hckYEaki1lDv6')
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(host='rattlesnake.rmq.cloudamqp.com',port=5672, virtual_host='prplgkdh', credentials=credentials)
        )

        self.channel = self.connection.channel()
        self.process_callable = process_callable

        logger.info('Pika connection initialized')

    def callback(self, method, properties, body):
        print(" [x] Received %r" % body)

    async def process_incoming_message(self, message):
        """Processing incoming message from RabbitMQ"""
        await message.ack()
        body = message.body
        if body:
            await self.process_callable(json.loads(body))

    async def consume(self, loop, exchange, routing_key):
        """Setup message listener with the current running loop"""
        connection = await connect_robust(host="rattlesnake.rmq.cloudamqp.com",
                                        port=5672, virtualhost='prplgkdh',
                                        login="prplgkdh",
                                        password="qmbitoyvshaCmKaONi5hckYEaki1lDv6",
                                        loop=loop)
        channel = await connection.channel()
        
        # Delete the 'rooms' exchange
        # await channel.exchange_delete('rooms')
        exchange = await channel.declare_exchange(exchange,ExchangeType.FANOUT)
        queue = await channel.declare_queue(routing_key, durable=True)
        await queue.bind(exchange)
        await queue.consume(self.process_incoming_message, no_ack=False)
        # await exchange.bind(exchange=exchange,routing_key=q)
        logger.info('Established pika async listener')
        return connection

class PikaClientPublish:
    def __init__(self):
            credentials = pika.PlainCredentials('prplgkdh', 'qmbitoyvshaCmKaONi5hckYEaki1lDv6')
            self.connection = pika.BlockingConnection(
                pika.ConnectionParameters(host='rattlesnake.rmq.cloudamqp.com',port=5672, virtual_host='prplgkdh', credentials=credentials)
            )

            self.channel = self.connection.channel()

    def publish(self, exchange, routing_key, message):
        json_str = json_util.dumps(message)
        print(json_str)
        print(routing_key)
        print(exchange)

        self.channel.basic_publish(exchange=exchange, routing_key=routing_key, body=json_str)