import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/hooks/useNotifications';
import Icon from '@/components/ui/icon';
import UserProfile from '@/components/UserProfile';
import UsersList from '@/components/UsersList';
import ChatMessage from '@/components/ChatMessage';
import type { User, Message } from '@/pages/Index';

interface ChatRoomProps {
  currentUser: User;
  users: User[];
  messages: Message[];
  onSendMessage: (text: string) => void;
  onUpdateProfile: (user: User) => void;
}

const ChatRoom = ({
  currentUser,
  users,
  messages,
  onSendMessage,
  onUpdateProfile,
}: ChatRoomProps) => {
  const [messageText, setMessageText] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const previousMessagesCount = useRef(messages.length);
  const previousUsersCount = useRef(users.length);
  const { toast } = useToast();
  const { showNotification } = useNotifications();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length > previousMessagesCount.current) {
      const lastMessage = messages[messages.length - 1];
      const isOwnMessage = lastMessage.userId === currentUser.id;
      const isSystemMessage = lastMessage.userId === 'system';

      if (!isOwnMessage && !isSystemMessage) {
        const sender = users.find((u) => u.id === lastMessage.userId);
        const senderName = sender?.nickname || 'Пользователь';
        
        showNotification(`${senderName}`, {
          body: lastMessage.text,
          tag: 'new-message',
        });

        toast({
          title: `${sender?.avatar || '💬'} ${senderName}`,
          description: lastMessage.text,
        });
      }
    }
    previousMessagesCount.current = messages.length;
  }, [messages, currentUser.id, users, showNotification, toast]);

  useEffect(() => {
    if (users.length > previousUsersCount.current) {
      const newUser = users[users.length - 1];
      if (newUser.id !== currentUser.id) {
        showNotification(`${newUser.avatar} ${newUser.nickname} присоединился!`, {
          body: 'Новый участник в чате',
          tag: 'user-joined',
        });

        toast({
          title: `${newUser.avatar} ${newUser.nickname} присоединился!`,
          description: 'Новый участник в чате',
        });
      }
    }
    previousUsersCount.current = users.length;
  }, [users, currentUser.id, showNotification, toast]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <div className="h-screen flex bg-background">
      <div className="hidden md:flex md:w-80 border-r border-border bg-card">
        <UsersList users={users} currentUserId={currentUser.id} />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b border-border bg-card px-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <UsersList users={users} currentUserId={currentUser.id} />
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <Icon name="MessageCircle" size={24} className="text-primary" />
              <h1 className="text-xl font-semibold">Общий чат</h1>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowProfile(true)}
            className="relative"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-semibold border-2 border-primary/50"
              style={{ backgroundColor: currentUser.color }}
            >
              {currentUser.avatar}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card animate-pulse-ring" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                user={users.find((u) => u.id === message.userId)}
                isCurrentUser={message.userId === currentUser.id}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="border-t border-border bg-card p-4">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto flex gap-2">
            <Input
              type="text"
              placeholder="Напишите сообщение..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 h-12 text-base"
              maxLength={500}
            />
            <Button
              type="submit"
              size="icon"
              className="h-12 w-12 gradient-primary hover:opacity-90 transition-opacity"
              disabled={!messageText.trim()}
            >
              <Icon name="Send" size={20} />
            </Button>
          </form>
        </div>
      </div>

      {showProfile && (
        <UserProfile
          user={currentUser}
          onClose={() => setShowProfile(false)}
          onUpdate={onUpdateProfile}
        />
      )}
    </div>
  );
};

export default ChatRoom;