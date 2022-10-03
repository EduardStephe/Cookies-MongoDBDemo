/** Eduard Manuel 3098993
 * Assignment 3
 * ACS 3909: Adv Internet Programming */

const { cookieSecret } = require('./credentials');

var express = require('express'),
    handlebars = require('express-handlebars').create({defaultLayout: 'main'}),
    credentials = require('./credentials'),
    cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser(credentials.cookieSecret));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

// Assign cookie at path '/' and render home.
app.get('/', function(req, res){
    res.cookie('MySignedCookie', '3098993SignedCookie', {signed: true, maxAge: 1204800400})
    res.render('home');
});

// Request cookie from the same path and display back in site.
app.get('/cookieShow', function(req, res){
    var context = {cookie: req.signedCookies.MySignedCookie};
    res.render('show', context);
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});