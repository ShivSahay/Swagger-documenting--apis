const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerJsDocs = YAML.load("./api.yaml");
const fileUpload = require("express-fileupload");
const app = express();

app.use(fileUpload());
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.get("/string", (req, res) => {
  res.status(400).send("This is a String");
});
app.get("/user", (req, res) => {
  const obj = { id: 1, name: "Shiv Pandey" };
  res.status(200).send(obj);
});

let users = [
  { id: 1, name: "Shiv Pandey" },
  { id: 2, name: "Amit Singh" },
  { id: 3, name: "Udisha Tiwari" },
  { id: 4, name: "Astha Pandey" },
];
app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:id", (req, res) => {
  const obj = users.find((x) => x.id === parseInt(req.params.id));
  res.status(200).send(obj);
});

app.post("/create", (req, res) => {
  users = [...users, req.body];
  res.status(200).send(users);
});

app.get("/usersQuery", (req, res) => {
  console.log("Users query data here", req.query.id);
  const obj = users.find((x) => x.id === parseInt(req.query.id));
  res.status(200).send(obj);
});

app.post("/upload", (req, res) => {
  const file = req.files.file;
  console.log(req.headers);
  let path = __dirname + "/upload/" + "file" + Date.now() + ".jpg";
  file.mv(path, (err) => {
    res.send("Ok file uploaded successfully");
  });
});

app.listen(4000, () => {
  console.log("app is running 4000 port !");
});
