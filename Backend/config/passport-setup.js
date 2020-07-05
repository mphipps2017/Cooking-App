const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

// Use http://www.passportjs.org/docs/google/ for setting up

passport.use(new GoogleStrategy({
    // options for the strategy
}), ()=>{
    // Passport callback func
});