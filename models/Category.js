import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    requird: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

categorySchema.pre("validate", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
