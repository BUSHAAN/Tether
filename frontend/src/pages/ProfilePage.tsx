import { Camera, Mail, Pencil, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import DefaultAvatar from "../assets/avatar.png";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Input } from "../components/ui";

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
    if (!fullName.trim()) return toast.error("Full name is required");
    if (fullName.length < 3)
      return toast.error("Full name must be at least 3 characters long");
    if (profilePic.length > 1000000)
      return toast.error("Profile picture is too large");

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
    <div className="relative min-h-dvh pt-20">
      <div className="app-atmosphere" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-2xl p-4 py-8">
        <div className="space-y-8 rounded-[var(--t-radius-lg)] border border-[var(--t-border)] bg-[var(--t-surface)] p-6 sm:p-8">
          <div className="text-center">
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              Profile
            </h1>
            <p className="mt-2 text-[var(--t-muted)]">
              Manage your profile settings
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={formData.profilePic || DefaultAvatar}
                alt="Profile"
                className="size-32 rounded-full border-4 border-[var(--t-border)] object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute right-0 bottom-0 cursor-pointer rounded-full bg-[var(--t-accent)] p-2 text-[var(--t-accent-ink)] transition-transform hover:scale-105 ${
                  isUpdatingProfile ? "pointer-events-none animate-pulse" : ""
                }`}
              >
                <Camera className="size-5" />
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
            <p className="text-sm text-[var(--t-muted)]">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click to change profile picture"}
            </p>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <Input
              label="Name"
              type="text"
              id="name"
              value={formData.fullName}
              placeholder="Your name"
              leftIcon={<User className="size-4" />}
              rightSlot={<Pencil className="size-4 text-[var(--t-faint)]" />}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-sm font-medium text-[var(--t-text)]">
                <Mail className="size-4 text-[var(--t-faint)]" />
                Email Address
              </div>
              <p
                onClick={() => toast.error("Cannot change email address")}
                className="cursor-not-allowed rounded-[var(--t-radius)] border border-[var(--t-border)] bg-[var(--t-bg)] px-4 py-2.5 text-sm text-[var(--t-muted)]"
              >
                {authUser?.email}
              </p>
            </div>

            <div className="flex justify-end border-t border-[var(--t-border)] pt-6">
              <Button type="submit" loading={isUpdatingProfile}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
