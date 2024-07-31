from app import mongo
from bson.objectid import ObjectId
from ..helpers import serialize_object_id
from typing import List, Dict


def add_to_favorites(user_id: str, product_id: str) -> dict:
    users_collection = mongo.db.users
    result = users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$addToSet": {"fav_products": product_id}}
    )
    return result.raw_result


def remove_from_favorites(user_id: str, product_id: str) -> dict:
    users_collection = mongo.db.users
    result = users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$pull": {"fav_products": product_id}}
    )
    return result.raw_result


def get_user_favorites(user_id: str) -> list:
    users_collection = mongo.db.users
    products_collection = mongo.db.products
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if user and 'fav_products' in user:
        product_ids = [ObjectId(pid) for pid in user["fav_products"]]
        products = list(products_collection.find({"_id": {"$in": product_ids}}))
        return [serialize_object_id(product) for product in products]
    return []


def sync_basket_service(user_id: str, basket: List[Dict]) -> dict:
    users_collection = mongo.db.users
    result = users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"basket": basket}}
    )
    if result.modified_count > 0:
        return {"message": "Basket successfully updated."}
    else:
        return {"message": "No changes made to the basket."}


def get_user_basket(user_id: str) -> List[Dict]:
    users_collection = mongo.db.users
    user = users_collection.find_one({"_id": ObjectId(user_id)})

    if user and 'basket' in user:
        return user['basket']

    return []
