import express from 'express';
const app = express();
app.get('/teste', (req, res) => {
    res.json([
        { id: 1, name: 'Mateus' },
        { id: 2, name: 'Pedro' },
        { id: 3, name: 'Carlos' }
    ]);
});
app.listen(3000);
