import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import jwt_decode from "jwt-decode";

const schema = yup.object().shape({
  firstName: yup.string().required("Le prénom est obligatoire"),
  lastName: yup.string().required("Le nom de famille est obligatoire"),
  email: yup
    .string()
    .email("Veuillez entrer une adresse e-mail valide")
    .required("L'e-mail est obligatoire"),
  address: yup.string().required("L'adresse est obligatoire"),
  phone: yup.string().required("Le numéro de téléphone est obligatoire"),
  profession: yup.string().required("La profession est obligatoire"),
  userId: yup.string().required("L'id est obligatoire"),
});

export default function AddContact() {
  const [userId, setUserId] = useState(null); // État pour stocker l'ID de l'utilisateur

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Récupérez le token depuis localStorage (vous devrez peut-être l'adapter à votre méthode de stockage)
    const token = localStorage.getItem("token");

    if (token) {
      // Décodez le token pour obtenir ses données (dans cet exemple, nous supposons que l'ID de l'utilisateur est stocké dans une propriété "userId" du token)
      const decodedToken = jwt_decode(token);

      // Mettez à jour l'ID de l'utilisateur dans l'état
      setUserId(decodedToken.userId);

      // Vous pouvez également stocker l'ID de l'utilisateur dans le localStorage si nécessaire
      localStorage.setItem("userId", decodedToken.userId);
    }
  }, []); // Cette dépendance vide signifie que cela se produira une seule fois lorsque le composant est monté

  const onSubmit = (data) => {
    // Assurez-vous que vous avez l'ID de l'utilisateur ici
    console.log("ID de l'utilisateur connecté :", userId);

    // Ajoutez l'ID de l'utilisateur connecté aux données du contact
    data.userId = userId;

    // Vous pouvez maintenant envoyer ces données au backend
    console.log("Nouveau contact avec ID utilisateur :", data);

    // Remarque : Pour l'ajout réel, vous devrez envoyer ces données à votre backend
    // et mettre à jour l'état de votre application en conséquence.
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Prénom</label>
        <input
          {...register("firstName")}
          className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          type="text"
          placeholder="Prénom"
        />
        {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Nom de famille</label>
        <input
          {...register("lastName")}
          className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          type="text"
          placeholder="Nom de famille"
        />
        {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          {...register("email")}
          className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          type="text"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Adresse</label>
        <input
          {...register("address")}
          className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          type="text"
          placeholder="Adresse"
        />
        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
        <input
          {...register("phone")}
          className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          type="text"
          placeholder="Numéro de téléphone"
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Profession</label>
        <input
          {...register("profession")}
          className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          type="text"
          placeholder="Profession"
        />
        {errors.profession && <p className="text-red-500">{errors.profession.message}</p>}
      </div>
      <button
        type="submit"
        className="bg-green-500 text-green-50 px-4 py-2 rounded-md"
      >
        Ajouter un contact
      </button>
    </form>
  );
}
