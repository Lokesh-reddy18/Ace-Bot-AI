import { Link } from "react-router-dom";
import ProfileCardDashboard from "../Cards/ProfileCardDashboard.component";
import LOGO from "../../assets/Logo.png";

const DashboardNavbar = () => {
  return (
    <div className="h-16 bg-white border border-b border-black/10 backdrop-blur-[2px] py-2.5 px-8 md:px-16 sticky top-0 left-0">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to="/">
          <img src={LOGO} alt="logo" className="h-12 w-20" />
        </Link>
        <ProfileCardDashboard />
      </div>
    </div>
  );
};

export default DashboardNavbar;
