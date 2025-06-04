# backend/utils/logging.py
import logging

logger = logging.getLogger("drivemind")
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
formatter = logging.Formatter("%(asctime)s | %(levelname)s | %(name)s | %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)
