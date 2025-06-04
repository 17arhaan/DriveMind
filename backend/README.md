# DriveMind Backend

This is the backend service for DriveMind, providing vision, audio, and route inference capabilities.

## Initial Setup

1. Install PostgreSQL and Redis:
```bash
# On macOS with Homebrew:
brew install postgresql redis

# Start services:
brew services start postgresql
brew services start redis
```

2. Create the database:
```bash
createdb drivemind
```

3. Create a virtual environment and install dependencies:
```bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

4. Initialize the database:
```bash
python init_db.py
```

5. Test the setup:
```bash
python test_setup.py
```

## Running the Service

Start the server:
```bash
python run.py
```

The service will be available at http://localhost:8000

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Initial Testing

1. Test the health endpoint:
```bash
curl http://localhost:8000/ping/
```

2. Create a test user:
```bash
curl -X POST http://localhost:8000/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass", "full_name": "Test User"}'
```

## Next Steps

1. Add JWT authentication
2. Integrate with Google Maps API
3. Set up the RL model
4. Add more comprehensive testing 