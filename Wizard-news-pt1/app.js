const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const timeAgo = require('node-time-ago');

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'))

app.get("./logo.png")

app.get("/", (req, res) => {
  //get list of posts
  const posts = postBank.list();

  //prepare html to send as output
  const html = 
  `<!DOCTYPE html>
 <html>
 <head>
   <title>Wizard News</title>
   <link rel="stylesheet" href="/style.css" />
 </head>
 <body>
   <div class="news-list">
     <header><img src="/logo.png"/>Wizard News</header>
     ${posts.map(post => `
       <div class='news-item'>
         <p>
           <span class="news-position">${post.id}. <a href="/posts/${post.id}">${post.title}</a>. ▲</span>
           <small>(by ${post.name})</small>
         </p>
         <small class="news-info">
           ${post.upvotes} upvotes | ${timeAgo(post.date)}
         </small>
       </div>`
     ).join('')}
   </div>
 </body>
</html>`

  //send a response
  res.send(html)
});

app.get('/posts/:id', async (req, res, next) => {
  const id = req.params.id;
  const post = postBank.find(id);

  console.log(post)

  if(post.id === undefined) {
    // res.send("page not found")
    next()
  } else {
        //prepare html to send as output
  const html = 
  `<!DOCTYPE html>
 <html>
 <head>
   <title>Wizard News</title>
   <link rel="stylesheet" href="/style.css" />
 </head>
 <body>
   <div class="news-list">
     <header><img src="/logo.png"/>Wizard News</header>
    
       <div class='news-item'>
         <p>
           <span class="news-position">${post.id}. ▲</span>${post.title}
           <small>(by ${post.name})</small>
         </p>
         <small class="news-info">
          ${post.upvotes} upvotes | ${timeAgo(post.date)}
         </small>
         <p>${post.content}</p>
       </div>
   </div>
 </body>
</html>`

  res.send(html)
  }
  
})

app.use(function (req, res, next) {
  res.status(404).send("page not ound")
})

// app.use(function (err, req, res, next) {
//   // console.log({err: err.message})
//   // console.log(err)
//   if(!req.params.id) {
//     console.log({err: err.message})
//     console.log(err)
//   }

// })

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
  // console.log(posts)
});

