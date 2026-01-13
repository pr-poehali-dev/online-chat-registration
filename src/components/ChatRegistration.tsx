import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import type { User } from '@/pages/Index';

const AVATAR_OPTIONS = ['😀', '😎', '🚀', '🎨', '🎮', '🎵', '⚡', '🔥', '💎', '🌟', '🦄', '🐱'];
const COLOR_OPTIONS = [
  '#8B5CF6',
  '#D946EF',
  '#F97316',
  '#0EA5E9',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#EC4899',
];

interface ChatRegistrationProps {
  onRegister: (user: User) => void;
}

const ChatRegistration = ({ onRegister }: ChatRegistrationProps) => {
  const [nickname, setNickname] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      const newUser: User = {
        id: Date.now().toString(),
        nickname: nickname.trim(),
        avatar: selectedAvatar,
        color: selectedColor,
        status: 'online',
        profileLink: `@${nickname.toLowerCase().replace(/\s+/g, '')}`,
        customStatus: 'В сети',
      };
      onRegister(newUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted">
      <Card className="w-full max-w-lg shadow-2xl border-2 border-primary/20 animate-fade-in">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-lg">
              <Icon name="MessageCircle" size={40} className="text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold gradient-text">Добро пожаловать в чат!</CardTitle>
          <CardDescription className="text-base">
            Создайте свой профиль и начните общение
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ваш никнейм</label>
              <Input
                type="text"
                placeholder="Введите никнейм..."
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="h-12 text-base"
                maxLength={20}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Выберите аватар</label>
              <div className="grid grid-cols-6 gap-2">
                {AVATAR_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedAvatar(emoji)}
                    className={`text-3xl p-3 rounded-xl transition-all hover:scale-110 ${
                      selectedAvatar === emoji
                        ? 'bg-primary shadow-lg ring-2 ring-primary ring-offset-2 ring-offset-background'
                        : 'bg-card hover:bg-muted'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Выберите цвет профиля</label>
              <div className="grid grid-cols-8 gap-2">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-xl transition-all hover:scale-110 ${
                      selectedColor === color
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-lg'
                        : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity"
              disabled={!nickname.trim()}
            >
              <Icon name="Rocket" size={20} className="mr-2" />
              Начать общение
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatRegistration;
