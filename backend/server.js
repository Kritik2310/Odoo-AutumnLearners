const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send("Skill Swap Backend.."));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Can't connect", err));


app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`)
);
