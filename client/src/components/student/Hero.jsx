import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const carouselItems = [
    {
      img: assets.struggle,
      label: "DOUBTS",
      route: "/doubt",
    },
    {
      img: assets.test,
      label: "QUIZ",
      route: "/quiz",
    },
    {
      img: assets.asian,
      label: "NOTES",
      route: "/notes",
    },
    {
      img: assets.teach,
      label: "VIDEOS",
      route: "/course-list",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-4 md:px-0 space-y-10 text-center 
    bg-gradient-to-r from-green-500 via-blue-500 to-purple-600">
      {/* 🚀 Swiper Carousel */}
      <div className="w-full max-w-6xl">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          grabCursor={true}
          loop={true}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="pb-10"
        >
          {carouselItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => navigate(item.route)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transform hover:scale-105 transition duration-300"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition" />
                <h3 className="absolute bottom-4 left-4 bg-white text-purple-700 font-bold px-4 py-1 rounded-full text-sm shadow">
                  {item.label}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✨ Hero Heading */}
      <h1 className="md:text-4xl text-2xl font-bold text-white max-w-3xl mx-auto relative z-20">
        Learn smarter with tutors who fit your goals, learning pace, and unique
        style —{" "}
        <span className="text-orange-300">
          because education should be personal.
        </span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </h1>

      {/* 🧠 Hero Subtext */}
      <p className="text-white/80 md:text-base text-sm max-w-xl mx-auto px-4">
        TutorSync connects you with the right learning resources and expert
        tutors. Personalized education, tailored to your needs.
      </p>

      {/* 🔎 Search Bar */}
      <SearchBar />
    </div>
  );
};

export default Hero;
