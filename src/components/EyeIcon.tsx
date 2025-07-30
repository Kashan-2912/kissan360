import { AiFillEye } from "react-icons/ai";

const EyeIcon = () => (
  <div
    className="w-8 h-8 rounded-full border-[0.5px] border-[#0F783B] bg-white flex items-center justify-center absolute top-3 right-3"
    style={{ boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.25)" }}
  >
    <AiFillEye size={16} className="text-[#0F783B]" />
  </div>
);

export default EyeIcon