import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import HERO from "../assets/Hero-Image.png";

const Hero = ({ onClick }) => {
  const controls = useAnimation();
  const imageControls = useAnimation();
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          controls.start({ opacity: 1, x: 0 });
          imageControls.start({ opacity: 1, x: 0 });
        } else {
          controls.start({ opacity: 0, x: -50 });
          imageControls.start({ opacity: 0, x: 50 });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls, imageControls]);
  return (
    <section
      ref={sectionRef}
      className="container mx-auto max-w-4xl md:max-w-5xl w-full min-h-[100vh] flex flex-col-reverse md:flex-row items-center px-5 md:px-0 py-auto"
      id="hero"
    >
      <motion.div
        className="w-full md:w-1/2 pr-4 mb-8 md:mb-0"
        initial={{ opacity: 0, x: -50 }}
        animate={controls}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="hidden md:flex items-center mb-2">
          <span className="text-[13px] text-black/60 font-semibold mr-2">
            Welcome
          </span>
          <div className="flex-1 h-[1px] bg-slate-300"></div>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-black font-medium mb-6 leading-tight">
          Ace Your Next Interview With{" "}
          <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#1A237E_0%,_#1976D2_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
            AI-Powered
          </span>{" "}
          Precision
        </h1>
        <p className="text-[14px] md:text-[17px] text-black/80 mb-6">
          Get personalized, role-specific questions, uncover insights, and
          supercharge your preparation. From practice to mastery – conquer every
          interview with confidence.
        </p>
        <motion.button
          type="button"
          className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-sm text-[#FFFFFF] font-semibold px-7 py-2.5 rounded-full transition-colors duration-900 cursor-pointer"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
        >
          Get Started
        </motion.button>
      </motion.div>
      <motion.div
        className="w-full md:w-1/2 mb-15 md:mb-0"
        initial={{ opacity: 0, x: 50 }}
        animate={imageControls}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <img
          src={HERO}
          alt="Hero Image"
          className="w-full h-auto rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
