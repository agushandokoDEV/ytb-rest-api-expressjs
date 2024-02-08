const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const {User} = require('../app/models');

const opts = {
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.JWT_KEY,
}

passport.use(new JWTStrategy(opts,async(payload,done)=>{

    // handler
    try {
        let auth = await User.findOne({
            where:{
                id:payload.auth.id
            }
        });
        if(!auth){
            return done(null, false);
        }

        if(auth.status !='active'){
            return done(null, false);
        }

        return done(null,payload)
    } catch (error) {
        return done(error,false);
    }
}));


module.exports=passport