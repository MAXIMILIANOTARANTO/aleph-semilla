// Este archivo debe ejecutarse LOCALMENTE en nucleo-ara, no en GitHub Actions. Requiere: npm install @whiskeysockets/baileys && node cuerpo/whatsapp-bridge-v2.js y escanear QR
//
// Boilerplate. No corre en CI. No guarda la sesión dentro del repo.
// Auth: ALEPH_AUTH_DIR (default ~/.aleph-baileys-auth).
// Solo actúa si el mensaje es tuyo (fromMe) o si remoteJid === ALEPH_OWNER_JID.
// El texto del chat no entra al shell. git push usa la credencial ya configurada en la máquina.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFile } = require("child_process");
const { promisify } = require("util");

const execFileAsync = promisify(execFile);

const ROOT = path.resolve(__dirname, "..");
const AUTH_DIR =
  process.env.ALEPH_AUTH_DIR || path.join(os.homedir(), ".aleph-baileys-auth");
const OWNER_JID = process.env.ALEPH_OWNER_JID || "";
const TRIGGER = "aleph hazlo";

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function messageText(msg) {
  const m = msg.message || {};
  return (
    m.conversation ||
    (m.extendedTextMessage && m.extendedTextMessage.text) ||
    ""
  );
}

function saveBlock(text) {
  const dir = path.join(ROOT, "memoria_aleph", "blocks");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, stamp() + "_whatsapp.md");
  const body = [
    "# Bloque WhatsApp",
    "fecha: " + new Date().toISOString(),
    "origen: whatsapp-bridge-v2 local",
    "",
    text.trim(),
    "",
  ].join("\n");
  fs.writeFileSync(file, body, "utf8");
  return file;
}

async function gitPush(absFile) {
  const rel = path.relative(ROOT, absFile);
  await execFileAsync("git", ["add", "--", rel], { cwd: ROOT });
  await execFileAsync(
    "git",
    ["commit", "-m", "aleph: bloque whatsapp local"],
    { cwd: ROOT }
  );
  await execFileAsync("git", ["push"], { cwd: ROOT });
  return rel;
}

async function main() {
  const baileys = await import("@whiskeysockets/baileys");
  const { makeWASocket, useMultiFileAuthState, DisconnectReason } = baileys;
  let Boom;
  try {
    ({ Boom } = await import("@hapi/boom"));
  } catch {
    Boom = null;
  }
  let qrcode = null;
  try {
    qrcode = await import("qrcode-terminal");
  } catch {
    qrcode = null;
  }

  fs.mkdirSync(AUTH_DIR, { recursive: true });
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);

  const sock = makeWASocket({
    auth: state,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect, qr } = update;
    if (qr) {
      console.log("Escanea el QR con WhatsApp > Dispositivos vinculados.");
      if (qrcode && qrcode.generate) qrcode.generate(qr, { small: true });
      else console.log(qr);
    }
    if (connection === "open") {
      console.log("bridge local abierto. trigger:", TRIGGER);
    }
    if (connection === "close") {
      const status = Boom
        ? new Boom(lastDisconnect && lastDisconnect.error).output.statusCode
        : undefined;
      const loggedOut = status === DisconnectReason.loggedOut;
      console.log("conexion cerrada", status || "");
      if (!loggedOut) setTimeout(main, 2000);
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    for (const msg of messages) {
      const jid = msg.key.remoteJid || "";
      const own = msg.key.fromMe === true || (OWNER_JID && jid === OWNER_JID);
      if (!own) continue;
      const text = messageText(msg);
      if (!text.toLowerCase().includes(TRIGGER)) continue;
      const file = saveBlock(text);
      try {
        const rel = await gitPush(file);
        await sock.sendMessage(jid, { text: "bloque guardado: " + rel });
      } catch (err) {
        const reason = err && err.message ? err.message : String(err);
        await sock.sendMessage(jid, {
          text: "bloque escrito en disco, push no salio: " + reason,
        });
      }
    }
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
