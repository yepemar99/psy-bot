from peewee import (
    Model, CharField, ForeignKeyField,
    TextField, DateTimeField, AutoField
)
from .db import db
import datetime

class BaseModel(Model):
    class Meta:
        database = db

class User(BaseModel):
    id = AutoField()
    name = CharField()
    lastname = CharField()
    email = CharField(unique=True)
    password = CharField()  # Deberías hashearla antes de guardar

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email
        }

class Chat(BaseModel):
    id = AutoField()
    name = CharField()
    user = ForeignKeyField(User, backref="chats", on_delete="CASCADE")
    created_at = DateTimeField(default=datetime.datetime.now)

    def to_dict(self, include_messages=False):
        data = {
            "id": self.id,
            "name": self.name,
            "user_id": self.user.id,
            "created_at": self.created_at.isoformat()
        }

        if include_messages:
            data["messages"] = [message.to_dict() for message in self.messages]

        return data

class Message(BaseModel):
    id = AutoField()
    chat = ForeignKeyField(Chat, backref="messages", on_delete="CASCADE")
    sender = CharField()  # Valores esperados: "user" o "bot"
    content = TextField()
    created_at = DateTimeField(default=datetime.datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "chat_id": self.chat.id,
            "sender": self.sender,
            "content": self.content,
            "created_at": self.created_at.isoformat()
        }
