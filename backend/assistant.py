from livekit.agents import Agent
from livekit.plugins import google
from prompts import AGENT_INSTRUCTION
from help_request import create_help_request

class SalonAssistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions=AGENT_INSTRUCTION,
            llm=google.beta.realtime.RealtimeModel(
                voice="Charon",
                temperature=0.3,
            ),
        )

    async def on_response(self, message: str):
        known_keywords = ["haircut", "coloring", "manicure", "pedicure", "hours", "timings", "address", "salon"]
        if not any(word in message.lower() for word in known_keywords):
            caller_id = "caller_123"  # replace with real caller info
            create_help_request(caller_id, message)
            return "Let me check with my supervisor and get back to you."
        return message
