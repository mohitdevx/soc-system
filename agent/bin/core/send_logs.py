import aiohttp  # type: ignore
import asyncio
from ..config import cfg
from .tailer import event_queue
from ..models import payload_streams
import time
import json
import os
from dotenv import load_dotenv 
load_dotenv()

BACKEND_URL = os.getenv('BACKEND_URL') or cfg["worker"]["backend_url"] or "http://localhost:8000"

def send_logs(timeout):
    while True:
        time.sleep(0.1)
        batch = []
        while not event_queue.empty():
            try:
                batch.append(event_queue.get_nowait())
            except:
                event_queue.empty()
                break
        if batch:
            asyncio.run(send_batch(batch, timeout))


async def send_batch(raw, time):
    payload = payload_streams(raw)
    headers = {"Content-Type": "application/msgpack", "x-api-key": "dummy_key"}

    timeout = aiohttp.ClientTimeout(total=time)
    async with aiohttp.ClientSession(timeout=timeout) as session:
        async with session.post(BACKEND_URL, data=payload, headers=headers) as r:
            try:
                if r.status == 200:
                    print("successfylly send bach")
                    data = await(r.text())
                    print(data)
            except Exception as e:
                print("something went wrong", e)
