import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import type { User } from '@/pages/Index';

interface UsersListProps {
  users: User[];
  currentUserId: string;
}

const UsersList = ({ users, currentUserId }: UsersListProps) => {
  const onlineUsers = users.filter((u) => u.status === 'online');
  const offlineUsers = users.filter((u) => u.status === 'offline');

  const UserItem = ({ user }: { user: User }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer animate-fade-in">
      <div className="relative">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold border-2"
          style={{
            backgroundColor: user.color,
            borderColor: user.id === currentUserId ? '#8B5CF6' : 'transparent',
          }}
        >
          {user.avatar}
        </div>
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
            user.status === 'online' ? 'bg-green-500 animate-pulse-ring' : 'bg-gray-400'
          }`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <p className="font-semibold truncate">{user.nickname}</p>
          {user.id === currentUserId && (
            <span className="text-xs text-primary">(вы)</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {user.customStatus || (user.status === 'online' ? 'В сети' : 'Не в сети')}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="Users" size={20} className="text-primary" />
          <h2 className="font-semibold text-lg">Участники</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {onlineUsers.length} онлайн • {users.length} всего
        </p>
      </div>

      <ScrollArea className="flex-1 px-2">
        {onlineUsers.length > 0 && (
          <div className="py-2">
            <div className="px-2 py-1 mb-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Онлайн — {onlineUsers.length}
              </p>
            </div>
            {onlineUsers.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
        )}

        {offlineUsers.length > 0 && (
          <>
            <Separator className="my-2" />
            <div className="py-2">
              <div className="px-2 py-1 mb-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Оффлайн — {offlineUsers.length}
                </p>
              </div>
              {offlineUsers.map((user) => (
                <UserItem key={user.id} user={user} />
              ))}
            </div>
          </>
        )}
      </ScrollArea>
    </div>
  );
};

export default UsersList;
