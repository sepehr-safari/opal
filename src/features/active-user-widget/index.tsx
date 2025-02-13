import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { KeySquareIcon, PowerIcon, UserIcon } from 'lucide-react';
import { useActiveUser, useLogin, useRealtimeProfile } from 'nostr-hooks';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { ellipsis } from '@/shared/utils';

import { CredentialsDocument } from '@/features/credentials-document';

export const ActiveUserWidget = () => {
  const [open, setOpen] = useState(false);

  const { activeUser } = useActiveUser();
  const { profile } = useRealtimeProfile(activeUser?.pubkey);
  const { logout, loginData } = useLogin();

  const navigate = useNavigate();

  const downloadCredentials = useCallback(
    async ({ npub, nsec }: { npub: string; nsec: string }) => {
      const fileName = 'opal-credentials.pdf';
      const blob = await pdf(<CredentialsDocument npub={npub} nsec={nsec} />).toBlob();
      saveAs(blob, fileName);
    },
    [],
  );

  if (!activeUser) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-2 cursor-pointer bg-secondary rounded-full lg:pl-1 lg:pr-2 lg:py-1">
            <Avatar>
              <AvatarImage
                src={profile?.image?.toString()}
                alt={profile?.name?.toString()}
                className="object-cover"
              />
              <AvatarFallback className="bg-background/50" />
            </Avatar>

            <div className="text-start pr-2 hidden lg:block">
              {profile?.name && <div className="text-sm">{profile.name.toString()}</div>}
              <div className="text-xs text-primary/70">
                {profile?.nip05?.toString() || ellipsis(activeUser.npub, 10)}
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" sideOffset={8}>
          <DropdownMenuItem onClick={() => navigate(`/profile/${activeUser.npub}`)}>
            <UserIcon className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              downloadCredentials({ npub: activeUser.npub, nsec: loginData.privateKey || '' })
            }
          >
            <KeySquareIcon className="w-4 h-4 mr-2" />
            Credentials (PDF)
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <PowerIcon className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do you want to save your credentials?</AlertDialogTitle>
            <AlertDialogDescription>
              If you logout without saving your credentials, you will lose access to your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                logout();
              }}
            >
              No! Logout without saving
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                downloadCredentials({
                  npub: activeUser.npub,
                  nsec: loginData.privateKey || '',
                }).then(() => logout())
              }
            >
              Yes! Save and Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
