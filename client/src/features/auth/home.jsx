import React from "react";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur notre site</h1>
      <p className="text-gray-600 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus,
        ligula ac varius auctor, sapien augue faucibus libero.
      </p>
      <div className="flex">
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-4"
        >
          Commencer
        </Link>
        {/* Ajoutez d'autres liens "Get Started" si nécessaire */}
      </div>
    </div>
  );
}
