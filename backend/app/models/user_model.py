from pydantic import BaseModel, Field
from typing_extensions import List, Dict
from ..helpers import to_dict


class BasketItem(BaseModel):
    product_id: str
    quantity: int


class User(BaseModel):
    username: str = Field(..., min_length=1, max_length=50)
    password: str = Field(..., min_length=6)
    fav_products: List[str] = Field(default_factory=list)
    basket: List[BasketItem] = Field(default_factory=list)

    def to_dict(self) -> Dict:
        return to_dict(self)
