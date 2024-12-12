const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const User = require("./user"); 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


app.post("/api/hosting", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.get("/api/hosting", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
app.get('/api/hosting/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).send('User not found');
      res.json(user);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });
  
  app.put('/api/hosting/:id', async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true } // Return updated doc & validate data
      );
      if (!updatedUser) return res.status(404).json({ error: "User not found" });
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
 
  app.delete('/api/hosting/:id', async (req, res) => {
    try {
      const { id } = req.params;
      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
  
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
app.get("/", (req, res) => {
  res.send("API is running...");
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});