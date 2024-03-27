const fs = require('fs');
const https = require('https');
const express = require("express");
const connectDB = require("./db");
const app = express();
const cookieParser = require("cookie-parser");

const PORT = 5000;


app.set("view engine", "ejs");

connectDB();

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/route"));

app.get("/", (req, res) => res.render("home"));
app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => res.render("login"));
app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.redirect("/");
});


// const server = https.createServer( app)
//   .listen(PORT, () => {
//       console.log('server running at ' + PORT)
//   })

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});