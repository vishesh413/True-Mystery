import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{ // ye sirf ek type security de rha h aur kuch nhi jb bhi khi ye schema use to same yahi struture use ho 
    content: string; 
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content :{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }

})


export interface User extends Document{ // ye sirf ek type security de rha h aur kuch nhi jb bhi khi ye schema use to same yahi struture use ho 
    username: string; 
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username :{
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        match:[/.+\@.+\..+/, 'please use a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],

    },
    verifyCode: {
        type: String,
        required: [true, 'Verify code is required'],

    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verify code expiry is required'],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})
// next js edge pr chlta hai mtlb isko baar baar run krna pdta hai pr server m ek baar chlta h to phir chlta hi rehta hai 

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)// <.> ye userschema batata mainly type batata hai konsa data aayrga 

export default UserModel