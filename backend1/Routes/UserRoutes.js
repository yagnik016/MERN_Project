import express from "express";
import { body, validationResult } from "express-validator";
import User from "../Models/UserModel.js";

const router = express.Router();

// Get all users
router.get("/getusers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get a user by ID
router.get("/getusers/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create a new user
router.post(
  "/createuser",
  [
    // Validate request body using express-validator
    body("email").isEmail().withMessage("Invalid email format"),
    body("phoneNumber")
      .isNumeric()
      .withMessage("Phone number must be numeric")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be 10 digits"),
    body("name").not().isEmpty().withMessage("Name is required"),
    body("address").not().isEmpty().withMessage("Address is required"),
    body("dateOfBirth").not().isEmpty().withMessage("Date of Birth is required"),
    body("gender").not().isEmpty().withMessage("Gender is required"),
    body("nationality").not().isEmpty().withMessage("Nationality is required"),
    body("occupation").not().isEmpty().withMessage("Occupation is required"),
    body("interests").not().isEmpty().withMessage("Interests are required"),
  ],

  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract necessary fields from request body
      const {
        name,
        email,
        address,
        phoneNumber,
        dateOfBirth,
        gender,
        nationality,
        occupation,
        interests,
        profilePicture,
        additionalNotes,
      } = req.body;

      // Create a new user with the extracted fields
      const newUser = await User.create({
        name,
        email,
        address,
        phoneNumber,
        dateOfBirth,
        gender,
        nationality,
        occupation,
        interests,
        profilePicture,
        additionalNotes,
      });

      res.status(201).json({ success: true, user: newUser });
    } catch (err) {
      // Handle unique constraint violation error for email
      if (err.code === 11000 && err.keyValue.email) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already exists", param: "email" }] });
      }

      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Update a user
router.put(
  "/updateuser/:id",
  [
    // Validate request body using express-validator
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("phoneNumber")
      .optional()
      .isNumeric()
      .withMessage("Phone number must be numeric")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be 10 digits"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract necessary fields from request body
      const {
        name,
        email,
        address,
        phoneNumber,
        dateOfBirth,
        gender,
        nationality,
        occupation,
        interests,
        profilePicture,
        additionalNotes,
      } = req.body;

      // Find the user by ID and update the fields
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          name,
          email,
          address,
          phoneNumber,
          dateOfBirth,
          gender,
          nationality,
          occupation,
          interests,
          profilePicture,
          additionalNotes,
        },
        { new: true }
      );

      // Check if the user was found and updated
      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.status(200).json({ success: true, user: updatedUser });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Delete a user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ success: true, msg: "User removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
