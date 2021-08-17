const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
const apiConfig = require("./server/config/api.config");

const path = require('path')

const app = express();

// var corsOptions = {
//   origin: "*"
// };

exports.start = async config => {
  try {
    app.use(cors());
    app.use(morgan("dev"))
    // parse requests of content-type - application/json
    
    app.use(bodyParser.json({limit: '500mb'}));
    app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

    // parse requests of content-type - application/x-www-form-urlencoded
    // app.use(bodyParser.urlencoded({
    //   extended: true
    // }));

    const db = require("./models/index");

    db.sequelize.sync();
   
    app.get("/", (req, res) => {
      res.json({
        message: "Welcome to bezkoder application."
      });
    });

    console.log(chalk.yellow("API: Loading Routes and Controllers"));
    for (let i = 0, routePath; i < config.routes.length; i++) {
      routePath = config.routes[i];
      require(path.resolve(routePath))(app);
    }

    const PORT = process.env.PORT || apiConfig.PORT;
    app.listen(PORT, () => {
      console.log(chalk.green("API: Server Running on port:", PORT));
    });
  } catch (e) {
    console.error(e);
    process.exit();
  }
}