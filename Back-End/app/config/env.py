from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


# This for environment variable
class Settings(BaseSettings):

    SECRET_KEY: str = ""
    ALGORITHM: str = ""
    SMTP_USERNAME: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_SERVER: str = ""

    class Config:
        env_file = "../../.env"


settings = Settings()
