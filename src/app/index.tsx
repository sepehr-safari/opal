import { useLogin, useNdk } from 'nostr-hooks';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import './index.css';

import { ThemeProvider } from '@/shared/components/theme-provider';
import { Toaster } from '@/shared/components/ui/toaster';

import { router } from '@/pages';

export const App = () => {
  const { initNdk, ndk } = useNdk();
  const { loginFromLocalStorage } = useLogin();

  useEffect(() => {
    initNdk({
      explicitRelayUrls: [
        // 'wss://nos.lol',
        'wss://relay.primal.net',
        'wss://relay.damus.io',
        'wss://relay.nostr.band',
      ],
      clientName: 'opal',
    });
  }, [initNdk]);

  useEffect(() => {
    ndk?.connect();
  }, [ndk]);

  useEffect(() => {
    loginFromLocalStorage();
  }, [loginFromLocalStorage]);

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </>
  );
};
