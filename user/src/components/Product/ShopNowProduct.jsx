import React, { useEffect, useState }  from 'react'
import { FaArrowRight } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const products = [
    { id: 1, image: "https://cdn.pixabay.com/photo/2019/03/04/20/15/model-4035094_960_720.jpg", title: "Navy Blue Crepe Kashmiri Hand Embroidery Saree", price: "₹ 99.99" },
    { id: 2, image: "https://images.pexels.com/photos/730055/pexels-photo-730055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "Navy Blue Crepe Kashmiri Hand Embroidery Saree", price: "₹ 99.99" },
    { id: 3, image: "https://images.pexels.com/photos/2270078/pexels-photo-2270078.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Navy Blue Crepe Kashmiri Hand Embroidery Saree", price: "₹ 99.99" },
    { id: 4, image: "https://images.pexels.com/photos/9418783/pexels-photo-9418783.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Navy Blue Crepe Kashmiri Hand Embroidery Saree", price: "₹ 99.99" },
    { id: 5, image: "https://images.pexels.com/photos/9419149/pexels-photo-9419149.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Navy Blue Crepe Kashmiri Hand Embroidery Saree", price: "₹ 99.99" },
    { id: 6, image: "https://images.pexels.com/photos/14819933/pexels-photo-14819933.jpeg?auto=compress&cs=tinysrgb&w=600", title: "Navy Blue Crepe Kashmiri Hand Embroidery Saree", price: "₹ 99.99" },
  ];

export const ShopNowProduct = () => {
    const [itemsPerSlide, setItemsPerSlide] = useState(1);

    useEffect(() => {
      const updateItemsPerSlide = () => {
        if (window.innerWidth >= 1024) {
          setItemsPerSlide(4); // lg screens
        } else if (window.innerWidth >= 768) {
          setItemsPerSlide(2); // md screens
        } else {
          setItemsPerSlide(1); // sm screens
        }
      };
  
      updateItemsPerSlide(); // Initial check
      window.addEventListener("resize", updateItemsPerSlide); // Update on resize
  
      return () => {
        window.removeEventListener("resize", updateItemsPerSlide); // Clean up
      };
    }, []);
  
    return (
      <div className="relative w-full overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={itemsPerSlide}
          navigation
          pagination={{ clickable: true }}
          className="py-4"
          speed={500} // Smooth slide transition
          breakpoints={{
            640: { slidesPerView: 1 }, // small screens
            768: { slidesPerView: 2 }, // medium screens
            1024: { slidesPerView: 4 }, // large screens
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="flex-shrink-0 w-72 mx-2 items-center justify-center content-center my-10">
                {/* Added hover effect on the whole card */}
                <div className="  bg-[#f6f4f4] shadow-[#dacdcd] shadow-lg overflow-hidden hover:border-red-500 transition-transform duration-300 transform hover:scale-105">
                  <div className="overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full object-cover h-80"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-base mb-2 w-[90%] ">
                        {product.title}
                      </p>
                    </div>
    
                    <button className="border-2 my-4 border-gray-600 hover:border-none text-black py-2 px-4 hover:bg-red-500  hover:text-white transition duration-300 flex w-[70%] justify-center items-center gap-5">
                   
                      <p>Shop Now</p>
                      <FaArrowRight className="text-xl"  />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <style jsx>{`
          .swiper-button-next,
          .swiper-button-prev {
            width: 30px; /* Increase the size of the navigation buttons */
            height: 30px;
            color: black; /* Change the button color if needed */
          }
  
          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 20px;
            font-weight: bold; /* Adjust font size and make icons bold */
          }
  
          .swiper-pagination-bullet {
            background-color: gray; /* Change the bullet color */
            opacity: 1; /* Make bullets fully visible */
          }
  
          .swiper-pagination-bullet-active {
            background-color: black; /* Color for the active bullet */
          }
        `}</style>
      </div>
    )
}
