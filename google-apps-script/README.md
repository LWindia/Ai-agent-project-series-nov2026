# Contact form → Google Sheets (Apps Script)

1. Create a new Google Sheet (e.g. "Agent Series Leads").
2. In the sheet, open **Extensions → Apps Script**.
3. Delete what's there, paste everything from `Code.gs`, and click **Save**.
4. Click **Deploy → New deployment**, choose type **Web app**, and set:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, approve the permissions, and copy the **Web app URL** (it ends in `/exec`).
6. Paste that URL into `CONTACT_ENDPOINT` in `src/content.ts`.
7. Test: open the URL in a browser — you should see `{"ok":true,"status":"running"}`.
   Then submit the popup on the site; a row appears in the **Leads** tab.

If you edit `Code.gs` later, use **Deploy → Manage deployments → Edit → Version: New version**
so the same URL picks up your changes.
