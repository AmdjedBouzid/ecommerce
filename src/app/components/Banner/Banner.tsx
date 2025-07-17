"use client";
import React, { useEffect, useState } from "react";
import { assets } from "../../../../public/assets/assets";
import { Modal } from "../Modals";
import { useModal } from "@/hooks/useModal";
import AuthButton from "../NavBar/AuthButton";
import {
  ArrowRight,
  ShoppingBag,
  Star,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import Link from "next/link";

const banners = [];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[600px] max-sm:h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(156,163,175,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 container mx-auto px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium animate-bounce-in">
              <Star className="w-4 h-4 fill-primary" />
              Premium Quality
            </div>

            {/* Main Heading */}
            <div className="space-y-4 animate-slide-up">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Discover
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-pulse">
                  Amazing Style
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 max-w-lg animate-fade-in">
                Explore our curated collection of premium clothing and
                accessories. Quality meets style in every piece.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm">
              <div className="text-center animate-stagger-1">
                <div className="text-2xl font-bold text-primary flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  10K+
                </div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center animate-stagger-2">
                <div className="text-2xl font-bold text-secondary flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  500+
                </div>
                <div className="text-gray-600">Products</div>
              </div>
              <div className="text-center animate-stagger-3">
                <div className="text-2xl font-bold text-accent flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  4.9
                </div>
                <div className="text-gray-600">Rating</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-stagger-4">
              <a
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-ecommerce-hover hover:scale-105 transition-all duration-300 animate-float"
                href="#products"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block animate-scale-in">
            <div className="relative">
              {/* Main Image */}
              <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-ecommerce animate-float">
                <img
                  src="https://res.cloudinary.com/dhrrzmg7h/image/upload/v1752737919/swhsfnmlvlcdcjhz3xdj.jpg"
                  alt="Fashion Collection"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-100 animate-bounce-in">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50%</div>
                  <div className="text-sm text-gray-600">Off</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg border border-gray-100 animate-bounce-in">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Free Shipping
                  </span>
                </div>
              </div>

              {/* Trending Badge */}
              <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 animate-pulse">
                <TrendingUp className="w-3 h-3" />
                Trending
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
    </section>
  );
};

export default BannerSlider;
