const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the Address schema
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  addressType: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number,
  },
});

// Define the Cart Item schema
const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  thumbnail: {
    type: String,
    required: true,
  },
  attributes: {
    size: { type: [String] },  // Change to array of strings
    color: { type: [String] }, // Change to array of strings
  },
});

// Define the User schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String },
  customUserId: { type: String },
  isVerified: { type: Boolean, default: false },
  mobileNumber: { type: String },
  name: { type: String },
  lastName: { type: String },
  phone: { type: String },
  location: { type: String },
  addresses: [addressSchema],
  cart: [cartItemSchema],
  wallet: { type: Number, default: 0 },
  security: { type: Boolean, default: true },
  otp: { type: String }, // Field for OTP
  otpExpires: { type: Date }, // Field for OTP expiry
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
