import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { PasswordInput } from '../components/PasswordInput';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import avatar from '../assets/avatar.webp';
import { compressAndResizeImage } from '../utils/compressAndResizeImage';

export const Profile = () => {
  const { updateProfile, user, isLoading } = useAuthStore();

  const [selectedImg, setSelectedImg] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const [username, setUserName] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [fullName, setFullName] = useState(user?.fullName);
  const [bio, setBio] = useState(user?.bio);
  const [password, setPassword] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      // Resize to 150px width and compress
      const compressedImage = await compressAndResizeImage(file);

      setSelectedImg(compressedImage); // Set the compressed image as Base64
      setProfilePic(compressedImage);
    } catch (error) {
      console.error('Error compressing and resizing the image:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        password,
        fullName,
        email,
        bio,
        username,
        profilePic,
      };

      await updateProfile(payload);
      toast.success('Profile updated');
      setPassword('');
    } catch (error) {
      toast.error(error.response.data.message || 'Error updating profile');
    }
  };

  return (
    <div className="w-full lg:w-[35rem] max-md:mb-10">
      <h2 className="text-2xl">Update Profile</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-6 mt-10">
        <div className="flex items-center gap-4">
          <img
            src={selectedImg || user?.profilePic || avatar}
            className="size-14 rounded-full object-cover border border-color-50"
          />
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            id="fileInput"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="fileInput"
            className="border border-color-50 text-sm px-3 py-1.5 rounded cursor-pointer hover:bg-base-200 duration-200"
          >
            Upload new pic
          </label>
        </div>

        <div className="space-y-1">
          <p>Username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="input-box"
            placeholder="Username"
          />
        </div>

        <div className="space-y-1">
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-box"
            placeholder="Email"
          />
          {!user.isVerified && (
            <span className="text-xs ml-2 italic">
              *Please verify your email
            </span>
          )}
        </div>

        <div className="space-y-1">
          <p>Full name</p>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input-box"
            placeholder="Name"
          />
        </div>

        <div className="space-y-1">
          <p>Your Bio</p>
          <textarea
            className="input-box"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio..."
          ></textarea>
        </div>

        <div className="space-y-1">
          <p>Password</p>
          <div className="mt-4">
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={'Current password'}
            />

            <p className="text-xs italic mt-2">
              *Please enter current password to update profile
            </p>
          </div>
        </div>

        <button type="submit" className="btn-normal w-40 mt-4">
          {isLoading ? (
            <Loader className="animate-spin mx-auto" />
          ) : (
            'Update Profile'
          )}
        </button>
      </form>
    </div>
  );
};
