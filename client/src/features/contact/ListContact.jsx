import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from "../../api/contact"; // Assurez-vous d'importer correctement votre API

const ContactsPage = () => {
  const { data: contacts, isLoading, isError, error } = useGetContactsQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  const [deleteContact, { isError: deleteError, error: deleteErrorMessage }] = useDeleteContactMutation();

  useEffect(() => {
    if (contacts) {
      setFilteredContacts(contacts);
    }
  }, [contacts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    const filtered = contacts.filter((contact) => {
      // Convertissez le terme de recherche en minuscules pour la correspondance insensible à la casse
      const searchTermLower = searchTerm.toLowerCase();

      // Vérifiez si le terme de recherche correspond à l'un des champs du contact
      return Object.values(contact).some((field) =>
        field.toLowerCase().includes(searchTermLower)
      );
    });

    setFilteredContacts(filtered);
  };

  const handleDeleteClick = async (id) => {
    try {
      // Appelez la mutation pour supprimer le contact avec l'ID donné
      await deleteContact(id);

      // Réactualisez la liste des contacts après la suppression
      const updatedContacts = contacts.filter((contact) => contact._id !== id);
      setFilteredContacts(updatedContacts);
    } catch (error) {
      console.error("Erreur lors de la suppression du contact:", error);
    }
  };

  // ... autres parties de votre composant

  return (
    <div className="py-10 px-10">
      <div className=" text-black p-4 rounded-md mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Mes Contacts</h1>
          <div className="flex">
            <input
              type="text"
              placeholder="Rechercher un contact..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md px-2 py-1"
            />
            <Link
              to="/addContact"
              className="bg-green-500 text-white px-4 py-2 rounded-md ml-2 text-right"
            >
              Ajouter un contact
            </Link>
          </div>
        </div>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-800 text-sm text-white ">
            <th className="text-left">Prénom</th>
            <th className="text-left">Nom</th>
            <th className="text-left">Email</th>
            <th className="text-left">Adresse</th>
            <th className="text-left">Téléphone</th>
            <th className="text-left">Profession</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => (
            <tr key={contact._id} className="bg bg-gray-50">
              <td className="ml-2 font-semibold text-black">
                {contact.firstName}
              </td>
              <td className="ml-2 font-semibold">{contact.lastName}</td>
              <td className="ml-2 font-semibold">{contact.email}</td>
              <td className="ml-2 font-semibold">{contact.address}</td>
              <td className="ml-2 font-semibold">{contact.phone}</td>
              <td className="ml-2 font-semibold">{contact.profession}</td>
              <td>
                <Link to={`updateContact/${contact._id}`}>
                  <FontAwesomeIcon icon={faEdit} className="mr-0 text-blue-500 h-7 w-7" />
                </Link>
                <Link
                  onClick={() => handleDeleteClick(contact._id)}
                >
                  <FontAwesomeIcon icon={faTrash} className="ml-5 text-red-500 h-7 w-7" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsPage;
