import mongoose, {Document, Schema} from "mongoose";
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    profileImageUrl?: string;
    comparePassword(candidatePassword:string): Promise<boolean>
}
;
const UserSchema: Schema<IUser> = new Schema(
    {
        fullName : {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        profileImageUrl: {type: String, default: null}
    },
    { timestamps: true}
)
UserSchema.pre<IUser>("save", async function (next) {
    if(!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err as Error)
    }
})

//compare password 
UserSchema.methods.comparePassword = async function (
    candidatePassword:string
): Promise<boolean> {
    const user = this as IUser;
    return await bcrypt.compare(candidatePassword, user.password)
}

export default mongoose.model<IUser>("User", UserSchema);