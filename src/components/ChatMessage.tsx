import type { User, Message } from '@/pages/Index';

interface ChatMessageProps {
  message: Message;
  user?: User;
  isCurrentUser: boolean;
}

const ChatMessage = ({ message, user, isCurrentUser }: ChatMessageProps) => {
  const isSystem = message.userId === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center animate-fade-in">
        <div className="bg-muted/50 px-4 py-2 rounded-full text-sm text-muted-foreground">
          {message.text}
        </div>
      </div>
    );
  }

  const time = message.timestamp.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`flex gap-3 animate-fade-in ${
        isCurrentUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {!isCurrentUser && user && (
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold flex-shrink-0 border-2 border-transparent"
          style={{ backgroundColor: user.color }}
        >
          {user.avatar}
        </div>
      )}

      <div
        className={`flex flex-col max-w-[70%] ${
          isCurrentUser ? 'items-end' : 'items-start'
        }`}
      >
        {!isCurrentUser && user && (
          <p className="text-xs font-medium mb-1 px-1" style={{ color: user.color }}>
            {user.nickname}
          </p>
        )}

        <div
          className={`px-4 py-2.5 rounded-2xl shadow-sm ${
            isCurrentUser
              ? 'gradient-primary text-white rounded-tr-md'
              : 'bg-card text-foreground rounded-tl-md border border-border'
          }`}
        >
          <p className="text-base break-words">{message.text}</p>
        </div>

        <p
          className={`text-xs text-muted-foreground mt-1 px-1 ${
            isCurrentUser ? 'text-right' : 'text-left'
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
