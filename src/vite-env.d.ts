/// <reference types="vite/client" />

declare module "*.jsx" {
    import type { ComponentType } from "react";
    const component: ComponentType;
    export default component;
}
  
interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_Base_URL: string;
  readonly VITE_EMAIL_API: string;
}



interface ImportMeta {
  readonly env: ImportMetaEnv;
}