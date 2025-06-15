import LogoTransparent from "../assets/logo-transparent-cropped.png";
import Logo from "../assets/logo-cropped.png";
import { useThemeStore } from "../store/useThemeStore";

const BouncingIcon = () => {
  const { theme } = useThemeStore();
  return (
    <div className="flex justify-center gap-4 mb-4 ">
      <div className="relative">
        <div
          className={`w-20 h-20 p-2 rounded-2xl flex items-center justify-center animate-bounce ${
            theme === "dark" ? "bg-primary/10" : "bg-[#242629]"
          }`}
        >
          <img src={theme == "dark" ? LogoTransparent : Logo} />
        </div>
      </div>
    </div>
  );
};

export default BouncingIcon;
