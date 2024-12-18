import { MessageCircle } from 'lucide-react';

export const NoChatSelected = () => {
  return (
    <div className="hidden lg:flex flex-col gap-4 text-center items-center justify-center w-96 mx-auto">
      <div className="flex items-center justify-center size-14 bg-primary/10 rounded-full">
        <MessageCircle className="text-primary size-7" />
      </div>

      <h2 className="text-2xl font-bold">Select a message</h2>

      <p className="text-base-content/70">
        Choose from your existing conversations, start a new one, or just keep
        swimming.
      </p>
    </div>
  );
};
