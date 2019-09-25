const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

/**
 *  -- Database setaup --
 * Essa conexão esta sendo passada para qualquer model que import
 * o mongoose nesse aplicação
 */
mongoose.connect(
    'mongodb://localhost/upload', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(require('./routes'));

app.listen(3000, () => console.log('Server OK'));
