const express = require("express");
const fs = require("fs");
const messages = require("./messages.json");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/", ({ body }, res) => {
  console.log(body);
  if (!body?.msg || !body?.name) return;
  messages.push(body);
  fs.writeFileSync("./messages.json", JSON.stringify(messages));
  res.send(`Your message was received ${body.name}!`);
});

app.get("/messages", (req, res) => res.json(messages));

app.listen(process.env.PORT || 3000, () => console.log("server is running"));
