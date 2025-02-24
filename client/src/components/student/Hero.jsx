import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  // Sample carousel images (Replace with actual images)
  const carouselImages = [
    assets.course_1_thumbnail, 
    assets.course_2_thumbnail,
    assets.course_3_thumbnail,
    assets.course_4_thumbnail,
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-orange-200 to-pink-300">
      
      {/* 🔥 Enhanced Image Carousel */}
      <div className="w-full max-w-4xl relative">
        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
          effect="coverflow"
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          coverflowEffect={{
            rotate: 10, // Adds rotation to slides
            stretch: 0,  
            depth: 100, // Controls the 3D depth
            modifier: 2, 
            slideShadows: true, // Enables shadows for a 3D effect
          }}
          breakpoints={{
            768: { slidesPerView: 2 }, // Shows 2 slides on tablets
            1024: { slidesPerView: 3 }, // Shows 3 slides on larger screens
          }}
          className="rounded-lg shadow-2xl"
        >
          {carouselImages.map((img, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-lg shadow-lg">
                {/* 🔥 Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 opacity-75 z-10"></div>
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Heading and Text */}
      <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto">
        "Learn smarter with tutors who fit your goals, learning pace, and unique style—  
        <span className="text-orange-600">because education should be personal."</span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </h1>

      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
        "TutorSync connects you with the right learning resources and expert tutors. Personalized education, tailored to your needs."
      </p>
      <p className="md:hidden text-gray-500 max-w-sm mx-auto">
        "TutorSync connects you with the right learning resources and expert tutors. Personalized education, tailored to your needs."
      </p>

      <SearchBar />
    </div>
  );
};

export default Hero;
