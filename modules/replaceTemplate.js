// 3rd party module
const slugify = require("slugify");

module.exports = (temp, product) => {
  // we used regular expression to replace all that occurs
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  // output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(
    /{%ID%}/g,
    slugify(product.productName, { lower: true })
  );

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};
