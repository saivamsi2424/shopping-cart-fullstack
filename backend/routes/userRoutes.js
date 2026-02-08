const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Username and password required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      token: null,
    });

    await user.save();
    res.send("User created");
  } catch (err) {
    console.error("USER CREATE ERROR:", err);
    res.status(500).send("Internal server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.error("GET USERS ERROR:", err);
    res.status(500).send("Internal server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Username and password required");
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send("Invalid username/password");
    }

    if (user.token) {
      return res.status(403).send("You cannot login on another device.");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).send("Invalid username/password");
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    user.token = token;
    await user.save();

    res.send({ token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).send("Internal server error");
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.send("Logged out successfully");
  } catch (err) {
    console.error("LOGOUT ERROR:", err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
