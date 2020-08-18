const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");

const app = express();

app.use(morgan('dev'));

app.get("/", (req, res) => {
  //get list of posts
  const posts = postBank.list();
  const fi = postBank.find();

  //prepare html to send as output
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
  </head>
  <body>
    <ul>
      ${posts.map(post => '<li>${postBank.title}</li>').join('')}
    </ul>
  </body>
  </html>`;

  //send a response
  res.send(html)
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

