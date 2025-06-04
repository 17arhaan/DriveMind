# backend/routers/route.py
from fastapi import APIRouter, HTTPException, Depends
from ..models.route import RouteRequest, RouteResponse
from ..services.route_service import get_best_and_alternates

router = APIRouter()

@router.post("/", response_model=RouteResponse)
async def infer_route(payload: RouteRequest):
    """
    Accept source & destination, return the best route + alternates.
    """
    try:
        best, alts = get_best_and_alternates(payload.source, payload.destination)
        return {"best_route": best, "alternates": alts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
