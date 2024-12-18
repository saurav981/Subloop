import { SendHorizontal, ArrowLeft } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { MessageSkeleton } from './Skeletons/MessageSkeleton';
import { useEffect, useRef, useState } from 'react';
import avatar from '../../assets/avatar.webp';
import avatarDark from '../../assets/avatarDark.webp';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

export const ChatContainer = () => {
  const { theme } = useThemeStore();
  const inputField = useRef('');

  const [text, setText] = useState('');
  const {
    sendMessage,
    selectedUser,
    setSelectedUser,
    messages,
    getMessages,
    isLoading,
    listenToMessages,
    stopListeningToMessages,
    purchase,
  } = useChatStore();

  const { user, onlineUsers } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    listenToMessages();

    return () => stopListeningToMessages();
  }, [
    selectedUser._id,
    getMessages,
    listenToMessages,
    stopListeningToMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await sendMessage({ textMessage: text.trim() });
      setText('');
      if (inputField.current) inputField.current.focus();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isLoading) return <MessageSkeleton />;

  function formatTimeISO(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  return (
    <div className="lg:flex flex-col flex-1">
      {/* 1 */}
      {/* 1 */}
      <div className="flex px-4 py-2.5 items-center gap-4 border-b border-color-30">
        <div
          onClick={() => {
            setSelectedUser(null);
          }}
          className="flex items-center justify-center hover:bg-base-200 rounded-full transition-all"
        >
          <ArrowLeft className="size-5 m-2" />
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <img
              src={
                selectedUser.profilePic ||
                `${theme === 'dark' ? avatarDark : avatar}`
              }
              alt="profile pic"
              className="size-10 object-cover rounded-full"
            />
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">
                {selectedUser?.fullName || selectedUser.username}
              </span>
              {onlineUsers.includes(selectedUser._id) && (
                <span className="text-xs text-base-content/70">Online</span>
              )}
            </div>
          </div>

          {user?.role === 'fan' && (
            <span className="text-xs border border-color-30 bg-base-200 px-2 py-1">
              {purchase?.remainingMessages} messages left
            </span>
          )}
        </div>
      </div>

      {/* 2 */}
      {/* 2 */}
      <div className="h-[calc(100vh-8rem)] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === user._id ? 'chat-end' : 'chat-start'
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-8 rounded-full">
                <img
                  src={`${
                    message.senderId === user._id
                      ? user?.profilePic || avatar
                      : selectedUser.profilePic || avatar
                  }`}
                  alt="profile pic"
                />
              </div>
            </div>

            <div className="chat-header">
              <time className="text-sm opacity-50 ml-1">
                {formatTimeISO(message.createdAt)}
              </time>
              {message.textMessage && (
                // <div className="chat-bubble flex items-center">
                //   <p>{message.textMessage}</p>
                // </div>
                <div className="bg-base-300 w-fit px-3.5 py-2 mt-1 rounded-lg flex items-center">
                  <p>{message.textMessage}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 3 */}
      {/* 3 */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center input-box gap-2 px-4 py-2 m-2 max-w-[calc(100%-16px)]"
      >
        <input
          type="text"
          className="input-box p-0 border-none"
          placeholder="Type a message..."
          value={text}
          ref={inputField}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="cursor-pointer" disabled={!text.trim()}>
          <SendHorizontal
            className={!text.trim() ? 'text-primary/40' : 'text-primary'}
            size={20}
          />
        </button>
      </form>
    </div>
  );
};
