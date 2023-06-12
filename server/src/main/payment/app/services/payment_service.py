from typing import List
from bson import ObjectId
from fastapi_security import logger
from ..models import Room
from ..mongodb import db
import stripe


stripe.api_key = "sk_test_..."

# list customers
customers = stripe.Customer.list()

# print the first customer's email
print(customers.data[0].email)

# retrieve specific Customer
customer = stripe.Customer.retrieve("cus_123456789")

# print that customer's email
print(customer.email)