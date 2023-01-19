const path = require("path");
const express = require("express"); // npm installed

const app = express();

app.use(express.static(path.join(__dirname, "../public/dist")));
// other configuration...

app.listen(3000);