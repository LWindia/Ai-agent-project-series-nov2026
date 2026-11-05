/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Google Apps Script web-app URL (ends in /exec) for the contact form. */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
