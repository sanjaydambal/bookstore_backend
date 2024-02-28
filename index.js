import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'online_bookstore'
});



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/books', (req, res) => {
    const { title, description, price, cover_image } = req.body;
    db.query('INSERT INTO books (`title`, `description`, `price`, `cover_image`) VALUES (?, ?, ?, ?)', [title, description, price, cover_image], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding book');
            return;
        }
        res.send('Book added successfully!');
    });
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM books WHERE id =?', [id], (err, results) => {
        if (err) throw err;
        res.send('Book deleted successfully!');
    });
});

app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, price, cover_image } = req.body;
    db.query('UPDATE books SET `title` =?, `description` =?, `price` =?, `cover_image` =? WHERE id =?', [title, description, price, cover_image, id], (err, results) => {
        if (err) throw err;
        res.send('Book updated successfully!');
    });
});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
