from database.models import SQLModel
from dependencies import engine

def init_db():
    print("Creating database tables...")
    SQLModel.metadata.create_all(engine)
    print("Database tables created successfully!")

if __name__ == "__main__":
    init_db() 