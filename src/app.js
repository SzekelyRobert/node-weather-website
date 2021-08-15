const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public/index.html"));

const app = express();
const port = process.env.PORT || 3000;

//Utvonalak geci
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Buzi Andrew",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About U",
    name: "Buziiii Andrew",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Amerikai selyemfiu, aki ..... BUZI",
    title: "Help",
    name: "Buzi Andrew",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No, fuck you, we nedd da address",
    });
  }
  geocode(
    req.query.address,
    (error, { lattitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(lattitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          location,
          forecastData,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   location: "Zabola",
  //   forecast: "Fucking bad",
  //   address: req.query.address,
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide search term",
    });
  }

  res.send({
    product: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Not Found",
    name: "Buzi Andrew",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Not found",
    name: "Buzi Andrew",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up, fuck u now");
});
