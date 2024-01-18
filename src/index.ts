import { LocalAuth, Client } from "whatsapp-web.js";
import * as qrcode from "qrcode-terminal";
import CommandHandler from "./commandHandler";

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on("qr", (qr: string) => {
  qrcode.generate(qr, { small: true });
});

client.on('message_create', msg => {
  CommandHandler.handleCommand(msg, client);
});

client.on('message_revoke_everyone', (after, before) => {
  CommandHandler.removedMessage(after, before);
});

client.on("ready", () => {
  console.log("[+] HaloBot Running!");
});

client.initialize();