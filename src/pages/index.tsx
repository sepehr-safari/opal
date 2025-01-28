import {
  BellIcon,
  HelpCircleIcon,
  HomeIcon,
  MailIcon,
  NotepadTextIcon,
  SearchIcon,
} from 'lucide-react';
import { useActiveUser } from 'nostr-hooks';
import { Link, Outlet, createBrowserRouter } from 'react-router-dom';

import { ActiveUserWidget } from '@/features/active-user-widget';
import { LoginWidget } from '@/features/login-widget';
import { SearchWidget } from '@/features/search-widget';

const Layout = () => {
  const { activeUser } = useActiveUser();

  return (
    <>
      <div className="flex h-full w-full max-w-screen-lg mx-auto overflow-hidden">
        <div
          id="sidebar"
          className="hidden flex-col gap-2 overflow-hidden items-center p-2 border-r w-16 md:flex lg:w-48"
        >
          <Link to="/" className="flex items-center gap-2 p-2 w-full">
            <div className="w-8 h-8">
              <img src="/opal.svg" alt="OPAL" className="w-8 h-8 object-contain" />
            </div>

            <span className="text-lg font-bold hidden lg:block">OPAL</span>
          </Link>

          <div className="flex flex-col gap-2 w-full items-center lg:items-start">
            <Link
              to="/"
              className="flex items-center gap-2 p-2 transition-colors duration-500 ease-out text-foreground/60 hover:text-foreground w-full rounded-lg hover:bg-secondary"
            >
              <div>
                <HomeIcon size={24} />
              </div>

              <span className="hidden lg:block">Housing</span>
            </Link>

            <Link
              to="/posts"
              className="flex items-center gap-2 p-2 transition-colors duration-500 ease-out text-foreground/60 hover:text-foreground w-full rounded-lg hover:bg-secondary"
            >
              <div>
                <NotepadTextIcon size={24} />
              </div>

              <span className="hidden lg:block">Posts</span>
            </Link>

            <Link
              to="/messages"
              className="flex items-center gap-2 p-2 transition-colors duration-500 ease-out text-foreground/60 hover:text-foreground w-full rounded-lg hover:bg-secondary"
            >
              <div>
                <MailIcon size={24} />
              </div>

              <span className="hidden lg:block">Messages</span>
            </Link>

            <Link
              to="/notifications"
              className="flex items-center gap-2 p-2 transition-colors duration-500 ease-out text-foreground/60 hover:text-foreground w-full rounded-lg hover:bg-secondary"
            >
              <div>
                <BellIcon size={24} />
              </div>

              <span className="hidden lg:block">Notifications</span>
            </Link>

            <SearchWidget>
              <div className="flex items-center gap-2 p-2 transition-colors duration-500 ease-out text-foreground/60 hover:text-foreground w-full rounded-lg hover:bg-secondary hover:cursor-pointer">
                <div>
                  <SearchIcon size={24} />
                </div>

                <span className="hidden lg:block">Search</span>
              </div>
            </SearchWidget>

            <Link
              to="/help"
              className="flex items-center gap-2 p-2 transition-colors duration-500 ease-out text-foreground/60 hover:text-foreground w-full rounded-lg hover:bg-secondary"
            >
              <div>
                <HelpCircleIcon size={24} />
              </div>

              <span className="hidden lg:block">Help</span>
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
                <div className="w-8 h-8">
                  <img src="/opal.svg" alt="OPAL" className="w-8 h-8 object-contain" />
                </div>

                <span className="text-lg font-bold">OPAL</span>
              </Link>
            </div>

            <div>{activeUser ? <ActiveUserWidget /> : <LoginWidget />}</div>
          </div>

          <div className="h-full w-full pb-32 md:pb-0">
            <Outlet />
          </div>

          <div
            id="controlbar"
            className="fixed overflow-hidden w-full border-t px-4 py-2 bottom-0 z-10 bg-background md:hidden"
          >
            <div className="flex flex-row gap-2 w-full items-center justify-between">
              <Link
                to="/"
                className="w-full flex items-center justify-center gap-2 p-2 rounded-lg transition-colors duration-500 ease-out text-foreground/60 hover:text-foreground hover:bg-secondary"
              >
                <div>
                  <HomeIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              <Link
                to="/posts"
                className="w-full flex items-center justify-center gap-2 p-2 rounded-lg transition-colors duration-500 ease-out text-foreground/60 hover:text-foreground hover:bg-secondary"
              >
                <div>
                  <NotepadTextIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              <Link
                to="/messages"
                className="w-full flex items-center justify-center gap-2 p-2 rounded-lg transition-colors duration-500 ease-out text-foreground/60 hover:text-foreground hover:bg-secondary"
              >
                <div>
                  <MailIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              <Link
                to="/notifications"
                className="w-full flex items-center justify-center gap-2 p-2 rounded-lg transition-colors duration-500 ease-out text-foreground/60 hover:text-foreground hover:bg-secondary"
              >
                <div>
                  <BellIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              <SearchWidget>
                <div className="w-full flex items-center justify-center gap-2 p-2 rounded-lg transition-colors duration-500 ease-out text-foreground/60 hover:text-foreground hover:bg-secondary hover:cursor-pointer">
                  <div>
                    <SearchIcon size={28} strokeWidth={1.4} />
                  </div>
                </div>
              </SearchWidget>

              <Link
                to="/help"
                className="w-full flex items-center justify-center gap-2 p-2 rounded-lg transition-colors duration-500 ease-out text-foreground/60 hover:text-foreground hover:bg-secondary"
              >
                <div>
                  <HelpCircleIcon size={28} strokeWidth={1.4} />
                </div>
              </Link>

              {/* <DropdownMenu>
                <DropdownMenuTrigger>
                  <div               className="w-full flex items-center gap-2 p-2 rounded-lg transition-colors duration-500 ease-out text-foreground/60 hover:text-foreground hover:bg-secondary"
>
                    <MenuIcon size={28} strokeWidth={1.4} />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
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
                </DropdownMenuContent>
              </DropdownMenu> */}
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
const NotificationsPage = () => import('./notifications');
const HelpPage = () => import('./help');

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
        path: '/posts',
        async lazy() {
          return { Component: (await NotesPage()).NotesPage };
        },
      },
      {
        path: '/posts/:noteId',
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
      {
        path: '/notifications',
        async lazy() {
          return { Component: (await NotificationsPage()).NotificationsPage };
        },
      },
      {
        path: '/help',
        async lazy() {
          return { Component: (await HelpPage()).HelpPage };
        },
      },
    ],
  },
]);
