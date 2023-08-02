from fastapi import FastAPI
from db.session import engine
from db.session import Base
from api.base import apiRouter
import uvicorn


def create_tables():
    Base.metadata.create_all(bind=engine)
    
def include_router(application):
    application.include_router(apiRouter)
    
def start_app():
    application = FastAPI()
    create_tables()
    include_router(application)
    return application

app = start_app()

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)