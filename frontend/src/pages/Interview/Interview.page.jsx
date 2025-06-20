import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion, number } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout.component";
import RoleInfoHeader from "../../components/Navbar/RoleInfoHeader.component";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import QuestionCard from "../../components/Cards/QuestionCard.component";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import AIResponsePreview from "../../components/Previews/AIResponsePreview.component";
import Drawer from "../../components/Layouts/Drawer.component";
import SkeltonLoader from "../../components/Loading/SkeltonLoader.component";
import SpinnerLoader from "../../components/Loading/SpinnerLoader.component";
import toast from "react-hot-toast";

const Interview = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session ID
  const fetchSessionDataById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );

      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error while fetching: ", error);
    }
  };

  // Generate concept explanations
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMessage("");
      setExplanation(null);

      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATIONS,
        { question }
      );

      if (response.data) {
        setExplanation(response.data);
      }
    } catch (error) {
      setExplanation(null);
      setErrorMessage("Failed to generate Explanation. Please try again");
      console.error("Error while generating explanation: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Pin/Unpin Question
  const togglePinQuestion = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN_QUESTION(questionId)
      );

      if (response.data && response.data.question) {
        const isPinned = response.data.question.pinned;

        toast.success(
          `Question ${isPinned ? "pinned" : "unpinned"} successfully!`
        );

        fetchSessionDataById();
      }
    } catch (error) {
      console.error("Error while pin/unpin question", error);
    }
  };

  // Add more questions to a session
  const addMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);

      // Call AI API to generate more questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10, // Default number of questions
        }
      );

      // Array like [{question, answer}, ...]
      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        }
      );

      if (response.data) {
        toast.success("Successfully Added 10 more Q&As.");
        fetchSessionDataById();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        console.error("Error while generating Q&As: ", error);
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDataById();
    }
    return () => {};
  }, []);
  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdatedAt={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />
      <div className="container mx-auto max-w-4xl md:max-w-5xl pt-4 pb-4">
        <h2 className="text-lg font-semibold text-black">Interview Q&A</h2>
        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      damping: 15,
                    }}
                    layout
                    layoutId={`question-${data._id || index}`}
                  >
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      onLearnMore={() =>
                        generateConceptExplanation(data.question)
                      }
                      isPinned={data?.isPinned}
                      onTogglePin={() => togglePinQuestion(data._id)}
                    />
                    {!isLoading &&
                      sessionData?.questions?.length == index + 1 && (
                        <div className="flex items-center justify-center mt-5">
                          <button
                            type="button"
                            className="flex items-center  gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                            onClick={addMoreQuestions}
                            disabled={isLoading || isUpdateLoader}
                          >
                            {isUpdateLoader ? (
                              <SpinnerLoader />
                            ) : (
                              <LuListCollapse className="text-lg" />
                            )}{" "}
                            Load More
                          </button>
                        </div>
                      )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <Drawer
            isOpen={openLearnMoreDrawer}
            onClose={() => setOpenLearnMoreDrawer(false)}
            title={!isLoading && explanation?.title}
          >
            {errorMessage && (
              <p className="flex gap-2 text-sm text-amber-600 font-medium">
                <LuCircleAlert className="mt-1" />
                {errorMessage}
              </p>
            )}
            {isLoading && <SkeltonLoader />}
            {!isLoading && explanation && (
              <AIResponsePreview content={explanation?.explanation} />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Interview;
