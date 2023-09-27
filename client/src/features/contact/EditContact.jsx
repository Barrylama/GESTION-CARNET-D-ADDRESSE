import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  useUpdateContactMutation,
  useGetContactByIdQuery,
} from '../../api/contact';

const EditContactPage = () => {
  const { id } = useParams(); // Obtenez l'ID du contact à partir de l'URL
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    profession: '',
  });

  const { data: contact } = useGetContactByIdQuery(id,{skip:!id}); // Utilisez cette requête pour obtenir la liste des contacts (pour rediriger plus tard)


  const [updateContact, { isLoading, isError, error }] = useUpdateContactMutation();

  useEffect(() => {
    if (contact) {
      // Mettez à jour le formulaire avec les données du contact
      setFormData({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        email: contact.email || '',
        address: contact.address || '',
        phone: contact.phone || '',
        profession: contact.profession || '',
      });
    }
  }, [contact]);

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
      // Appelez la mutation pour mettre à jour le contact avec les données du formulaire
      const response = await updateContact({ id, updatedData: formData });

      if (response.error) {
        // Gérez les erreurs ici, par exemple en affichant un message d'erreur
        console.error('Erreur lors de la mise à jour du contact:', response.error);
      } else {
        // Redirigez l'utilisateur vers la page de liste de contacts ou une autre page appropriée
        // Assurez-vous d'avoir défini la route appropriée dans votre application
        // Remplacez '/dashboard/Contacts' par votre route réelle
        window.location.href = '/dashboard/Contacts';
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du contact:', error);
    }
  };

  return (
    <div className="py-10 px-10">
      <h1 className="text-2xl font-semibold">Modifier le Contact</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Champs de formulaire pour la modification du contact */}
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
        {/* Autres champs de formulaire */}
        <button
          type="submit"
          className={`${
            isLoading ? 'disabled bg-green-100' : ''
          } bg-green-500 text-white px-4 py-2 rounded-md`}
        >
          {isLoading ? 'En cours...' : 'Mettre à jour Contact'}
        </button>
        <Link
          to="/dashboard/Contacts"
          className="bg-red-500 text-white px-4 py-2 rounded-md ml-2 text-right"
        >
          Annuler
        </Link>
      </form>
    </div>
  );
};

export default EditContactPage;
