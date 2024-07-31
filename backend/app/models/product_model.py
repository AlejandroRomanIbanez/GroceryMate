from pydantic import BaseModel, Field, HttpUrl
from typing import Optional, Dict
from enum import Enum
from ..helpers import to_dict


class ProductCategory(Enum):
    FRUITS = "Fruits"
    VEGETABLES = "Vegetables"
    DAIRY = "Dairy"
    MEAT = "Meat"
    BAKERY = "Bakery"
    BEVERAGES = "Beverages"
    SNACKS = "Snacks"
    CANNED_GOODS = "Canned Goods"
    FROZEN_FOODS = "Frozen Foods"
    HOUSEHOLD = "Household"
    PERSONAL_CARE = "Personal Care"
    CLEANING_SUPPLIES = "Cleaning Supplies"
    PANTRY = "Pantry"
    ALCOHOL = "Alcohol"


class ProductModel(BaseModel):
    name: str = Field(..., description="Name of the product")
    description: str = Field(..., description="Description of the product")
    price: float = Field(..., gt=0, description="Price of the product, must be greater than 0")
    category: ProductCategory = Field(..., description="Category of the product")
    image_url: HttpUrl = Field(..., description="URL of the product image")
    is_fav: bool = Field(default=False, description="Indicates if the product is favorite")
    is_alcohol: bool = Field(default=False, description="Indicates if the product is alcoholic")

    def to_dict(self) -> Dict:
        return to_dict(self)
