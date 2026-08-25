// KIRISH NUQTASI — `npm run dev` yoki `npm start` shu faylni ishga tushiradi.
// "dotenv/config" ENG BIRINCHI import qilinishi shart — shundan keyingina
// ./config/env va boshqa fayllar process.env dan to'g'ri o'qiy oladi.
import "dotenv/config";
import { app } from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
  console.log(`✅ Navbat backend ${env.PORT}-portda ishga tushdi (http://localhost:${env.PORT})`);
});
