import redis
from sqlmodel import Session
from dependencies import engine, get_redis

def test_redis():
    print("Testing Redis connection...")
    try:
        redis_client = get_redis()
        redis_client.ping()
        print("✅ Redis connection successful!")
    except Exception as e:
        print(f"❌ Redis connection failed: {e}")

def test_database():
    print("Testing Database connection...")
    try:
        with Session(engine) as session:
            session.execute("SELECT 1")
        print("✅ Database connection successful!")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")

if __name__ == "__main__":
    print("Testing DriveMind Backend Setup...")
    print("-" * 40)
    test_redis()
    test_database()
    print("-" * 40)
    print("Setup test completed!") 