const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cookieParser());

const sessionStore = new SequelizeStore({ db: sequelize });

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'superSecretSecret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { maxAge: 600000 } // Adjust cookie options as needed
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
});

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

app.get('/main', (req, res) => {
  res.redirect('/');
});
app.get('/main', (req, res) => {
  res.render('main'); // Assuming you have a main.handlebars or main.hbs template
});


const hbs = exphbs.create({
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: true}).then(() => {
  app.listen(PORT, () => console.log('Now listening on port', PORT));
});







