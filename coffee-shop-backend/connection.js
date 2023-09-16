require("dotenv").config();

// Connect to mongoose
const mongoose = require("mongoose");

const connectionStr = `mongodb+srv://ecommerce-coffee-shop:${process.env.MONGO_PW}@cluster0.ohwzgnf.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(connectionStr, { useNewUrlparser: true })
  .then(() => console.log("Connected to mongoose"))
  .catch((err) => console.log(err));

//Password: ivVjjPBEPoyjE0LA
//ecommerce-coffee-shop

mongoose.connection.on("error", (err) => {
  console.log(err);
});
