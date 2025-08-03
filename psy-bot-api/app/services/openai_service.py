import os
from openai import OpenAI

# Inicializar el cliente con base_url y api_key de OpenRouter
openai_client = OpenAI(
    base_url=os.getenv("OPENROUTER_API_BASE", "https://openrouter.ai/api/v1"),
    api_key=os.getenv("OPENROUTER_API_KEY")
)

def get_bot_response(messages):
    try:
        system_prompt = {
            "role": "system",
            "content": (
                "Eres una inteligencia artificial especializada en apoyar a psicólogos en su práctica profesional. "
                "Tu objetivo principal es responder preguntas relacionadas con la práctica clínica, ética profesional, intervenciones terapéuticas, "
                "casos clínicos, supervisión, psicología basada en evidencia y temas académicos o laborales del campo de la psicología.\n\n"
                "Sin embargo, intenta siempre ayudar o aportar algo útil, incluso si la consulta no es estrictamente técnica o profesional. "
                "Si la pregunta está claramente fuera del ámbito profesional o es irrelevante, responde amablemente invitando a reformular la pregunta, "
                "pero evita hacerlo ante cualquier mínima desviación del tema."
            )
        }
        completion = openai_client.chat.completions.create(
            model="openai/gpt-4o",  
            messages=[system_prompt] + messages,
            max_tokens=150,
        )

        return completion.choices[0].message.content

    except Exception as e:
        print("Error llamando a OpenRouter:", str(e))
        return "error"

def get_chat_title(messages):
    try:
        system_prompt = {
            "role": "system",
            "content": (
                "Eres un asistente que resume conversaciones relacionadas con el entorno profesional de la psicología. "
                "Tu tarea es generar un título muy breve (máximo 5 palabras) que represente el tema tratado, preferiblemente sobre: práctica clínica, ética profesional, técnicas terapéuticas, supervisión, psicología basada en evidencia o formación académica en psicología.\n\n"
                "Si la conversación no está claramente dentro de esos temas, intenta generar un título general que refleje la esencia del diálogo. "
                "Solo responde con 'no definido' si el contenido es completamente irrelevante o no relacionado."
            )
        }

        response = openai_client.chat.completions.create(
            model="openai/gpt-4o",
            messages=[system_prompt] + messages,
            max_tokens=20,
        )

        title = response.choices[0].message.content.strip()
        return title

    except Exception as e:
        print("Error obteniendo título del chat:", str(e))
        return "no definido"
