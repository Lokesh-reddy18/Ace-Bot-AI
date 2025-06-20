import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TESTIMONIALS } from "../utils/data";

const Testimonials = () => {
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
      id="testimonials"
    >
      <motion.div
        className="flex flex-col items-center justify-center mb-20"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <h2 className="text-xl md:text-3xl font-bold mb-2 text-black">
          Hear from Our{" "}
          <span className="text-primary">Successful Candidates</span>
        </h2>
        <p className="text-[13px] md:text-[14px] text-black/70 text-center">
          Discover how AceBot has helped candidates like you ace their
          interviews and land their dream jobs.
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-15"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={index}
            className="text-sm border border-black/4 pb-6 rounded-lg bg-white shadow hover:shadow-primary/30"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center px-5 py-4 relative">
              <img
                className="h-24 w-24 absolute -top-14 rounded-full"
                src={testimonial.image}
                alt=""
              />
              <div className="pt-8 text-center">
                <h1 className="text-lg font-medium text-black/90">
                  {testimonial.name}
                </h1>
                <p className="text-black/80">{testimonial.position}</p>
              </div>
            </div>
            <p className="text-black/50 px-6 text-center">
              {testimonial.description}
            </p>
            <div className="flex justify-center pt-4">
              <div className="flex gap-0.5">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                    fill="#FF9900"
                  />
                </svg>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                    fill="#FF9900"
                  />
                </svg>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                    fill="#FF9900"
                  />
                </svg>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                    fill="#FF9900"
                  />
                </svg>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
                    fill="#FF9900"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Testimonials;
