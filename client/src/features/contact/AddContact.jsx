import React, { useState } from "react";
import { useCreateContactMutation } from "../../api/contact"; // Assurez-vous d'importer correctement votre API
import { Link } from "react-router-dom";

const AddContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    profession: "",
  });

  const [createContact, { isLoading, isError, error }] = useCreateContactMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appelez la mutation pour créer un contact avec les données du formulaire
      const response = await createContact(formData);

      if (response.error) {
        // Gérez les erreurs ici, par exemple en affichant un message d'erreur
        console.error("Erreur lors de la création du contact:", response.error);
      } else {
        // Réinitialisez le formulaire après la création réussie du contact
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          address: "",
          phone: "",
          profession: "",
        });
        // Redirigez l'utilisateur vers la page de liste de contacts ou une autre page appropriée
        // Assurez-vous d'avoir défini la route appropriée dans votre application
        // Remplacez '/contacts' par votre route réelle
        window.location.href = "/dashboard/Contacts";
      }
    } catch (error) {
      console.error("Erreur lors de la création du contact:", error);
    }
  };

  return (
    <div className="py-10 px-10">
      <h1 className="text-2xl font-semibold">Ajouter un Contact</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="text-sm font-semibold">
            Prénom
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className="text-sm font-semibold">
            Nom
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="text-sm font-semibold">
            Adresse
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-semibold">
            Téléphone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="profession" className="text-sm font-semibold">
            Profession
          </label>
          <input
            type="text"
            name="profession"
            id="profession"
            value={formData.profession}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className={`${
            isLoading ? "disabled bg-green-100" : ""
          } bg-green-500 text-white px-4 py-2 rounded-md`}
        >
          {isLoading ? "En cours..." : "Ajouter Contact"}
        </button>
        <Link
          to="/dashboard/Contacts"
          className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 text-right"
        >
          Retour
        </Link>
      </form>
    </div>
  );
};

export default AddContactPage;
