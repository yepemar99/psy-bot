from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from app.routes.auth import auth_bp
from app.routes.chat import chat_bp
from app.routes.message import message_bp
from app.models import db, User, Chat, Message


load_dotenv()  # Carga variables de entorno desde .env

import time
import psycopg2
from peewee import OperationalError


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
    app.config['JWT_SECRET'] = os.getenv('JWT_SECRET')

    # Conectar a la base de datos
    db.connect()

    # Crear las tablas si no existen
    db.create_tables([User, Chat, Message])

    # Registrar blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(chat_bp, url_prefix="/api/chats")
    app.register_blueprint(message_bp, url_prefix="/api/messages")

    @app.route("/")
    def home():
        return {"message": "Psy-Bot API OK"}

    @app.teardown_appcontext
    def close_db(exception):
        if not db.is_closed():
            db.close()

    return app
app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
