from flask import jsonify
from app.services.product_service import get_all_products, get_product_by_id


def fetch_all_products():
    products = get_all_products()
    return jsonify(products)


def get_single_product(product_id):
    product = get_product_by_id(product_id)
    if product:
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404
