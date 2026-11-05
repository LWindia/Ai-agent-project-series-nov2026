/**
 * AI Agent Project Series — Contact form → Google Sheets
 *
 * Paste this into Extensions → Apps Script of your Google Sheet,
 * then Deploy → New deployment → Web app (Execute as: Me, Who has access: Anyone).
 * Copy the "/exec" URL into CONTACT_ENDPOINT in src/content.ts.
 */

const SHEET_NAME = 'Leads';
const HEADERS = ['Timestamp', 'Name', 'WhatsApp', 'Email', 'Source', 'Page'];

// Optional: get an email for every new lead. Leave '' to turn off.
const NOTIFY_EMAIL = '';

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const p = (e && e.parameter) || {};

    // Hidden honeypot field — real visitors never fill it.
    if (p.website) return json_({ ok: true });

    const name = clean_(p.name, 100);
    const whatsapp = String(p.whatsapp || '').replace(/[^\d+]/g, '').slice(0, 20);
    const email = clean_(p.email, 150).toLowerCase();
    const source = clean_(p.source, 50);
    const page = clean_(p.page, 300);

    const digits = whatsapp.replace(/\D/g, '');
    if (name.length < 2) return json_({ ok: false, error: 'Please enter your name.' });
    if (digits.length < 10 || digits.length > 15) return json_({ ok: false, error: 'Please enter a valid WhatsApp number.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json_({ ok: false, error: 'Please enter a valid email.' });

    const sheet = getSheet_();
    sheet.appendRow([new Date(), name, "'" + whatsapp, email, source, page]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        'New lead: ' + name,
        'Name: ' + name + '\nWhatsApp: ' + whatsapp + '\nEmail: ' + email + '\nSource: ' + source + '\nPage: ' + page
      );
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'Server error. Please try again.' });
  } finally {
    lock.releaseLock();
  }
}

// Visiting the /exec URL in a browser should show {"ok":true,"status":"running"}.
function doGet() {
  return json_({ ok: true, status: 'running' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

// Trims, limits length and stops spreadsheet formula injection (=, +, -, @).
function clean_(value, max) {
  let v = String(value || '').trim().slice(0, max);
  if (/^[=+\-@]/.test(v)) v = "'" + v;
  return v;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
