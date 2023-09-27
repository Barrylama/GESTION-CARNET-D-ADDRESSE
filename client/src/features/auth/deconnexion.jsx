import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Logout = () => {
  useEffect(() => {
    // Effacez les informations de l'utilisateur du localStorage (ou de l'endroit où vous les stockez)
    localStorage.removeItem("user");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FontAwesomeIcon icon={faSignOutAlt} className="text-6xl text-red-500 mb-4" />
      <h1 className="text-3xl font-semibold mb-2">Déconnexion réussie</h1>
      <p className="mb-4">Merci de votre visite !</p>
      <Link
        to="/"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default Logout;
