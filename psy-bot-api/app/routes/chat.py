from flask import Blueprint, request, jsonify
from app.services.chat_service import (
    get_chats_by_user,
    create_chat,
    get_chat_by_id,
    update_chat,
    delete_chat
)

chat_bp = Blueprint('chat', __name__)

# Obtener chats paginados y filtrados por usuario
@chat_bp.route('', methods=['GET'])
def list_chats():
    user_id = request.args.get('user_id')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    chats, total = get_chats_by_user(user_id=user_id, page=page, page_size=per_page)

    return jsonify({
        "data": [chat.to_dict() for chat in chats],
        "total": total,
        "page": page,
        "per_page": per_page
    })

# Crear un nuevo chat
@chat_bp.route('', methods=['POST'])
def create_new_chat():
    data = request.get_json()
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    chat = create_chat(user_id=user_id)

    return jsonify(chat.to_dict()), 201

# Obtener chat por id
@chat_bp.route('/<int:chat_id>', methods=['GET'])
def get_chat(chat_id):
    include_messages = request.args.get("include_messages", "false").lower() == "true"
    chat = get_chat_by_id(chat_id)
    if not chat:
        return jsonify({"error": "Chat not found"}), 404
    return jsonify(chat.to_dict(include_messages=include_messages))

# Actualizar chat (podría ser para actualizar metadatos, por ejemplo)
@chat_bp.route('/<int:chat_id>', methods=['PUT'])
def update_chat_route(chat_id):
    data = request.get_json()
    chat = update_chat(chat_id, data)
    if not chat:
        return jsonify({"error": "Chat not found"}), 404
    return jsonify(chat.to_dict())

# Eliminar chat
@chat_bp.route('/<int:chat_id>', methods=['DELETE'])
def delete_chat_route(chat_id):
    success = delete_chat(chat_id)
    if not success:
        return jsonify({"error": "Chat not found"}), 404
    return jsonify({"message": "Chat deleted"}), 200
