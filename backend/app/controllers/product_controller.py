from flask import request, jsonify
from app.services.product_service import get_products, get_product_by_id


def search_products():
    name = request.args.get('name')
    category = request.args.get('category')
    sort_by = request.args.get('sort_by', 'name')
    order = int(request.args.get('order', 1))

    query = {}
    if name:
        query['name'] = {'$regex': name, '$options': 'i'}
    if category:
        query['category'] = category

    products = get_products(query, sort_by, order)
    return jsonify(products)


def get_single_product(product_id):
    product = get_product_by_id(product_id)
    if product:
        return jsonify(product)
    return jsonify({'error': 'Product not found'}), 404
