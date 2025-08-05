import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];


app.get('/', (req, res) => {
    res.render('index.ejs', { posts });
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

app.post('/post', (req, res) => {
    const post = {
        title: req.body.title,
        blog: req.body.blog,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    }
    posts.push(post);
    // Log the new post to the console for debugging
    console.log('New Post:', post);
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const postIndex = posts.findIndex(post => post.title === req.body.title && post.blog === req.body.blog);
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        console.log('Post deleted:', req.body);
    } else {
        console.log('Post not found for deletion:', req.body);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});