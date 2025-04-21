import LogoTransparent from "../assets/logo-transparent-cropped.png";
import Logo from "../assets/logo-cropped.png";

import { useThemeStore } from "../store/useThemeStore";

const NoChatSelected = () => {
  const { theme } = useThemeStore();
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className={`w-20 h-20 p-2 rounded-2xl flex items-center justify-center animate-bounce ${
                theme === 'dark' ?  'bg-primary/10':'bg-[#242629]'
              }`}
            >
              <img src={theme == "dark" ? LogoTransparent : Logo} />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Tether!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
