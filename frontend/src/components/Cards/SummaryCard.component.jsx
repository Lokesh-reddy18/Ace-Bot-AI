import { LuTrash2 } from "react-icons/lu";
import { getTitleInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-black/5 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-md shadow-black/10 relative group"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-4 cursor-pointer relative"
        style={{ background: colors }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4">
            <span className="text-lg font-semibold text-black">
              {getTitleInitials(role)}
            </span>
          </div>
          {/* Content Container */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              {/* Title and skills */}
              <div>
                <h2 className="text-[17px] font-medium">{role}</h2>
                <p className="text-xs font-medium text-black/90">
                  {topicsToFocus}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 py-1 px-3 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-0 right-0"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 />
        </button>
      </div>
      <div className="px-3 pb-3">
        <div className="flex items-center gap-3 mt-4">
          <div className="text-[10px] font-medium text-black px-3 py-1 border-[.5px] border-black/90 rounded-full">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </div>
          <div className="text-[10px] font-medium text-black px-3 py-1 border-[.5px] border-black/90 rounded-full">
            {questions} Q&A
          </div>
          <div className="text-[10px] font-medium text-black px-3 py-1 border-[.5px] border-black/90 rounded-full">
            Last Updated: {lastUpdated}
          </div>
        </div>
        {/* Description */}
        <p className="text-[12px] text-black/50 font-medium line-clamp-2 mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
