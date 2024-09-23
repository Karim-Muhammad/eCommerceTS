import ProductSchema from "./schema";

ProductSchema.methods.updateAverageRatings = async function () {
  const ratings = this.ratings;
  const ratingsCount = ratings.length;
  let totalStars = 0;

  ratings.forEach((rating) => {
    totalStars += rating.stars;
  });

  this.averageRatings = totalStars / ratingsCount;
};
