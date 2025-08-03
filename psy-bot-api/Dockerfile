# Usa una imagen base de Python ligera
FROM python:3.11-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los requisitos del proyecto e instálalos
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código fuente de la app
COPY . .

# Expone el puerto de Flask (por si se usa sin docker-compose)
EXPOSE 5000

# Define variables de entorno necesarias
ENV FLASK_APP=main.py
ENV PYTHONUNBUFFERED=1

# Comando por defecto al iniciar el contenedor
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
