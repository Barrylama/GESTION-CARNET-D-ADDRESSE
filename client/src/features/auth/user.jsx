import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Essayez d'extraire les informations de l'utilisateur à partir du localStorage
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user")).user;

    if (userFromLocalStorage) {
      setUser(userFromLocalStorage);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="py-10 px-10 text-center">
      <div className="bg-white shadow-md p-6 rounded-lg">
        <FontAwesomeIcon icon={faUserAlt} className="text-6xl mb-4" />
        <h1 className="text-5xl font-semibold">Profil de l'Utilisateur</h1>
        {loading ? (
          <p>Chargement en cours...</p>
        ) : user ? (
          <div className="mt-10">
            <p className="text-3xl font-semibold">
              <strong>Prénom :</strong> {user.firstName}
            </p>
            <p className="text-3xl font-semibold pt-2">
              <strong>Nom :</strong> {user.lastName}
            </p>
            <p className="text-3xl font-semibold pt-2">
              <strong>Email :</strong> {user.email}
            </p>
            {/* Ajoutez d'autres informations de profil si nécessaire */}
          </div>
        ) : (
          <p>Les informations de l'utilisateur ne sont pas disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
