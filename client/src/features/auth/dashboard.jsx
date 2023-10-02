import React, { useEffect, useState } from "react";
import { useCountQuery } from "../../api/auth";
import { useCountContactQuery } from "../../api/contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import imageIL from "/src/assets/images/stats1.png";


function Dashboard() {
  const { data, isLoading, isError } = useCountQuery();
  const { data: dataCount, isLoading: isLoadingCount, isError: isErrorCount } = useCountContactQuery();

  return (
    <div>
      <section
        className="py-10 m-5 flex rounded-xl"
        style={{
          background: "linear-gradient(to right,#a2e0b9, #f0f0f0,#cccccc)",
        }}
      >
        <div className="w-1/2 mt-5">
          <div className="bg-white p-4 rounded-lg w-2/3 ml-10 shadow-md">
            <h2 className="text-3xl font-bold mb-4">Nombre total d'utilisateurs</h2>
            {isLoading ? (
              <div className="text-center">
                <p className="text-2xl">Chargement en cours...</p>
                <FontAwesomeIcon icon={faSpinner} spin />
              </div>
            ) : isError ? (
              <div className="text-center">
                <p className="text-2xl text-red-600">Erreur lors du chargement</p>
                <FontAwesomeIcon icon={faExclamationCircle} />
              </div>
            ) : (
              <p className="text-6xl text-center font-bold rounded-md pt-5 pb-5" style={{ background: "#a8e1bd" }}>
                {data?.totalUsers}
              </p>
            )}
          </div>
          <div className="bg-white p-4 rounded-lg w-2/3 ml-10 mt-5 shadow-md">
            <h2 className="text-3xl font-bold mb-4 text-center">Vos contacts enregistrés</h2>
            {isLoadingCount ? (
              <div className="text-center">
                <p className="text-2xl">Chargement en cours...</p>
                <FontAwesomeIcon icon={faSpinner} spin />
              </div>
            ) : isErrorCount ? (
              <div className="text-center">
                <p className="text-2xl text-red-600">Erreur lors du chargement</p>
                <FontAwesomeIcon icon={faExclamationCircle} />
              </div>
            ) : (
              <p className="text-6xl text-white text-center font-bold rounded-md pt-5 pb-5" style={{ background: "#ff6581" }}>
                {dataCount?.count}
              </p>
            )}
          </div>
        </div>
        <div className="w-1/2 mr-5">
          <img
            src={imageIL}
            alt="Illustration 1"
            className="w-full h-auto rounded-md"
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
