import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bagActions } from "../../../store/bagSlice";
import { Snackbar, Alert } from "@mui/material";
import { IoCartOutline } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";

// Helper function to check if the array is not empty and contains valid data
const isValidArray = (arr) =>
  Array.isArray(arr) && arr.some((item) => item.trim() !== "");

const ProductInfo = ({ product }) => {
  // Handle undefined product
  if (!product) {
    return <p>Product not found</p>;
  }

  // Directly use the color array (no need to parse it)
  const colors = product.color || [];
  const sizes = product.size || [];

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    product.size?.length > 0 ? product.size[0] : ""
  );
  const [selectedColor, setSelectedColor] = useState(
    colors.length > 0 ? colors[0] : ""
  );
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const selectImage = localStorage.getItem("selectedImage");

  const URI = import.meta.env.VITE_API_URL;

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to add products to the cart.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      await axios.post(`${URI}api/user/`, {
        userId,
        productId: product._id,
        productName: product.title,
        quantity,
        price: product.price,
        attributes: {
          size: selectedSize,
          color: selectedColor,
        },
        discount: product.discount,
        Image: selectImage,
      });

      dispatch(
        bagActions.addToBag({
          data: {
            ...product,
            quantity,
            size: selectedSize,
            color: selectedColor,
          },
          totalQuantity: quantity,
        })
      );

      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error adding item to cart", error);
      setOpenSnackbar({
        open: true,
        message: "Error adding item to cart",
        severity: "error",
      });
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const discountedPrice =
    product?.discount > 0
      ? product?.price - (product?.price * product?.discount) / 100
      : product?.price;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product?.title}</h1>

      {/* Price Section */}
      <div className="flex items-center my-4">
        <p className="text-2xl font-semibold text-gray-800">
          ₹ {discountedPrice?.toFixed(2)}
        </p>
        {product?.discount > 0 && (
          <p className="text-xl font-light text-gray-500 line-through ml-4">
            ₹ {product?.price?.toFixed(2)}
          </p>
        )}
        {product?.discount > 0 && (
          <p className="ml-2 text-red-500 font-semibold text-lg">
            ({product?.discount}% OFF)
          </p>
        )}
      </div>
      <div className="flex ">
        <p className="text-red-600  text-sm">
          {product.subcategory} <span className="text-gray-600">|</span> {product.typeOfProduct} <span className="text-gray-600">|</span> {product.category}
        </p>
      </div>


      {/* Size and Color Section */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 my-4">
        {/* Size Selection */}
        {product?.size?.filter((size) => size.trim().length > 0).length > 0 && (
          <div className="space-x-2">
            <label className="font-semibold">Size:</label>
            {product.size
              .filter((size) => size.trim().length > 0) // Filter out empty size values
              .map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border ${size === selectedSize ? "border-red-600" : "border-gray-300"
                    } rounded ${size === selectedSize ? "text-red-600" : "text-gray-700"
                    }`}
                >
                  {size}
                </button>
              ))}
          </div>
        )}

        {/* Color Selection */}
        {colors.filter((color) => color.trim().length > 0).length > 0 && (
          <div className="space-x-2">
            <label className="font-semibold">Color:</label>
            {colors
              .filter((color) => color.trim().length > 0) // Filter out empty color values
              .map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }} // Set background color dynamically
                  className={`px-3 py-1 border ${color === selectedColor
                      ? "border-red-600"
                      : "border-gray-300"
                    } rounded text-white`} // Add text color and border for selected color
                >
                  {color}
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Quantity Section */}
      <div className="flex items-center">
        <label className="font-semibold mr-2">Quantity:</label>
        <div className="flex items-center">
          <button
            onClick={handleDecreaseQuantity}
            className="px-2 py-1 bg-gray-200 border border-gray-300 rounded"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            min={1}
            className="w-16 border border-gray-300 rounded px-2 py-1 text-center mx-2"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button
            onClick={handleIncreaseQuantity}
            className="px-2 py-1 bg-gray-200 border border-gray-300 rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full mt-4">
        <button
          className="border-2 border-black py-2 px-4 text-black hover:border-none hover:bg-red-500 hover:text-white transition duration-300 flex justify-center items-center gap-2 w-full"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product);
          }}
        >
          <IoCartOutline className="text-xl" />
          <p>Add to Cart</p>
        </button>
        <button className="bg-red-600 text-white px-6 py-2 rounded w-full">
          Buy Now
        </button>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductInfo;
