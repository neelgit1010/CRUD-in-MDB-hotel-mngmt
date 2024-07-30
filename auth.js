const Person = require("./models/Person");
// using for authentication
const passport = require('passport')
// using the username-password local strategy
const localStrategy = require('passport-local').Strategy;

// implementing the usename-password local strategy
passport.use(new localStrategy(async (USERNAME, PASSWORD, done) => {
    // authentication logic here
    try {
      const user = await Person.findOne({username : USERNAME});
      if(!user) return done(null, false, {msg : "Invalid username"})
      
      const isPassMatched = user.password === PASSWORD ? true : false;
      if(isPassMatched) return done(null, user);
      return done(null, false, {msg : "Invalid password"})
  
    } catch (error) {
      return done(error);
    }
  }))
  
module.exports = passport; 