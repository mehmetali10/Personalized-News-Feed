const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log(req.headers.location)
  res.send('Merhaba, dünya!');
});

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} adresinde çalışıyor.`);
});
