from flask import Blueprint, request, jsonify
from app.services.message_service import create_message_with_bot_response

message_bp = Blueprint("messages", __name__)

@message_bp.route('', methods=['POST'])
def create_message():
    data = request.get_json()
    user_id = data.get("user_id")
    chat_id = data.get("chat_id")
    content = data.get("content")

    if not user_id or not content:
        return jsonify({"error": "user_id and content are required"}), 400

    response, chat, error_flag = create_message_with_bot_response(user_id, chat_id, content)

    if error_flag:
        return jsonify({
            "chat_id": chat.id,
            "user_message": content,
            "bot_response": None,
            "error": "Error al obtener respuesta del modelo"
        }), 502  # Bad Gateway por error con el servicio externo

    return jsonify({
        "chat_id": chat.id,
        "user_message": content,
        "bot_response": response
    }), 201