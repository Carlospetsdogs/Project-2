const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
var bcrypt= require ('bcrypt');
var cookieParser = require('cookie-parser');
var user = require('./models/userLogin');
const routes = require('./controllers');
var sequelize = require('./config/connection');
const morgan = require('morgan');



// const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json())
//set morgan to log info about our requests for dev use
app.use(morgan('dev'));
//allow access to cookies stored in browser
app.use(cookieParser());

app.use(session({
  key: 'user_sid',
  secret:'something',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
  }));

app.use ((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

var hbsContent = {email:'', loggedin: false,title:"you are not logged in"};

var sessionChecker =(req,res,next)=> {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/dashboard');
  } else {
    next();
  }
}

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ }); //removed "helpers" for now, add back if needed

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

