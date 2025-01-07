import { GitHubLogoIcon } from '@radix-ui/react-icons';
import {
  ArrowRightIcon,
  BellIcon,
  BookmarkIcon,
  CompassIcon,
  HomeIcon,
  MailIcon,
  MenuIcon,
  MoonIcon,
  NotepadTextIcon,
  SunIcon,
} from 'lucide-react';
import { useActiveUser } from 'nostr-hooks';
import { Link, Outlet, createBrowserRouter } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

import { useTheme } from '@/shared/components/theme-provider';

import { ActiveUserWidget } from '@/features/active-user-widget';
import { LoginWidget } from '@/features/login-widget';

const Layout = () => {
  const { activeUser } = useActiveUser();

  const { setTheme, theme } = useTheme();

  return (
    <>
      <div className="flex h-full w-full max-w-screen-lg mx-auto overflow-hidden">
        <div
          id="sidebar"
          className="hidden flex-col gap-2 overflow-hidden items-center p-2 border-r w-16 md:flex lg:w-48"
        >
          <Link to="/" className="flex items-center gap-2 p-2 w-full">
            {/* <div className="w-8 h-8">
              <img src="/opal.png" alt="OPAL" className="w-8 h-8 object-contain" />
            </div> */}

            <span className="text-lg font-bold hidden lg:block">OPAL</span>
          </Link>

          <div className="flex flex-col gap-2 w-full items-center lg:items-start">
            <Link to="/" className="flex items-center gap-2 p-2 rounded-lg w-full hover:bg-muted">
              <div>
                <HomeIcon size={24} />
              </div>

              <span className="hidden lg:block">Housing</span>
            </Link>

            <Link
              to="/notes"
              className="flex items-center gap-2 p-2 rounded-lg w-full hover:bg-muted"
            >
              <div>
                <NotepadTextIcon size={24} />
              </div>

              <span className="hidden lg:block">Notes</span>
            </Link>

            <Link
              to="/messages"
              className="flex items-center gap-2 p-2 rounded-lg w-full hover:bg-muted"
            >
              <div>
                <MailIcon size={24} />
              </div>

              <span className="hidden lg:block">Messages</span>
            </Link>

            <Link to="/" className="flex items-center gap-2 p-2 rounded-lg w-full hover:bg-muted">
              <div>
                <BookmarkIcon size={24} />
              </div>

              <span className="hidden lg:block">Bookmarks</span>
            </Link>

            <Link to="/" className="flex items-center gap-2 p-2 rounded-lg w-full hover:bg-muted">
              <div>
                <BellIcon size={24} />
              </div>

              <span className="hidden lg:block">Notifications</span>
            </Link>
          </div>

          <div className="mt-auto w-full">
            <div className="flex flex-col gap-4 w-full items-center">
              <div className="w-full">{activeUser ? <ActiveUserWidget /> : <LoginWidget />}</div>
            </div>
          </div>
        </div>

        <div id="main" className="overflow-hidden w-full">
          <div
            id="navbar"
            className="flex items-center justify-between p-2 border-b w-full bg-background md:hidden"
          >
            <div className="flex items-center gap-2 ">
              <Link to="/" className="flex items-center gap-2">
                {/* <div className="w-8 h-8">
                  <img src="/opal.png" alt="OPAL" className="w-8 h-8 object-contain" />
                </div> */}

                <span className="text-lg font-bold">OPAL</span>
              </Link>
            </div>

            <div>{activeUser ? <ActiveUserWidget /> : <LoginWidget />}</div>
          </div>

          <div className="h-full w-full overflow-y-auto pb-32">
            <Outlet />
          </div>

          <div
            id="controlbar"
            className="fixed overflow-hidden w-full border-t px-4 py-2 bottom-0 z-10 bg-background md:hidden"
          >
            <div className="flex flex-row gap-2 w-full items-center justify-between">
              <Link to="/" className="flex items-center gap-2 text-primary/60 hover:text-primary">
                <div>
                  <HomeIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              <Link
                to="/explore"
                className="flex items-center gap-2 text-primary/60 hover:text-primary"
              >
                <div>
                  <CompassIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              <Link
                to="/messages"
                className="flex items-center gap-2 text-primary/60 hover:text-primary"
              >
                <div>
                  <MailIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-2 text-primary/60 hover:text-primary">
                    <MenuIcon size={28} strokeWidth={1.4} />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Button variant="ghost" asChild>
                      <a
                        href="https://osty.dev"
                        target="_blank"
                        rel="noreferrer"
                        className="flex gap-2"
                      >
                        <ArrowRightIcon size={18} />
                        Powered by Osty
                      </a>
                    </Button>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    {theme === 'dark' ? (
                      <Button
                        variant="ghost"
                        className="flex gap-2"
                        onClick={() => setTheme('light')}
                      >
                        <SunIcon size={18} />

                        <span>Switch to light</span>
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        className="flex gap-2"
                        onClick={() => setTheme('dark')}
                      >
                        <MoonIcon size={18} />

                        <span>Switch to dark</span>
                      </Button>
                    )}
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Button variant="ghost" asChild>
                      <a
                        href="https://github.com/ostyjs/create-osty"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2"
                      >
                        <GitHubLogoIcon />

                        <span>GitHub</span>
                      </a>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const HomePage = () => import('./home');
const NotesPage = () => import('./notes');
const ProfilePage = () => import('./profile');
const MessagesPage = () => import('./messages');

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        async lazy() {
          return { Component: (await HomePage()).HomePage };
        },
      },
      {
        path: '/notes',
        async lazy() {
          return { Component: (await NotesPage()).NotesPage };
        },
      },
      {
        path: '/notes/:noteId',
        async lazy() {
          return { Component: (await NotesPage()).NotesPage };
        },
      },
      {
        path: '/profile/:npub',
        async lazy() {
          return { Component: (await ProfilePage()).ProfilePage };
        },
      },
      {
        path: '/messages',
        async lazy() {
          return { Component: (await MessagesPage()).MessagesPage };
        },
      },
      {
        path: '/messages/:npub',
        async lazy() {
          return { Component: (await MessagesPage()).MessagesPage };
        },
      },
    ],
  },
]);
