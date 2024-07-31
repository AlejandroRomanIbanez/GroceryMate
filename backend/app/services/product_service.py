from app import mongo
from bson import ObjectId
from typing import List, Dict
from ..helpers import serialize_object_id


def get_all_products() -> List[Dict]:
    products_collection = mongo.db.products
    products = list(products_collection.find())
    return [serialize_object_id(product) for product in products]


def get_product_by_id(product_id: str) -> Dict:
    products_collection = mongo.db.products
    product = products_collection.find_one({"_id": ObjectId(product_id)})
    if product:
        return serialize_object_id(product)
    return {}
