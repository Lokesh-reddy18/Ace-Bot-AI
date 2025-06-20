import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.component";
import toast from "react-hot-toast";
import { validateEmail, validatePassword } from "../../utils/helper";
import { UserContext } from "../../context/userContext.context";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import uploadImage from "../../utils/uploadImage";

const Signup = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter valid email address");
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter your password");
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      setIsLoading(true);

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        toast.success("SignUp Successfully");
        navigate("/dashboard");
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        setIsLoading(false);
      } else {
        toast.error("Something went wrong! Please try again.");
        console.error(error);
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Join AceBot</h3>
      <p className="text-xs text-black/70 mt-[5px] mb-6">
        Create your account to unlock personalized interview prep and ace your
        next job opportunity.
      </p>
      <form onSubmit={handleSignup}>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
          />
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="Enter your email address"
            type="email"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? "Signing up..." : "Signup"}
        </button>
        <p className="text-[13px] text-black/80 mt-3">
          Already have an account{" "}
          <button
            type="button"
            className="font-medium text-blue-600 underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
