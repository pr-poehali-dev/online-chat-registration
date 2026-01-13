import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import type { User } from '@/pages/Index';

interface UserProfileProps {
  user: User;
  onClose: () => void;
  onUpdate: (user: User) => void;
}

const UserProfile = ({ user, onClose, onUpdate }: UserProfileProps) => {
  const [profileLink, setProfileLink] = useState(user.profileLink || '');
  const [customStatus, setCustomStatus] = useState(user.customStatus || '');

  const handleSave = () => {
    onUpdate({
      ...user,
      profileLink: profileLink.trim(),
      customStatus: customStatus.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md shadow-2xl border-2 border-primary/20 animate-slide-in-right">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Профиль</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-semibold border-4 border-primary/50 shadow-lg"
                style={{ backgroundColor: user.color }}
              >
                {user.avatar}
              </div>
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-card animate-pulse-ring" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">{user.nickname}</h3>
              <p className="text-sm text-muted-foreground">
                ID: {user.id.slice(-6)}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profileLink">Ссылка на профиль</Label>
              <div className="flex items-center gap-2">
                <Icon name="Link" size={18} className="text-muted-foreground" />
                <Input
                  id="profileLink"
                  type="text"
                  placeholder="@nickname"
                  value={profileLink}
                  onChange={(e) => setProfileLink(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customStatus">Кастомный статус</Label>
              <div className="flex items-center gap-2">
                <Icon name="MessageSquare" size={18} className="text-muted-foreground" />
                <Input
                  id="customStatus"
                  type="text"
                  placeholder="Расскажите о себе..."
                  value={customStatus}
                  onChange={(e) => setCustomStatus(e.target.value)}
                  maxLength={50}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-2">
            <Button
              onClick={handleSave}
              className="w-full gradient-primary hover:opacity-90 transition-opacity"
            >
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить изменения
            </Button>
            <Button onClick={onClose} variant="outline" className="w-full">
              Отмена
            </Button>
          </div>

          <div className="pt-4 border-t border-border space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Статус:</span>
              <span className="flex items-center gap-2 text-green-500 font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-ring" />
                Онлайн
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Цвет профиля:</span>
              <div
                className="w-6 h-6 rounded-full border-2 border-primary/50"
                style={{ backgroundColor: user.color }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
