const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const db = require("./models");
const { deserializeUser } = require("./middleware/deserialize.user");
const cookieParser = require("cookie-parser");
let tls;
try {
  tls = require("node:tls");
} catch (err) {
  console.error("tls support is disabled!");
}

db.sequelize
  .sync()
  .then(() => {
    console.log("Sync db");
  })
  .catch((err) => {
    console.log("Failed to sync db: ", err.message);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));
const corsOptions = {
  AccessControlAllowOrigin: "*",
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

require("./routes/auth.routes.js")(app);
require("./routes/user.routes.js")(app);
require("./routes/customer.routes.js")(app);
require("./routes/activity.routes.js")(app);
require("./routes/location.routes.js")(app);
require("./routes/vacation.routes.js")(app);
require("./routes/image.routes.js")(app);

app.listen(8000, () => {
  console.log("server listing on url", "localhost 8000");
});
