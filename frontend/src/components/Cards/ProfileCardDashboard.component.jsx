import { useContext } from "react";
import { UserContext } from "../../context/userContext.context";
import { useNavigate } from "react-router-dom";
import DefaultProfile from "../../assets/Profile.png";

const ProfileCardDashboard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };
  return user && (
    <div className="flex items-center">
      <img
        src={DefaultProfile}
        alt="Profile Photo"
        className="w-11 h-11 bg-black/40 rounded-full mr-3"
      />
      <div className="flex-row items-start">
        <div className="text-[15px] text-black font-semibold leading-3">
          {user.name || ""}
        </div>
        <button
          type="button"
          className="text-red-600 text-sm font-bold cursor-pointer hover:underline mt-1"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCardDashboard;
