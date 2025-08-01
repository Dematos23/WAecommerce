
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
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function UserNav() {
  const router = useRouter();
  const { user, userProfile, loading } = useAuth();
  
  if (loading) {
    return <Button variant="accent" className="font-bold" disabled>Cargando...</Button>;
  }

  if (!user || !userProfile) {
    return (
      <Button asChild variant="accent" className="font-bold">
        <Link href="/login">Ingresar</Link>
      </Button>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
    router.refresh(); 
  }

  const dashboardPath = userProfile.type === 'admin' ? '/admin' : '/dashboard';
  const userName = user.displayName || user.email;
  const userImage = user.photoURL;
  const userInitials = userName?.charAt(0).toUpperCase() || '?';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={userImage || ''} alt={userName || ''} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="flex-col items-start">
          <p className="text-sm font-medium leading-none">{userName}</p>
          {user.email && (
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
            <Link href={dashboardPath}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
            </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
