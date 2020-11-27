var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressJwt = require('express-jwt')
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var areaRouter = require('./routes/area');
var foodTypesRouter = require('./routes/foodType');
var planTasksRouter = require('./routes/planTasks');
var organizationsRouter = require('./routes/organizations');
var companysRouter = require('./routes/companys');
var regulationPlansRouter = require('./routes/regulationPlans');
var menusRouter = require('./routes/menu');
var codeRouter = require('./routes/code');
var rolesRouter = require('./routes/roles');
var uploadRouter = require('./routes/upload');
var viewFileRouter = require("./routes/viewFile")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/* 
    @description  jwt验证登录
    @autor        cheng liang
    @create       2020-11-16 15:05"
    @params       
    @return       
*/
app.use(expressJwt({
    secret: "token",
    algorithms: ['HS256']
}).unless({
    path: ["/api/login", "/api/getcode", /^\/uploads\/.*/]
})
)
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(200).send({
            code: 401,
            msg: "登录已过期",
            data: null
        })
    }
})
/* 
    @description  session
    @autor        cheng liang
    @create       2020-11-16 15:18"
    @params       
    @return       
*/
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { maxAge: 3600000 } }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/areas', areaRouter);
app.use('/api/foodTypes', foodTypesRouter);
app.use('/api/planTasks', planTasksRouter);
app.use('/api/plan', organizationsRouter);
app.use('/api/plan', companysRouter);
app.use('/api/regulationPlans', regulationPlansRouter);
app.use('/api/menu', menusRouter);
app.use('/api/getcode', codeRouter);
app.use('/api/role', rolesRouter);
app.use('/api/upload', uploadRouter);
app.use('/uploads', viewFileRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
