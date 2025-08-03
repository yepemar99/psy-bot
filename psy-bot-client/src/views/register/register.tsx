import RegisterForm from "./registerForm";

const Register = () => {
  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2">
      <div
        className="hidden md:block bg-cover bg-center bg-blue-500 h-full"
        style={{ backgroundImage: "url('/psy-bg.png')" }}
      ></div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 uppercase text-center">
            Forma parte de PSY-BOT
          </h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
