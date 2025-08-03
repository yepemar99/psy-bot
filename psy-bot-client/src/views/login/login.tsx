import { Link } from "react-router-dom";
import LoginForm from "./loginForm";

const Login = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 uppercase text-center">
            Bienvenido a PSY-BOT
          </h1>
          <LoginForm />
          <div className="text-center mt-4">
            Ya tienes cuenta?{" "}
            <Link to="/register" className="underline">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
      <div
        className="hidden md:block bg-cover bg-center bg-blue-500 h-full"
        style={{ backgroundImage: "url('/psy-bg.png')" }}
      ></div>
    </div>
  );
};

export default Login;
