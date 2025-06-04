import uvicorn
import sys
from test_setup import test_redis, test_database

def check_dependencies():
    print("Checking dependencies...")
    test_redis()
    test_database()

def run_server():
    print("Starting DriveMind Backend server...")
    try:
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info"
        )
    except Exception as e:
        print(f"Failed to start server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    check_dependencies()
    run_server() 