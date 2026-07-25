import LogoTransparent from "../assets/logo-transparent-cropped.png";

const BouncingIcon = () => {
  return (
    <div className="mb-4 flex justify-center gap-4">
      <div className="relative">
        <div className="flex size-20 animate-bounce items-center justify-center rounded-2xl bg-[var(--t-accent-soft)] p-2">
          <img src={LogoTransparent} alt="" className="h-full w-auto" />
        </div>
      </div>
    </div>
  );
};

export default BouncingIcon;
