import { Camera, Mail, Pencil, User, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import DefaultAvatar from "../assets/avatar.png";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    profilePic: authUser?.profilePic || "",
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({ ...prev, profilePic: base64String }));
    };
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, profilePic } = formData;
    if (!fullName.trim()) return alert("Full name is required");
    if (fullName.length < 3)
      return alert("Full name must be at least 3 characters long");
    if (profilePic.length > 1000000)
      return alert("Profile picture is too large");

    const updatedData: Partial<typeof formData> = {};
    if (fullName !== authUser?.fullName) updatedData.fullName = fullName;
    if (profilePic && profilePic !== authUser?.profilePic)
      updatedData.profilePic = profilePic;

    if (Object.keys(updatedData).length === 0) {
      return toast.error("No changes made to update");
    }

    await updateProfile(updatedData);
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8 relative">
          <Link to="/" className="absolute right-4 top-4">
            <X />
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="mt-2">Manage your profile settings</p>
          </div>

          {/* Profile Image Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={formData.profilePic || DefaultAvatar}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0
                  right-0 bg-base-content hover:scale-105 p-2
                  rounded-full cursor-pointer transition-all
                  duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }`}
              >
                <Camera className="size-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="test-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click to change profile picture"}
            </p>
          </div>

          {/* Profile Information Section */}
          <div className="space-y-1.5">
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="space-y-1.5 relative">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name
                </div>
                <div className="absolute inset-y-0 right-3 top-7.5 pl-3 flex items-center z-10">
                  <Pencil className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={formData.fullName}
                  className="input border-zinc-700 rounded-lg w-full"
                  placeholder="you@example.com"
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <p
                  onClick={() => {
                    return toast.error("Cannot change email address");
                  }}
                  className="px-4 py-2.5 bg-base-200 rounded-lg border-1 border-zinc-700"
                >
                  {authUser?.email}
                </p>
              </div>
              <div className=" flex w-full flex-col bg-base-300 rounded-xl p-6">
                <button
                  disabled={isUpdatingProfile}
                  type="submit"
                  style={{ width: "150px", alignSelf: "end" }}
                  className=" btn btn-primary "
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
