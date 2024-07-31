from bson import ObjectId
from typing import Any, Dict


def serialize_object_id(obj: Any) -> Any:
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {k: serialize_object_id(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [serialize_object_id(i) for i in obj]
    return obj


def to_dict(model: Any) -> Dict:
    if hasattr(model, 'dict'):
        return model.dict()
    raise ValueError("Provided object does not have a dict() method.")
