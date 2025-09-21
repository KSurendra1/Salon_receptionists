from dotenv import load_dotenv
from livekit import agents
from livekit.agents import AgentSession, RoomInputOptions
from livekit.plugins import noise_cancellation
from assistant import SalonAssistant
from help_request import init_db

load_dotenv()

async def entrypoint(ctx: agents.JobContext):
    init_db()  # ensure DB exists

    session = AgentSession()
    await session.start(
        room=ctx.room,
        agent=SalonAssistant(),
        room_input_options=RoomInputOptions(
            video_enabled=False,
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    await ctx.connect()
    await session.generate_reply(instructions="Handle call and trigger help requests if unsure.")


if __name__ == "__main__":
    agents.cli.run_app(agents.WorkerOptions(entrypoint_fnc=entrypoint))
