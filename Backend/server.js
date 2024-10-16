const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./user/routes/userRoutes");
const adminRoutes = require("./admin/routes/adminRoutes");
const bannerRoutes = require("./admin/routes/bannerRoutes");
const productRoutes = require("./admin/routes/productRoutes");
const featuredImgRoutes = require("./admin/routes/featureRoutes");
const BlogRoutes = require("./blogs/blogsRoutes");
const PerspectiveRoutes = require("./Perspective/PerspectiveRoutes");

const navbarIconsRoutes = require("./admin/routes/navIconsRoutes");

const addressRoutes = require("./user/routes/addressRoutes");

const productOrderRoutes = require("./user/routes/productOrderRoutes");

// QuickLink Footer
const quickLinkRoutes = require("./QuickLink/routes/giftCardRoutes");

const categoryRoutes = require('./admin/routes/category.routes');

 const navbarRoutes = require('./admin/routes/navbarRoute');

const path = require("path");

connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

//user register
app.use("/api/user", userRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/productOrder",productOrderRoutes)
//admin register
app.use("/api/admin", adminRoutes);

//banner routes

app.use("/api/admin", bannerRoutes);
app.use("/api/admin", productRoutes);
app.use("/api/admin", featuredImgRoutes);

app.use("/api/admin", BlogRoutes);

app.use("/api/navbarIcons", navbarIconsRoutes);

app.use("/api/perspective", PerspectiveRoutes);

app.use("/api/quickLink", quickLinkRoutes);

app.use('/api/categories', categoryRoutes);

 app.use('/api/navbar', navbarRoutes);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
