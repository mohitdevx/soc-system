# agent/bin/config/app_config.py
import yaml # type: ignore 
import os 

ROOT = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(ROOT, "..", "config.yaml")

def load_yaml():
    try:
        with open(CONFIG_PATH, "r") as f:
            return yaml.safe_load(f)
    except Exception as e:
        print(f"Error loading config: {e}")
        return {}

cfg = load_yaml()