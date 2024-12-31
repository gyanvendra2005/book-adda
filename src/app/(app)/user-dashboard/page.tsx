"use client"

import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { FaEnvelope, FaPhone, FaStar, FaUser } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function userDashBoard(){
    return (
        <div className="bg-gray-300 ">
        <div className="container mx-auto p-6">
          {/* Back Button */}
          <button
            className="text-3xl text-orange-500 hover:text-orange-700 dark:text-white flex items-center ml-8 m-2"
            onClick={() => history.back()}
            aria-label="Go back"
          >
            <IoMdArrowRoundBack />
          </button>
  
          {/* Profile Title */}
          <h1 className="ml-8 font-bold text-xl text-gray-800 dark:text-white">Profile</h1>
  
          {/* Profile Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            {/* Profile Card */}
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
              <div className="flex items-center">
                {/* Profile Picture */}
                <img
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full mr-4"
                  src="https://storage.googleapis.com/a1aa/image/m0MXWGdypjLTOtXuGG8iouDSVNpU9EUKpjv5VX2JfdRdKEAKA.jpg"
                  width="100"
                  height="100"
                />
                {/* Edit Button */}
                <div className="relative">
                  <button
                    className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full hover:bg-gray-300 transition"
                    aria-label="Edit profile picture"
                    title="Edit Profile Picture"
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                </div>
              </div>
              <h2 className="text-xl font-bold mt-4 dark:text-white">Esther Howard</h2>
              <p className="text-gray-600 mt-2 dark:text-gray-300 flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                Hubertusstraße 149, 41239 Mönchengladbach
              </p>
              <div className="flex items-center mt-4">
                <FaStar className="text-yellow-500" />
                <span className="ml-2 text-lg font-bold">5.0</span>
                <span className="ml-1 text-gray-600 dark:text-gray-300">(1)</span>
              </div>
            </div>
  
            {/* User Information Card */}
            <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-gray-500 dark:text-gray-300">User Information</h2>
                <button
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
                  aria-label="Edit user information"
                >
                  Edit
                </button>
              </div>
              {/* User Details */}
              {[
                { label: "Firstname", value: "Santi", icon: <FaUser className="mr-2" /> },
                { label: "Lastname", value: "Chai", icon: <FaUser className="mr-2" /> },
                { label: "E-Mail", value: "dev@4takeaway.com", icon: <FaEnvelope className="mr-2" /> },
                { label: "Phone", value: "+49735031450345", icon: <FaPhone className="mr-2" /> },
              ].map((item) => (
                <div className="mb-4" key={item.label}>
                  <h3 className="text-gray-500 dark:text-gray-300 flex items-center">
                    {item.icon}
                    {item.label}
                  </h3>
                  <p className="font-bold">{item.value}</p>
                </div>
              ))}
  
              {/* Password Status */}
              <div>
                <h3 className="text-gray-500 dark:text-gray-300">Password</h3>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500" />
                  <span className="ml-2 font-bold">Password has been set</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}