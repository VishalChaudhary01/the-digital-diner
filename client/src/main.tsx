import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import { NuqsAdapter } from 'nuqs/adapters/react';
import './index.css';
import App from './App.tsx';
import { RootProvider } from './providers/root.provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NuqsAdapter>
      <Toaster richColors />
      <RootProvider>
        <App />
      </RootProvider>
    </NuqsAdapter>
  </StrictMode>
);
