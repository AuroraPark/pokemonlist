const express = require('express');
const app = express();
const path = require('path'); // 절대주소
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // 종류 지정
app.use(methodOverride('_method')); // patch, delete 를 위한 mathod override
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
  {
    id: uuidv4(),
    username: 'Todd',
    comment: 'lodkfjkaksjdkfj',
  },
  {
    id: uuidv4(),
    username: 'Reais',
    comment: 'lodkasdfasdffjkaksjdkfj',
  },
  {
    id: uuidv4(),
    username: 'Kidsde',
    comment: 'asdfasdflodkfjkaksjdkfj',
  },
  {
    id: uuidv4(),
    username: 'Jesse',
    comment: 'lasdfasdfodkfjkaksjdkfj',
  },
];
// Read
app.get('/comments', (req, res) => {
  res.render('comments/index', { comments });
});

// Create
app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  comments.push({ id: uuidv4(), username, comment });
  res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  res.render('comments/show', { comment });
});

app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === id);
  res.render('comments/edit', { comment });
});

// update
app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const newCommentText = req.body.comment;
  const fountComment = comments.find(c => c.id === id);
  fountComment.comment = newCommentText;
  res.redirect('/comments');
});

// delete
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments = comments.filter(c => c.id !== id);
  res.redirect('/comments');
});

// pattern matching
app.get('/api/:sub/:username', (req, res) => {
  const { sub, username } = req.params;
  res.send(`<h1>Browsing the ${sub}의 ${username} page</h1>`);
});

// parameters
app.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send(`<h1>Not Found</h1>`);
  }
  res.send(`<h1>Search : ${q}</h1>`);
});

// app.get('/api/signup', (req, res) => {
//   res.send('api/signup');
// });

app.get('*', (req, res) => {
  res.send('notfound');
});
app.listen(3000, () => {
  console.log('listening on 3000');
});
