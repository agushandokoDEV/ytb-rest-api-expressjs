const express = require('express');
const cors 	= require('cors');
const bodyParser = require('body-parser');
const { errorResponse } = require('./utils/jsonResponse');
const passport = require('passport');
// const apiRoutes = require('./routes/api');
const pe = require('parse-error');
const app = express();

app.use(express.static('public'));

// Middleware
app.use(express.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Controll-Allow-Methods','GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    //console.log( "before........................." );
    next();
});

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// app.use(passport.initialize());
// require('./middleware/passport')[passport]
// Rute API
// app.use('/api', apiRoutes);
// app.use('/',require('./routes/welcome'));
app.use('/api/v1',require('./routes/v1'));
/**
 * Error handling
 */
app.use(function(req, res, next) {
    errorResponse(res,'Page not found',404);
    // res.send({
    //     success : false,
    //     error : {
    //         code : '404',
    //         message : 'Not found'
    //     }
    // });
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server berjalan di http://localhost:${PORT}`);
// });

module.exports = app;

process.on('uncaughtException', function(e) {
    var data = pe(e);
    console.error('Errors : ',data);
    // data =>
    //  filename: filename
    //  line: error line
    //  row: error row
    //  message: error message
    //  type: error type
    //  stack: error stack
});