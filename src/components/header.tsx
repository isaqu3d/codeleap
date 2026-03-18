import { useNavigate } from "react-router-dom";
import { useUsername } from "../hooks/use-username";

export default function Header() {
  const { clearUsername } = useUsername();
  const navigate = useNavigate();

  function handleLogout() {
    clearUsername();
    navigate("/login");
  }

  return (
    <header className="bg-[#7695EC] h-20 flex items-center justify-between px-6 sticky top-0 z-10">
      <h1 className="text-white text-[22px] font-bold">CodeLeap Network</h1>
      <button
        onClick={handleLogout}
        className="text-white text-sm font-bold hover:opacity-70 transition-opacity cursor-pointer"
      >
        Logout
      </button>
    </header>
  );
}
