const AlertDialog = ({ content, onDelete }) => {
  return (
    <div className="p-5">
      <p className="text-[14px]">{content}</p>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-error to-primary text-sm font-semibold text-white px-7 py-2 rounded-lg hover:bg-error hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-error/40"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AlertDialog;
