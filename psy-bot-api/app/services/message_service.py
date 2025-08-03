from app.models import Chat, Message, User
from playhouse.shortcuts import model_to_dict
from app.services.openai_service import get_bot_response


def create_message_with_bot_response(user_id, chat_id, content):
    from peewee import DoesNotExist

    # Obtener o crear el chat
    if chat_id:
        try:
            chat = Chat.get_by_id(chat_id)
        except DoesNotExist:
            chat = Chat.create(user=user_id, name="")
    else:
        chat = Chat.create(user=user_id, name="")

    # Guardar mensaje del usuario
    Message.create(chat=chat, sender="user", content=content)

    # Obtener todos los mensajes anteriores
    messages = Message.select().where(Message.chat == chat).order_by(Message.created_at)

    # Preparar historial para enviar a OpenAI
    chat_history = [{"role": "assistant" if msg.sender == "bot" else msg.sender, "content": msg.content} for msg in messages]

    # Obtener respuesta del modelo
    bot_reply = get_bot_response(chat_history)
    if bot_reply != "error":
        Message.create(chat=chat, sender="bot", content=bot_reply)
        
    # Si el chat no tiene título, pedir uno al modelo
    if not chat.name or chat.name == "no definido":
        from app.services.openai_service import get_chat_title
        title = get_chat_title(chat_history)
        chat.name = title
        chat.save()

    return bot_reply, chat
