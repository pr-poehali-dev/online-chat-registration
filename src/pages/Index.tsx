import { useState } from 'react';
import ChatRegistration from '@/components/ChatRegistration';
import ChatRoom from '@/components/ChatRoom';

export interface User {
  id: string;
  nickname: string;
  avatar: string;
  color: string;
  status: 'online' | 'offline';
  profileLink?: string;
  customStatus?: string;
}

export interface Message {
  id: string;
  userId: string;
  text: string;
  timestamp: Date;
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleRegister = (user: User) => {
    setCurrentUser(user);
    setUsers((prev) => [...prev, user]);
    
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      userId: 'system',
      text: `${user.nickname} присоединился к чату! 👋`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, welcomeMessage]);
  };

  const handleSendMessage = (text: string) => {
    if (!currentUser) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      userId: currentUser.id,
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  if (!currentUser) {
    return <ChatRegistration onRegister={handleRegister} />;
  }

  return (
    <ChatRoom
      currentUser={currentUser}
      users={users}
      messages={messages}
      onSendMessage={handleSendMessage}
      onUpdateProfile={handleUpdateProfile}
    />
  );
};

export default Index;
