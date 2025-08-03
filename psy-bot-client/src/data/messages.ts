import type { IMessage } from "@/types/message.interface";

export const mockMessages: IMessage[] = [
  {
    id: "1",
    content: "Hola, ¿en qué puedo ayudarte hoy?",
    sender: "bot",
    createdAt: new Date("2025-07-29T10:00:00"),
  },
  {
    id: "2",
    content: "Quiero saber el clima en Madrid.",
    sender: "user",
    createdAt: new Date("2025-07-29T10:00:05"),
  },
  {
    id: "3",
    content: "Claro, ahora mismo está soleado y la temperatura es de 28°C.",
    sender: "bot",
    createdAt: new Date("2025-07-29T10:00:08"),
  },
  {
    id: "4",
    content: "¿Y mañana?",
    sender: "user",
    createdAt: new Date("2025-07-29T10:00:12"),
  },
  {
    id: "5",
    content: "Se espera un clima parcialmente nublado con 26°C como máxima.",
    sender: "bot",
    createdAt: new Date("2025-07-29T10:00:15"),
  },
  {
    id: "6",
    content: "¿Va a llover esta semana?",
    sender: "user",
    createdAt: new Date("2025-07-29T10:00:18"),
  },
  {
    id: "7",
    content:
      "Según el pronóstico, hay probabilidad de lluvia ligera el jueves.",
    sender: "bot",
    createdAt: new Date("2025-07-29T10:00:21"),
  },
  {
    id: "8",
    content: "Perfecto, así planifico mejor mis actividades.",
    sender: "user",
    createdAt: new Date("2025-07-29T10:00:25"),
  },
  {
    id: "9",
    content: "¿Te gustaría que te enviara alertas si cambia el clima?",
    sender: "bot",
    createdAt: new Date("2025-07-29T10:00:28"),
  },
  {
    id: "10",
    content: "Sí, por favor. Eso sería muy útil.",
    sender: "user",
    createdAt: new Date("2025-07-29T10:00:31"),
  },
  {
    id: "11",
    content: "Listo, recibirás notificaciones sobre cambios importantes.",
    sender: "bot",
    createdAt: new Date("2025-07-29T10:00:34"),
  },
  {
    id: "12",
    content: "Gracias. ¿Puedes decirme la humedad actual?",
    sender: "user",
    createdAt: new Date("2025-07-29T10:00:37"),
  },
  {
    id: "13",
    content: "Claro, la humedad actual en Madrid es del 45%.",
    sender: "bot",
    createdAt: new Date("2025-07-29T10:00:40"),
  },
  {
    id: "14",
    content: "Perfecto. Eso era todo por ahora.",
    sender: "user",
    createdAt: new Date("2025-07-29T10:00:43"),
  },
  {
    id: "15",
    content: "De nada. Estoy aquí si necesitas algo más.",
    sender: "bot",
    createdAt: new Date("2025-07-29T10:00:46"),
  },
];
