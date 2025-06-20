import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HOW_IT_WORKS } from "../utils/data";

const Work = () => {
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
      className="container mx-auto max-w-4xl md:max-w-5xl w-full min-h-[60vh] items-center justify-center px-5 md:px-0 py-8"
      id="work"
    >
      <motion.div
        className="flex flex-col items-center justify-center mb-20"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <h2 className="text-xl md:text-3xl font-bold mb-2 text-black">
          Ace your interview in{" "}
          <span className="text-primary">3 Simple Steps</span>
        </h2>
        <p className="text-[13px] md:text-[14px] text-black/70 text-center">
          From personalized question generation to real-time practice – we make
          interview prep a breeze.
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-5"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {HOW_IT_WORKS.map((step, index) => (
          <motion.div
            key={index}
            className="bg-white p-5 items-center text-black border border-black/4 rounded-lg shadow-md hover:shadow-primary/10 transition-colors duration-300"
            variants={itemVariants}
          >
            <div className="flex flex-row items-center justify-center gap-4 mb-5">
              <h1
                className="text-transparent bg-clip-text bg-transparent text-4xl font-bold mb-3"
                style={{ WebkitTextStroke: "2px #DE0000" }}
              >
                {step.id}
              </h1>
              <h2 className="text-xl font-semibold">
                {step.title}
              </h2>
            </div>
            <p className="text-[13px] md:text-[15px] text-black/60">
              {step.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Work;
