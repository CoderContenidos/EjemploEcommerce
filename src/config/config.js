import dotenv from 'dotenv';
dotenv.config();
export default {
    mongo:{
        url:process.env.MONGO_URL
    },
    aws:{
        access_key:process.env.AWS_ACCESS_KEY,
        secret:process.env.AWS_SECRET
    },
    jwt:{
        cookie_name:process.env.JWT_COOKIE_NAME,
        secret:process.env.JWT_SECRET
    },
    session:{
        SUPERADMIN:process.env.SUPERADMIN,
        SUPERADMIN_PASSWORD:process.env.SUPERADMIN_PASSWORD
    }
}