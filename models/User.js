import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);

export default User;
