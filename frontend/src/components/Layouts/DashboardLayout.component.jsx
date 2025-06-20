import { useContext } from "react";
import { UserContext } from "../../context/userContext.context";
import DashboardNavbar from "../Navbar/DashboardNavbar.component";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <DashboardNavbar />
      {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
