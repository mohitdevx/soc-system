import yaml # type: ignore
import os 

ROOT = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(ROOT, "config.yaml")

def app_config(config :str):
    try:
        with open(config, "r") as cfg:
            data = yaml.safe_load(config)
            return data 

    except Exception as e:
        print("Error loading config file")
        raise e 

app_config(CONFIG_PATH)
