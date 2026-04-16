import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    # Validation
    def validate(self):
        if not self.OPENAI_API_KEY:
            print("WARNING: OPENAI_API_KEY is not set in .env")

settings = Settings()
settings.validate()
