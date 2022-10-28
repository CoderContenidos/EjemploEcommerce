import config from "./config.js";
import passport from 'passport';
import local from 'passport-local';
import jwt  from 'passport-jwt';
import { cartService, userService } from "../services/services.js";
import { cookieExtractor,createHash,isValidPassword } from "../utils.js";
const LocalStrategy = local.Strategy;
const JWTStrategy =  jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const initializePassport = () =>{
    passport.use('register',new LocalStrategy({passReqToCallback:true,usernameField:'email',session:false},async(req,username,password,done)=>{
        let {first_name,last_name,email,phone} = req.body;
        try{
            if(!req.file) return done(null,false,{messages:"Couldn't get picture for user"})
            let user  = await userService.getBy({email:email})
            if(user) return done(null,false,{messages:"User Already exists"});
            let cart = await cartService.save({products:[]})
            const newUser ={
                first_name,
                last_name,
                email,
                phone,
                password:createHash(password),
                role:"user",
                cart: cart._id,
                profile_picture:req.file.location
            }
            let result = await userService.save(newUser);
            return done(null,result);
        }catch(err){
            console.log(err);
            return done(err);
        }
    }))
    passport.use('login',new LocalStrategy({usernameField:'email'},async(username,password,done)=>{
        try{
            if(username===config.session.SUPERADMIN&&password===config.session.SUPERADMIN_PASSWORD)
            return done(null,{id:0,role:"superadmin"})
            const user = await userService.getBy({email:username})
            if(!user) return done(null,false,{messages:"No user found"});
            if(!isValidPassword(user,password)) return done(null,false,{messages:"Incorrect password"});
            return done(null,user);
        }catch(err){
            return done(err);
        }
    }))
    passport.use('jwt',new JWTStrategy({jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),secretOrKey:config.jwt.secret},async(jwt_payload,done)=>{
        try{
            if(jwt_payload.role==="superadmin") return done(null,jwt_payload)
            let user = await userService.getBy({_id:jwt_payload.id})
            if(!user) return done(null,false,{messages:"User not found"})
            return done(null,user);
        }catch(err){
            return done(err)
        }
    }))
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async (id,done)=>{
        let result =  await userService.getBy({_id:id})
        done(null,result);
    })
}
export default initializePassport