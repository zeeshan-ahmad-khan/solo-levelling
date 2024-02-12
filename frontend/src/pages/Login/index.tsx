import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

function Login() {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-4xl font-bold uppercase">Levelling</h1>
        <p className="tracking-farthest">Level Yourself</p>
      </div>
      <div className="bg-neutral-800 flex flex-1 flex-col items-center justify-center gap-3 text-xs">
        <button className="bg-neutral-900 text-white/85 flex items-center justify-left w-5/6 p-2 rounded-lg shadow-neutral-800 hover:bg-neutral-900/75">
          <FaGoogle />
          <span className="w-full text-center">Sign in with Google</span>
        </button>
        <button className="bg-neutral-900 text-white/85 flex items-center justify-left p-2 w-5/6 rounded-lg shadow-neutral-800  hover:bg-neutral-900/75">
          <FaFacebookF />
          <span className="w-full text-center">Sign in with Facebook</span>
        </button>
        <button className="text-white/85 hover:text-white/75 w-5/6 p-2">
          <span>Sign in with Email</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
