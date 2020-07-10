import express = require('express');
import config = require('config');
import path = require('path');

const PORT = config.get('general.port') || 5000;
const app = express();

app.use('/tasks', require('./routes/tasks.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});