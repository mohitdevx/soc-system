import subprocess
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn


class BackendSchema(BaseModel):
    action: str


app = FastAPI()


@app.post("/agent/action")
async def take_action(action: BackendSchema):
    data = action.action
    cmd = data.split(" ")
    try:
        subprocess.run(cmd)
    except:
        return {"success": False}

    return {"success": "ok"}


def run():
    uvicorn.run(app, host="0.0.0.0", port=5000)
