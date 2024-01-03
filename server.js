const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Sergiy:6nelHYDI8gVV49t8@cluster0.8xk5pni.mongodb.net/db-contacts";
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
