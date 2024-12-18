import { SideBar } from '../../components/Chat/SideBar';
import { ChatContainer } from '../../components/Chat/ChatContainer';
import { NoChatSelected } from '../../components/Chat/NoChatSelected';
import { useChatStore } from '../../store/chatStore';

export const Message = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="lg:flex -mt-6 lg:-mt-10 lg:-mb-14 -mx-6 lg:-ml-12 w-[calc(100%+3rem)] lg:border-r border-color-30 md:mr-2">
      <div className={`${!selectedUser ? '' : 'hidden lg:block'}`}>
        <SideBar />
      </div>

      {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
    </div>
  );
};
