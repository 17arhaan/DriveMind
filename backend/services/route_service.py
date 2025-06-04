# backend/services/route_service.py
import time
import random
from typing import List

from ..models.route import Waypoint, RouteOption

def compute_base_google_route(source: Waypoint, destination: Waypoint) -> RouteOption:
    """
    Placeholder: would normally call Google Maps Directions API here.
    For now, return a dummy straight-line path with random ETA.
    """
    # Dummy: straight line between source/dest
    path = [source, destination]
    distance = random.uniform(10000, 50000)  # meters
    eta = distance / 15  # assume 15 m/s ≈ 54 km/h
    return RouteOption(path=path, distance_m=distance, eta_s=eta, score=0.5)

def compute_rl_route(source: Waypoint, destination: Waypoint) -> RouteOption:
    """
    Placeholder RL‐based route. In reality, load RL model, feed state, get action.
    """
    path = [source, destination]
    distance = random.uniform(9000, 48000)
    eta = distance / 16  # RL tries to be slightly faster
    return RouteOption(path=path, distance_m=distance, eta_s=eta, score=0.8)

def get_best_and_alternates(source: Waypoint, destination: Waypoint):
    start = time.time()
    base = compute_base_google_route(source, destination)
    rl = compute_rl_route(source, destination)
    alternates = [base, rl]
    # Pick RL if its score is higher
    best = rl if rl.score > base.score else base
    elapsed = (time.time() - start) * 1000
    # You could log elapsed somewhere
    return best, alternates
