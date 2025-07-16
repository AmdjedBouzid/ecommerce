"use client";
import React from "react";
import { Truck, Clock4, RotateCcw, Shield, CreditCard, Headphones } from "lucide-react";

const features = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Free Shipping",
    desc: "Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: <Clock4 className="w-8 h-8" />,
    title: "24/7 Support",
    desc: "Round-the-clock customer support to help you with any questions or concerns.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: <RotateCcw className="w-8 h-8" />,
    title: "Easy Returns",
    desc: "30-day return policy. No questions asked, hassle-free returns and exchanges.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure Payment",
    desc: "Your payment information is protected with bank-level security encryption.",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "Flexible Payment",
    desc: "Multiple payment options including credit cards, PayPal, and installment plans.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "Live Chat",
    desc: "Instant chat support with our friendly customer service representatives.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="w-full bg-gradient-to-br from-white to-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AMDJED SHOP
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience possible. 
            Here's what makes us different.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`group bg-white rounded-2xl p-6 shadow-ecommerce hover:shadow-ecommerce-hover transition-all duration-300 border border-gray-100 hover:border-primary/20 animate-stagger-${Math.min(idx + 1, 5)}`}
            >
              {/* Icon */}
              <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 animate-bounce-in`}>
                <div className={feature.color}>
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full text-sm font-medium animate-pulse">
            <span>🚀</span>
            Ready to get started?
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
