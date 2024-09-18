import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bagActions } from "../../store/bagSlice";
import { Snackbar, Alert } from "@mui/material";
import Swal from "sweetalert2";
import MetaTags from "../../MetaTags";

export const GetProductBYProductType = () => {
  const [subCategories, setSubCategories] = useState([]);
  const { productType } = useParams();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const dispatch = useDispatch();
  const URI = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchSubCategories();
  }, [productType]);

  const fetchSubCategories = async () => {
    try {
      const encodedProductType = encodeURIComponent(productType);
      const resp = await axios.post(`${URI}api/admin/getProductByProductType`, {
        productType: encodedProductType
      });

      if (resp.data) {
        setSubCategories(resp.data);
      } else {
        setSubCategories([]);
        setSnackbarMessage("No products found for the given product type.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error fetching products", error);
      setSnackbarMessage("Error fetching products");
      setOpenSnackbar(true);
    }
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please log in to add products to the cart.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const response = await axios.post(`${URI}api/user/addToCart`, {
        userId,
        productId: product._id,
        productName: product.title,
        quantity: 1,
        price: product.price,
        attributes: {
          size: product.size,
          color: product.color,
        },
        discount: product.discount,
        Image: product.thumbnail,
      });

      dispatch(
        bagActions.addToBag({
          data: { ...product, quantity: 1 },
          totalQuantity: 1,
        })
      );

      setSnackbarMessage("Product added to cart!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error adding item to cart", error);
      setSnackbarMessage("Error adding item to cart");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="container mx-auto p-4 my-10">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {subCategories.length > 0 ? (
          subCategories.map((product) => (
            <div
              key={product._id}
              className="flex-shrink-0 w-full items-center justify-center content-center"
            >
              <MetaTags
                title={product.title}
                description={product.description}
              />
              <div className="border-2 border-gray-300 bg-gray-50 shadow-lg overflow-hidden hover:border-red-500 transition-transform duration-300 transform hover:scale-105">
                <div className="overflow-hidden" onClick={() => navigate(`/product/${product._id}`)}>
                  <img
                    src={`${URI}${product.thumbnail}`}
                    alt={product.title}
                    className="w-full object-cover h-80 cursor-pointer"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-base mb-2 w-[90%]">
                      {product.title}
                    </p>
                    <CiHeart className="hover:text-red-500 text-2xl cursor-pointer" />
                  </div>
                  <p className="mb-4">₹ {product.price.toFixed(2)}</p>
                  <button
                    className="border-2 hover:border-none text-black py-2 px-4 hover:bg-red-500 w-full hover:text-white transition duration-300 flex justify-center items-center gap-5"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click event from triggering the parent div
                      handleAddToCart(product);
                    }}
                  >
                    <IoCartOutline className="text-xl" />
                    <p>Add to Cart</p>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available for this type.</p>
        )}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes("Error") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
