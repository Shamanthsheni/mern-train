import Admin from "../model/admin.js";

// ================= Register =================
const registerAdmin = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({ username, email, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= Login =================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { registerAdmin, loginAdmin };