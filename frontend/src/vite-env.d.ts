/// <reference types="vite/client" />

interface Window {
  twttr?: {
    widgets: {
      load: () => void;
    };
  };
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}
