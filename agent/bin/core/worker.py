import threading
from ..config import cfg
from .send_logs import send_logs
from .tailer import tail_file
from ..action import run


def start_agent():
    print("deamon is running....")
    files = cfg["files"]
    threads = []

    threading.Thread(target=run, args=(), daemon=True).start()
    threading.Thread(target=send_logs, args=(5,), daemon=True).start()

    for elem in files:
        t = threading.Thread(
            target=tail_file,
            args=(
                elem["path"],
                elem["name"],
                elem["type"],
            ),
        )

        # print(len(threads))
        threads.append(t)

    for t in threads:
        t.start()

    for t in threads:
        t.join()
