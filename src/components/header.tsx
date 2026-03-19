import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUsername } from "../hooks/use-username";

export default function Header() {
  const { username, clearUsername } = useUsername();
  const navigate = useNavigate();

  function handleLogout() {
    clearUsername();
    navigate("/login");
  }

  return (
    <header className="bg-[#7695EC] h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 gap-4">
      <h1 className="text-white text-lg sm:text-[22px] font-bold truncate">
        CodeLeap Network
      </h1>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-white text-sm max-w-[100px] sm:max-w-none truncate">
          @{username}
        </span>
        <button
          onClick={handleLogout}
          className="text-white text-sm font-bold hover:text-red-400 transition-colors cursor-pointer"
          aria-label="Logout"
        >
          <span className="hidden sm:inline">Logout</span>
          <FiLogOut size={20} className="sm:hidden" />
        </button>
      </div>
    </header>
  );
}
