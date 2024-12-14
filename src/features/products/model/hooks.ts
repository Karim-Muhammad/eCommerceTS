import slugify from "slugify";
import ProductSchema from "./schema";
import ProductModel from ".";
import config from "../../../../config";

ProductSchema.post("init", function () {
  this.images = this.images.map(function (img) {
    return `${config.cloudinary.resource_link}/${img}`;
  });
});

ProductSchema.pre("validate", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }

  // if (this.isModified("images")) {
  //   Storage.removeImagesFromStorage(this.images);
  // }

  next();
});

ProductSchema.pre("findOneAndUpdate", function (next) {
  console.log("pre update hook");

  const update = this.getUpdate();

  if (update && update["$set"] && update["$set"]["name"]) {
    update["$set"]["slug"] = slugify(update["$set"]["name"], {
      lower: true,
    });
  }

  next();
});

ProductSchema.path("name").validate({
  validator: async function (value: string) {
    const nameCount = await ProductModel.countDocuments({
      name: value,
    });
    return !nameCount;
  },
  message: "Product name already exists",
});
