from app.models import Chat, User
import datetime
from peewee import DoesNotExist

# Create chat
def create_chat(user_id):
    try:
        user = User.get_by_id(user_id)
        chat = Chat.create(user=user, name="Chat 1", created_at=datetime.datetime.now())
        return chat
    except DoesNotExist:
        return None

# Get chats by user (pagination)    
def get_chats_by_user(user_id, page=1, page_size=10):
    query = Chat.select().where(Chat.user == user_id).order_by(Chat.created_at.desc())
    total = query.count()
    chats = query.paginate(page, page_size)
    return chats, total

# Get chat by ID
def get_chat_by_id(chat_id):
    try:
        return Chat.get_by_id(chat_id)
    except DoesNotExist:
        return None

# Update chat (optional user_id)
def update_chat(chat_id, user_id=None):
    try:
        chat = Chat.get_by_id(chat_id)
        if user_id:
            try:
                user = User.get_by_id(user_id)
                chat.user = user
            except DoesNotExist:
                return None, "User not found"
        chat.save()
        return chat, None
    except DoesNotExist:
        return None, "Chat not found"

# Delete chat
def delete_chat(chat_id):
    try:
        chat = Chat.get_by_id(chat_id)
        chat.delete_instance()
        return True
    except DoesNotExist:
        return False
