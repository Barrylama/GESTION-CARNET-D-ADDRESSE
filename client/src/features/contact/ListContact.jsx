import React, { useState, useEffect } from "react";

// Supposons que vous ayez une fonction pour récupérer les contacts de l'utilisateur connecté depuis votre API
// Remplacez getContactsFromAPI par votre fonction réelle
const getContactsFromAPI = async (userId) => {
  // Faites une requête API pour obtenir les contacts de l'utilisateur avec l'ID userId
  // Assurez-vous que votre backend renvoie les données au format JSON
  const response = await fetch(`/api/contacts?userId=${userId}`);
  const data = await response.json();
  return data.contacts;
};

const ContactsPage = ({ userId }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    // Chargez les contacts de l'utilisateur connecté depuis l'API
    getContactsFromAPI(userId).then((data) => {
      setContacts(data);
      setFilteredContacts(data);
    });
  }, [userId]);

  // Filtrer les contacts en fonction du terme de recherche
  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddContactClick = () => {
    // Redirigez l'utilisateur vers la page d'ajout de contact
    // Assurez-vous d'avoir défini la route appropriée dans votre application
    // Remplacez '/add-contact' par votre route réelle
    window.location.href = "/addContact";
  };

  return (
    <div className="py-10 px-10">
      <div className=" text-white p-4 rounded-md mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Mes Contacts</h1>
          <div className="flex ">
            <input
              type="text"
              placeholder="Rechercher un contact..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md px-2 py-1"
            />
            <button
              onClick={handleAddContactClick}
              className="bg-green-500 text-white px-4 py-2 rounded-md ml-2 text-right"
            >
              Ajouter un contact
            </button>
          </div>
        </div>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-800 text-sm text-white ">
            <th className="text-left">Nom</th>
            <th className="text-left">Prénom</th>
            <th className="text-left">Email</th>
            <th className="text-left">Adresse</th>
            <th className="text-left">Téléphone</th>
            <th className="text-left">Profession</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.address}</td>
              <td>{contact.phone}</td>
              <td>{contact.profession}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsPage;
