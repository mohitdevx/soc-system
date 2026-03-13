from ..config import cfg
import msgpack

def log_parser(logs: str) -> dict:
    app = cfg['app']

    parsed = {
        "agent_name": app['name'],
        "agent_id": app['id'],
        "version": app['version'],
        "raw": logs
    }

    return parsed


def payload_streams(raw: list) -> bytes:
    worker = cfg['worker']

    payload = {
        "worker_id": worker['id'],
        "worker_name": worker['name'],
        "stream_count":len(raw),
        "streams": raw
    }

    return msgpack.packb(payload)

    
