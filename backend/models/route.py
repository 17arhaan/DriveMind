# backend/models/route.py
from typing import List, Dict
from pydantic import BaseModel

class Waypoint(BaseModel):
    lat: float
    lng: float

class RouteRequest(BaseModel):
    source: Waypoint
    destination: Waypoint

class RouteOption(BaseModel):
    path: List[Waypoint]
    distance_m: float
    eta_s: float
    score: float  # RL score or efficiency

class RouteResponse(BaseModel):
    best_route: RouteOption
    alternates: List[RouteOption]
