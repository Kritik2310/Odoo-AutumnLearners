const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require("./routes/authRoute");
const profileRoutes = require("./routes/profileRoute");
const adminRoutes = require("./routes/adminRoute");
const swapRoutes = require("./routes/swapRoute");
//const userRoutes = require("./routes/user");
//const swapRoutes = require("./routes/swap");

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => res.send("Skill Swap Backend.."));

/*mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Can't connect", err));*/

app.use("/api/auth", authRoutes);
app.use("/api/users", profileRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/request", swapRoutes);
//app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
