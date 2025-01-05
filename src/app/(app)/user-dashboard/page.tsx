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
  const { data: session,status,update } = useSession();

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
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [id, setId] = useState("");
  const router = useRouter()
  console.log(isSubmitting);
  

  // Update state when session data is available

  
  useEffect(() => {
    if (session?.user) {
      setId(session.user.id || "");
      setUserFirstName(session.user.userFirstName || "");
      setUserLastName(session.user.userLastName || "");
      setEmail(session.user.email || "");
      setMobileNo(session.user.mobileNo || "");
      setUserLocation(session.user.location || "");
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
        // const newSession = await fetch("/api/auth/session").then((res) =>
        //   res.json()
        // );
        // console.log(newSession);
        
        await update({
          ...session,
          user: {
            ...session?.user,
            userFirstName: response.data.data.userFirstName,
            userLastName: response.data.data.userLastName,
          },
        });
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully refreshed the page to see the changes",
      });
      // setSession(newSession);
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      
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
    console.log(error);
    
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
    <div className="bg-gray-200 h-full">
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      {/* Back Button */}
      <button
        className="text-2xl sm:text-3xl text-orange-500 hover:text-orange-700 dark:text-white flex items-center mb-4"
        onClick={() => history.back()}
        aria-label="Go back"
      >
        <IoMdArrowRoundBack className="mr-2" />
        Back
      </button>
  
      {/* Profile Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Profile</h1>
  
      {/* Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center relative">
          {/* User Avatar */}
          <div className="relative w-32 h-32 rounded-full bg-slate-200 flex justify-center items-center text-4xl font-semibold text-gray-700 overflow-hidden">
            {session?.user?.userFirstName
              ? session.user.userFirstName[0].toUpperCase()
              : "?"}
          </div>
  
          {/* User Name */}
          <h2 className="text-2xl font-bold mt-4 text-gray-800">
            {session?.user?.userFirstName ?? "Not Signed In"}
          </h2>
  
          {/* User Location */}
          <p className="text-gray-500 flex items-center mt-2">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            {userLocation || "Location not set"}
          </p>
  
          {/* User Stats */}
          <div className="mt-6 w-full text-left">
            <div className="flex justify-between items-center text-gray-700 font-medium mb-2">
              <span>Total Purchases:</span>
              <span>25</span>
            </div>
            <div className="flex justify-between items-center text-gray-700 font-medium mb-2">
              <span>Books Sold:</span>
              <span>15</span>
            </div>
            <div className="flex justify-between items-center text-gray-700 font-medium">
              <span>Rating:</span>
              <span>4.5/5</span>
            </div>
          </div>
        </div>
  
        {/* User Information Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-600 text-lg">User Information</h2>
            <button
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
              aria-label="Edit user information"
              onClick={handleEditToggle}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
  
          {/* User Details */}
          {[
            { label: "Firstname", icon: FaUser, value: userFirstName, onChange: setUserFirstName },
            { label: "Lastname", icon: FaUser, value: userLastName, onChange: setUserLastName },
            { label: "E-Mail", icon: FaEnvelope, value: email, disabled: true },
            { label: "Phone", icon: FaPhone, value: mobileNo, disabled: true },
          ].map(({ label, icon: Icon, value, onChange, disabled }, index) => (
            <div className="mb-4" key={index}>
              <h3 className="text-gray-500 flex items-center mb-1">
                <Icon className="mr-2" />
                {label}
              </h3>
              <input
                type="text"
                className={`w-full p-2 rounded ${
                  isEditing && !disabled ? "bg-white border" : "bg-gray-100"
                }`}
                value={value}
                disabled={!isEditing || disabled}
                onChange={(e) => onChange && onChange(e.target.value)}
              />
            </div>
          ))}
  
          {/* Password Section */}
          <div>
            <h3 className="text-gray-500 flex items-center mb-1">
              <IoMdKey className="mr-2" />
              Password
            </h3>
            {isPasswordEditable ? (
              <div className="flex items-center">
                <input
                  type="password"
                  className="w-full p-2 rounded border"
                  value={password}
                  placeholder="New Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="bg-pink-500 text-white px-4 py-2 ml-2 rounded-lg hover:bg-pink-600 transition"
                  onClick={savePassword}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <p className="text-gray-500">Password is Secure</p>
                <button
                  className="ml-4 text-blue-600"
                  onClick={() => setIsPasswordEditable(true)}
                >
                  Forgot Password?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
    //   </div>
    // </div>
  );
}
