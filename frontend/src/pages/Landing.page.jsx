import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.component";
import Hero from "../sections/Hero.section";
import Features from "../sections/Features.section";
import Work from "../sections/Work.section";
import Testimonials from "../sections/Testimonials.section";
import Footer from "../components/Footer/Footer.component";
import Modal from "../components/Modals/Modal.component";
import Login from "./Authentication/Login.page";
import Signup from "./Authentication/Signup.page";
import { UserContext } from "../context/userContext.context";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <Navbar onClick={() => setOpenAuthModal(true)} user={user} />
      <div className="relative z-10">
        <div className="container mx-auto max-w-4xl md:max-w-5xl px-4">
          <Hero onClick={handleCTA} />
          <Features />
          <Work />
          <Testimonials />
        </div>
        <Footer />
      </div>
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login")
        }}
        hideHeader
      >
        <div className="">
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "signup" && (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Landing;
