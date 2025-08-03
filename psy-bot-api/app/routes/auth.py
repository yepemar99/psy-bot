from flask import Blueprint, request, jsonify
from app.models import User
from app.services.auth_service import register_user, authenticate_user
import jwt
import os
import datetime

auth_bp = Blueprint("auth", __name__)

JWT_SECRET = os.getenv("JWT_SECRET", "secret-key")
JWT_ALGORITHM = "HS256"
JWT_EXP_DELTA_SECONDS = 3600 * 24  # 1 día

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data.get("name")
    lastname = data.get("lastname")
    email = data.get("email")
    password = data.get("password")

    if not all([name, lastname, email, password]):
        return jsonify({"error": "Faltan datos"}), 400

    try:
        user = register_user(name, lastname, email, password)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    return jsonify({"message": "Usuario creado", "user_id": user.id}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not all([email, password]):
        return jsonify({"error": "Faltan datos"}), 400

    user = authenticate_user(email, password)
    if not user:
        return jsonify({"error": "Credenciales inválidas"}), 401

    payload = {
        "user_id": user.id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(seconds=JWT_EXP_DELTA_SECONDS)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return jsonify({"token": token})

@auth_bp.route("/me", methods=["GET"])
def get_me():
    token = request.headers.get("Authorization")
    if not token:
        return jsonify({"error": "Token no proporcionado"}), 401

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("user_id")
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return jsonify({"error": "Token inválido"}), 401

    user = User.select().where(User.id == user_id).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify({'id': user.id, 'name': user.name, 'lastname': user.lastname, 'email': user.email})