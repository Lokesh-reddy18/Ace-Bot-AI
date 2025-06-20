import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.component";
import toast from "react-hot-toast";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/userContext.context";

const Login = ({ setCurrentPage }) => {
  const { updateUser } = useContext(UserContext);
  const naviagte = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter valid email address");
    }

    if (!password.trim()) {
      toast.error("Please enter your password");
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        naviagte("/dashboard");
      }

      toast.success("Logging successfully");
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    }
  };
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-black/70 mt-[5px] mb-6">
        Please enter your credentials to access your account.
      </p>
      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="Enter your email address"
          type="text"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="text-[13px] text-black/80 mt-5">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-medium text-blue-600 underline cursor-pointer"
            onClick={() => {
              setCurrentPage("signup");
            }}
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
