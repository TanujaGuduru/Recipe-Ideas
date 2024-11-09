import React from 'react';
import { ChefHat, Clock, Utensils } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 text-white">
      <div className="absolute inset-0 bg-black/20" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Perfect Recipes for Your Kitchen
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100">
            Discover delicious meals based on ingredients you already have
          </p>
          <div className="flex justify-center gap-8 text-orange-100">
            <div className="flex items-center gap-2">
              <ChefHat className="h-6 w-6" />
              <span>Easy to Follow</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6" />
              <span>Quick Recipes</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="h-6 w-6" />
              <span>Simple Ingredients</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;