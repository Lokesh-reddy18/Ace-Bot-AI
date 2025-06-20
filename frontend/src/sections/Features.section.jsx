import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FEATURES } from "../utils/data";
import { useInView } from "react-intersection-observer";

const Features = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6,
        ease: "easeOut",
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref}
      className="container mx-auto max-w-4xl md:max-w-5xl w-full min-h-[80vh] items-center justify-center px-5 md:px-0 py-8"
      id="features"
    >
      <motion.div
        className="flex flex-col items-center justify-center mb-10"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <h2 className="text-xl md:text-3xl font-bold mb-2 text-black">
          Unlock the Future of{" "}
          <span className="text-primary">AI Interviews</span>
        </h2>
        <p className="text-[13px] md:text-[14px] text-black/70 text-center">
          Elevate your preparation with AI-driven insights and ace every
          interview.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-5"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {FEATURES.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white p-5 items-center text-black border border-black/4 rounded-lg shadow-md hover:shadow-primary/10 transition-colors duration-300"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold mb-5 text-center">
              {feature.title}
            </h2>
            <p className="text-[13px] md:text-[15px] text-black/60">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
