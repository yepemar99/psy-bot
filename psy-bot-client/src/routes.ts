export const routes = {
  auth: {
    login: "/login",
    register: "/register",
  },
  chat: "/chat",
  home: "/",
  notFound: "*",
  api: {
    me: "/api/auth/me",
    login: "/api/auth/login",
    register: "/api/auth/register",
    chats: "/api/chats",
    message: "/api/messages",
  },
};
