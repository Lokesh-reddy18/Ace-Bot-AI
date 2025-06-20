import { LuPlus } from "react-icons/lu";
import DashboardLayout from "../../components/Layouts/DashboardLayout.component";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import SummaryCard from "../../components/Cards/SummaryCard.component";
import { CARD_BG } from "../../utils/data";
import moment from "moment";
import Modal from "../../components/Modals/Modal.component";
import CreateSessionForm from "../../components/Forms/CreateSessionForm.component";
import AlertDialog from "../../components/Dialogs/AlertDialog.component";
import toast from "react-hot-toast";
import HeroImage from "../../assets/Hero-Image.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [session, setSession] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSession = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSession(response.data);
    } catch (error) {
      console.error("Error while fetching session data: ", error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSession();
    } catch (error) {
      console.error("Error while deleting session: ", error);
    }
  };

  useEffect(() => {
    fetchAllSession();
  }, []);
  return (
    <DashboardLayout>
      <div className="container mx-auto max-w-4xl md:max-w-5xl pt-4 pb-4">
        {session.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <img src={HeroImage} alt="No sessions" className="max-w-xs mb-6 opacity-90" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">No Sessions Yet</h2>
            <p className="text-gray-600 mb-6">You haven't created any interview sessions. Start your preparation journey by creating your first session!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
            {session?.map((data, index) => (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[index % CARD_BG.length].bgcolor}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience || ""}
                questions={data?.questions?.length || "-"}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data.updatedAt).format("Do MMM YYYY")
                    : ""
                }
                onSelect={() => navigate(`/interviews/${data?._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data })}
              />
            ))}
          </div>
        )}
        <button
          type="button"
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-secondary text-sm font-semibold text-[#FFF] px-7 py-2.5 rounded-full transition-colors duration-300 cursor-pointer hover:shadow-sm hover:shadow-primary/40 fixed bottom-10 md:bottom-20 right-10 md:right-20"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className="text-2xl text-[#FFF]" />
          Add New
        </button>
      </div>
      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null });
        }}
        title="Confirm Deletion"
      >
        <div className="w-[30vw]">
          <AlertDialog
            content="Are you sure you want to delete this session?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
