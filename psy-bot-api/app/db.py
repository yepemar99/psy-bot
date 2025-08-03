import os
from dotenv import load_dotenv
from peewee import PostgresqlDatabase

load_dotenv()  # Carga las variables del .env

db = PostgresqlDatabase(
    os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=int(os.getenv("DB_PORT", 5432))
)
