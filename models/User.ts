import { model, Schema, models } from "mongoose";

const UserSchema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    verified: { type: Boolean, default: false },
});

export const User = models.User || model("User", UserSchema);
