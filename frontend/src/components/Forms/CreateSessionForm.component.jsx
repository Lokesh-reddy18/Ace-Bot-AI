import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Input from "../Inputs/Input.component";
import SpinnerLoader from "../Loading/SpinnerLoader.component";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role) {
      toast.error("Role is missing—let us know what you do.");
      return;
    }
    if (!experience) {
      toast.error("Tell us how much experience you have.");
      return;
    }
    if (!topicsToFocus) {
      toast.error("What topics should we focus on?");
      return;
    }

    setIsLoading(true);

    try {
        // Call AI API to generate questions
        const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
            role,
            experience,
            topicsToFocus,
            numberOfQuestions: 10, // Default number of qeuestions
        });

        // Get questions as array like [(question, answer), ...]
        const generateQuestions = aiResponse.data;

        const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
            ...formData,
            questions: generateQuestions,
        });

        if (response.data?.session?._id) {
            navigate(`/interviews/${response.data?.session?._id}`);
        }
    } catch (error) {
        if (error.response && error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Something went wrong. Please try again.")
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Start Your Personalized Interview Prep
      </h3>
      <p className="text-xs text-black/70 mt-[5px] mb-3">
        Provide a few key details to receive a custom set of interview questions
        designed for you.
      </p>
      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="e.g., Frontend Developer, UI/UX Engineer"
          type="text"
        />
        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="e.g., 2, 5, 10"
          type="number"
        />
        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Focus Topics"
          placeholder="e.g., React, System Design, Data Structures"
          type="text"
        />
        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Brief Description"
          placeholder="Add any additional context or goals for your interview prep"
          type="text"
        />
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 text-sm font-medium text-white bg-orange-700 shadow-lg shadow-indigo-600/5 p-[10px] rounded-md my-1 hover:bg-orange-500 transition-colors duration-300 cursor-pointer mt-2"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />}Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
