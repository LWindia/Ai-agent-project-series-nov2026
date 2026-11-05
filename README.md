# AI Agent Project Series — Nov 2026

Landing page for LinuxWorld's **AI Agent Project Series**: a live, hands-on program building three real-world AI agents — **KubeDoctor AI** (Kubernetes troubleshooting), **CloudSentinel AI** (AWS cloud security) and **AIOps Pulse** (infrastructure monitoring).

Built with React, TypeScript, Vite and Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Production build: `npm run build` (output in `dist/`).

## Editing content

Most text and settings live in `src/content.ts`:

| Setting | What it does |
| --- | --- |
| `REGISTER_URL` | Razorpay registration link used by every **Register Now** button |
| `CONTACT_ENDPOINT` | Google Apps Script web-app URL that saves the contact form |
| `PROGRAM` | Start month and recording-access days shown in the FAQ |
| `FAQS` | FAQ questions and answers |

The contact popup opens automatically after ~2.5 screens of scrolling (once per visit). Change `AUTO_OPEN_SCREENS` in `src/components/ContactModal.tsx` to adjust.

## Contact form → Google Sheets

The Apps Script code and setup steps are in [`google-apps-script/`](google-apps-script/README.md). Deploy it as a web app, then paste the `/exec` URL into `CONTACT_ENDPOINT`.
