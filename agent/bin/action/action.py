ALLOWED_ACTIONS = {"scan", "monitor", "report"}

def validate_action(action: str) -> bool:
    return action in ALLOWED_ACTIONS

@app.post("/agent/action")
async def take_action(action: BackendSchema):
    if not validate_action(action.action):
        return {"success": False, "error": "Invalid action"}
    
    if action.action == "scan":
        subprocess.run(["scanner", action.get("target", "default")])
    elif action.action == "monitor":
        subprocess.run(["monitor", action.get("interval", "60")])
    # ... other allowed actions
    
    return {"success": "ok"}