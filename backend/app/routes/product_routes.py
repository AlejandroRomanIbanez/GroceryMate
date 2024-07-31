from flask import Blueprint
from app.controllers.product_controller import search_products, get_single_product

product_bp = Blueprint('product', __name__, url_prefix='/api/products')

product_bp.route('/search', methods=['GET'])(search_products)
product_bp.route('/<product_id>', methods=['GET'])(get_single_product)
