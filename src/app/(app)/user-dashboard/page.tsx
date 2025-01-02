"use client";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaCheckCircle, FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";
import { IoMdArrowRoundBack, IoMdKey } from "react-icons/io";
import { useRouter } from "next/navigation";


export default function UserDashboard() {
  let { data: session,status } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditable, setIsPasswordEditable] = useState(false);
  const {toast} = useToast();
  console.log(session);
    // Initialize state
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [id, setId] = useState("");
  const router = useRouter()

  // Update state when session data is available

  
  useEffect(() => {
    if (session?.user) {
      setId(session.user.id || "");
      setUserFirstName(session.user.userFirstName || "");
      setUserLastName(session.user.userLastName || "");
      setEmail(session.user.email || "");
      setMobileNo(session.user.mobileNo || "");
      setUserLocation(session.user.location || "");
      setAvatar(session.user.avatar || "");
      setPassword(""); // Keep the password empty for security
    }
  }, [session]);
  console.log(userFirstName);



  const saveProfile = async() => {
       setIsSubmitting(true);
    try {
      const response = await axios.put(`/api/changeUser?_id=${id}`, {
        userFirstName,
        userLastName
      })
      console.log(response.data.data.userFirstName);
      
      if(response.status === 200){
        const newSession = await fetch("/api/auth/session").then((res) =>
          res.json()
        );
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully refreshed the page to see the changes",
      });
      // setSession(newSession);
      }
      setIsSubmitting(false);
    } catch (error) {
      toast({
        title: "Profile Update Failed",
        description: "An error occurred while updating your profile, please try again later",
      });
    }
    setIsSubmitting(false);
  }

  const savePassword = async() => {
   setIsSubmitting(true);
   try {
     const response = await axios.put(`/api/changePassword?_id=${id}`, {
      userFirstName,
      email,
     })
      console.log(response.data);
     if(response.status === 200){
      toast({
        title: "Password Updated",
        description: "verificaton email sent",})
   }
   router.replace(`/verify-password/${email}-${password}`,);
  } catch (error) {
    toast({
      title: "Password Update Failed",
      description: "An error occurred while updating your password, please try again later",
    });
   }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-xl font-semibold text-gray-600">Loading...</h2>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
        <p className="text-gray-600 mb-6">You need to sign in to access your dashboard.</p>
        <Link href="/signin" >
        <button className="bg-gradient-to-br relative group/btn px-4 py-2 from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
           Sign In
        </button>
        </Link>
      </div>
    );
  }

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
     if(isEditing){
       saveProfile();
      }
  };

  return (
    <div className="bg-gray-300">
      <div className=" mx-auto p-6">
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
  <div className="relative bg-gradient-to-br bg-white text-black p-6 rounded-lg shadow-md">

    <div className="relative z-10 flex flex-col items-center">
       <div className="rounded-full h-20 w-20 bg-slate-200 flex justify-center items-center text-xl font-semibold text-gray-700">
          {session?.user?.userFirstName
          ? session.user.userFirstName[0].toUpperCase()
          : "?"}
       </div>

      {/* User Name */}
      <h2 className="text-2xl font-bold mt-4">{session?.user?.userFirstName ?? "Not Signed In"}</h2>
      
      {/* User Role or Bio */}
      <p className="text-sm italic mt-2 text-black flex flex-row">
        <FaMapMarkerAlt className="mr-1 mt-1 text-red-700" />
        {userLocation ? `${userLocation}` : "Location not set"}
      </p>
    </div>
  </div>

          {/* User Information Card */}
          <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-500 dark:text-gray-300">User Information</h2>
              <button
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
                aria-label="Edit user information"
                onClick={handleEditToggle}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
            {/* User Details */}
            <div className="mb-4">
              <h3 className="text-gray-500 dark:text-gray-300 flex items-center">
                <FaUser className="mr-2" />
                Firstname
              </h3>
              <input
                type="text"
                className={`w-full p-2 rounded ${
                  isEditing ? "bg-white border" : "bg-transparent border-none"
                }`}
                disabled={!isEditing}
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <h3 className="text-gray-500 dark:text-gray-300 flex items-center">
                <FaUser className="mr-2" />
                Lastname
              </h3>
              <input
                type="text"
                className={`w-full p-2 rounded ${
                  isEditing ? "bg-white border" : "bg-transparent border-none"
                }`}
                disabled={!isEditing}
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <h3 className="text-gray-500 dark:text-gray-300 flex items-center">
                <FaEnvelope className="mr-2" />
                E-Mail
              </h3>
              <input
                type="email"
                className={`w-full p-2 rounded bg-transparent`}
                disabled={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <h3 className="text-gray-500 dark:text-gray-300 flex items-center">
                <FaPhone className="mr-2" />
                Phone
              </h3>
              <input
                type="tel"
                className={`w-full p-2 rounded bg-transparent `}
                disabled={true}
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>

            {/* Password Status */}
           {isPasswordEditable ?  <div>
            <span className="text-gray-500 dark:text-gray-300 flex flex-auto">
              <IoMdKey className="m-1"/>
              <h3 >Password</h3>
              </span>
              <div className="flex items-center">
                {/* <FaCheckCircle className="text-green-500" /> */}
                <input
                type="tel"
                className={`w-full p-2 rounded ${
                  isEditing ? "bg-white border" : "bg-transparent border-none"
                }`}
                disabled={!isPasswordEditable}
                value={password}
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="bg-pink-500 text-white px-2 ml-2 py-2 rounded-lg hover:bg-pink-600 transition" onClick={savePassword}>
                Change
              </button>
              </div>
            </div>: 
            <div>
              <span className="text-gray-500 dark:text-gray-300 flex flex-auto">
              <IoMdKey className="m-1"/>
              <h3 >Password</h3>
              </span>
               <div className="flex flex-row">
               <FaCheckCircle className="text-green-500 mt-1" />
               <p>Password is Secure </p> 
               </div>
                <button onClick={() => setIsPasswordEditable(true)} className="text-blue-600"> Forgret Password?Click here</button>
            </div>}
          </div>
        </div>
          </div>
        </div>
    //   </div>
    // </div>
  );
}
