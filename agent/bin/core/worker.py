import threading
from config import app_config as cfg
from .send_logs import send_logs
from .tailer import tail_file

def start_agent():

    files = cfg['files']
    threads = []

    threading.Thread(target=send_logs,args=(), daemon=True).start()

    for elem in files:
        t = threading.Thread(target=tail_file, args=(elem['path'],))

        # print(len(threads))
        threads.append(t)

    for t in threads:
        t.start()

    for t in threads:
        t.join()

