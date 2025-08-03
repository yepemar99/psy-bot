from app.models import User
import bcrypt

def register_user(name, lastname, email, password):
    # Verificar que no exista usuario con ese email
    if User.select().where(User.email == email).exists():
        raise ValueError("Email ya registrado")

   
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    user = User.create(
        name=name,
        lastname=lastname,
        email=email,
        password=hashed.decode() 
    )
    return user

def authenticate_user(email, password):
    try:
        user = User.get(User.email == email)
    except User.DoesNotExist:
        return None

    if bcrypt.checkpw(password.encode(), user.password.encode()):
        return user
    return None
