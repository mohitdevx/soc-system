from ..config import cfg
import msgpack

def log_parser(logs: str, name: str, ftype: str) -> dict:
    app = cfg['app']

    parsed = {
        "agent_name": app['name'],
        "agent_id": app['id'],
        "version": app['version'],
        "log_name": name,
        "type":ftype,
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

    
