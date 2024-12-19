import { Outlet, createBrowserRouter } from 'react-router-dom';

import { Controlbar } from '@/features/controlbar';
import { Navbar } from '@/features/navbar';

const Layout = () => {
  return (
    <>
      <div className="max-w-md mx-auto w-full h-full">
        <Navbar />

        <div className="pb-16">
          <Outlet />
        </div>

        <Controlbar />
      </div>
    </>
  );
};

const HomePage = () => import('./home');
const ProfilePage = () => import('./profile');
const MessagesPage = () => import('./messages');
const NotesPage = () => import('./notes');

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
        path: '/notes',
        async lazy() {
          return { Component: (await NotesPage()).NotesPage };
        },
      },
    ],
  },
]);
