// Core modules
const http = require("http");
const fs = require("fs");
const url = require("url");
// My own module
const replaceTemplate = require("./modules/replaceTemplate");
// 3rd party module
const slugify = require("slugify");

// Saved data that not needed to be loaded on each request
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // true to parse the 'query' as an onject
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((item) => replaceTemplate(tempCard, item))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);

    // Product page
  } else if (pathname === "/products") {
    res.writeHead(200, { "Content-type": "text/html" });
    // const product = dataObj[query.id];
    const product = dataObj.find(
      (item) => query.id === slugify(item.productName, { lower: true })
    );
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(data);

    // 404 page
  } else {
    res.writeHead(404, {
      // sending header here
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h2>Page not found!!</h2>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is up and running on port 8000");
});
