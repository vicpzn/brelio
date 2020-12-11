const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => console.log("Connected to MongoDB"));

mongoose.connection.on("error", () =>
  console.log("Error while connecting to MongoDB")
);
