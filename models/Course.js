import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const courseSchema = new Schema({
  name: {
    type: String,
    unique: true,
    requird: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
});

courseSchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
