"use client";
import React from "react";
import Banner from "./components/Banner/Banner";
import ProductsSection from "./components/ProductSection/ProductsSection";
import CategoriesSection from "./components/CategoriesSecion/CategoriesSection";
import Footer from "./components/Footer/Footer";
import FeaturesSection from "./components/FeaturesSection/FeaturesSection";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="min-h-screen bg-white max-sm:pt-7">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Banner />
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
      >
        <CategoriesSection />
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      >
        <ProductsSection />
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
      >
        <FeaturesSection />
      </motion.section>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}

export default Home;
