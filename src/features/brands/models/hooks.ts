import slugify from "slugify";
import BrandSchema from "./schema";
import BrandModel from ".";

BrandSchema.pre("validate", function (next) {
  console.log("pre save hook");

  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }

  next();
});

// or use path().validate()
BrandSchema.pre("findOneAndUpdate", function (next) {
  console.log("pre update hook");

  const update = this.getUpdate();

  if (update && update["$set"] && update["$set"]["name"]) {
    update["$set"]["slug"] = slugify(update["$set"]["name"], {
      lower: true,
    });
  }

  next();
});

BrandSchema.path("name").validate({
  validator: async function (value) {
    const isNameExists = await BrandModel.countDocuments({
      name: { $eq: value },
    });

    if (isNameExists) return false;

    return true;
  },
  message: "Brand name already exists!",
});
