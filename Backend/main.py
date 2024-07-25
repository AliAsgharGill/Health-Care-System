from fastapi import FastAPI, Depends
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware

from api.appointments import appointments_router
from api.doctors import get_doctors
from api.users import user_router

def make_middlewares():
    middlewawre = [
        Middleware(
            CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
        )
    ]

    return middlewawre


app = FastAPI(middleware=make_middlewares())

app.include_router(user_router, prefix="/register", tags=["Auth"])

app.include_router(get_doctors, prefix="/doctors", tags=["Doctor"])

app.include_router(appointments_router, prefix="/appointments", tags=["Appointment"])

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", port=8000, reload=True)
