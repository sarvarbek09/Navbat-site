// Ikkala bot (b2c va b2b) ham shu funksiya orqali Telegram'ga xabar yuboradi —
// Telegram Bot API'ni chaqiradi, hech qanday SDK ishlatilmagan (raw fetch).
export async function sendTelegramMessage(botToken: string, chatId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}
