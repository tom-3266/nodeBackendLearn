module.exports = (temp, product) => {
  let output = temp.replace(/${%PRODUCTNAME%}/g, product.productName);
  output.replace(/{%IMAGE%}/g, product.image);
  output.replace(/{%QUANTITY%}/g, product.quantity);
  output.replace(/{%PRICE%}/g, product.price);
  output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output.replace(/{%DESCRIPTION%}/g, product.description);
  output.replace(/{%PLACE%}/g, product.from);
  output.replace(/{%PLACE%}/g, product.from);
  output.replace(/{%ID%}/g, product.id);
  if (!product.organic) output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};
