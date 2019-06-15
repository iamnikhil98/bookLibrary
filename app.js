if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
} 

const express  = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser : true});
const db = mongoose.connection
db.on('error',error => console.log(error))
db.once('open',()=> console.log('connected to mongoose'));




app.use('/',indexRouter);
app.use('/authors',authorRouter);




app.listen(port, function(){
    console.log('Server is Started on port 5000');
});