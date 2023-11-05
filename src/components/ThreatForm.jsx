import React, { useState } from "react";

function UploadForm() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object to send the data to the server
    const formData = new FormData();
    formData.append("name", name);
    formData.append("id", id);
    formData.append("image", photo);

    // Send the data to the server using fetch or an HTTP library of your choice
    const uid = sessionStorage.getItem("user_id");
    fetch(`http://127.0.0.1:8000/create_user?user_id=${uid}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the server response if needed
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div
      style={{ backgroundColor: "#011222" }}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <div>
        <div className="mb-20 ml-3">
          <h2
            style={{ color: "#a0dbe6" }}
            className="text-4xl font-extrabold text-gray-900 truncate"
          >
            Upload Threat
          </h2>
        </div>
        <div className="mb-20 w-11/12 flex flex-col items-center justify-center lg:flex-row xl:flex-row 2xl:flex-row sm:flex-col flex-wrap">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                required
                className="apperanace-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                placeholder="Unique ID"
                required
                className="apperanace-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={id}
                onChange={handleIdChange}
              />
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <input
                type="file"
                accept="image/*"
                required
                className="apperanace-none rounded-none relative block w-full px-3 py-2  placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={handlePhotoChange}
              />
            </div>
            <div>
              <button
                style={{ color: "#011222", backgroundColor: "#a0dbe6" }}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium 
                rounded-md text-white  hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2
                 focus:ring-indigo-500 transition-all duration-200"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UploadForm;
