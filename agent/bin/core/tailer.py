import queue 
from models import log_parser

event_queue = queue.Queue

def tail_file(path):
    print(path)
    with open(path , "r") as f:
        f.seek(0,2) 
        line = f.readline()

        while True:
            if line: 
                event_queue.put(log_parser(line))
                print(line.strip())
            line = f.readline()
            continue

        
