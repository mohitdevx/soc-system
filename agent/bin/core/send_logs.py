import aiohttp  # type: ignore
import asyncio
from config import app_config as cfg
from .tailer import event_queue
from models import payload_streams

BACKEND_URL = cfg['worker']['backend_url'] or "http://localhost:8000"

def send_logs():

    batch = []
    while not event_queue.empty():
        batch.append(event_queue.get())
    asyncio.run(send_batch(batch)) 


async def send_batch(raw):
    payload = payload_streams(raw)
    headers = { 
        "Content-Type": "application/msgpack",
        "x-api-key" : "dummy_key"
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(BACKEND_URL, data=payload, headers=headers) as r:
            try:
                if r.status == 200:
                    print("successfylly send bach")
                    print(r.text())
            except Exception as e:
                print("something went wrong", e)


        