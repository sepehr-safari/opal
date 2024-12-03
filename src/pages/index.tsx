import { Outlet, createBrowserRouter } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div className="max-w-md mx-auto w-full h-full">
        <Outlet />
      </div>
    </>
  );
};

const HomePage = () => import('./home');

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
    ],
  },
]);
