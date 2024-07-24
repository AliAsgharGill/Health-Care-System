from fastapi import FastAPI
from api.users import user_router
app = FastAPI()

app.include_router(user_router, prefix="/register", tags=["Auth"])



if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", port=8000, reload=True)
