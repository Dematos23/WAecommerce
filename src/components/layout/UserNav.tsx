
'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, User as UserIcon, Settings } from 'lucide-react';
import { logout } from '@/lib/auth';
import { Session } from 'next-auth';

interface UserNavProps {
  session: Session | null;
}

export function UserNav({ session }: UserNavProps) {

  if (!session) {
    return (
      <Button asChild>
        <Link href="/login">Ingresar</Link>
      </Button>
    );
  }

  const user = session.user;
  const userName = user?.name || user?.email;
  const userImage = user?.image;
  const userInitials = userName?.charAt(0).toUpperCase() || '?';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userImage || ''} alt={userName || ''} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="flex-col items-start">
          <p className="text-sm font-medium leading-none">{userName}</p>
          <p className="text-xs leading-none text-muted-foreground">
            {user?.email}
          </p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
           <Link href="/dashboard">
              <UserIcon className="mr-2" />
              <span>Dashboard</span>
            </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
           <Link href="/dashboard/settings">
              <Settings className="mr-2" />
              <span>Ajustes</span>
            </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={async (event) => {
            event.preventDefault();
            await logout();
          }}
        >
          <LogOut className="mr-2" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
