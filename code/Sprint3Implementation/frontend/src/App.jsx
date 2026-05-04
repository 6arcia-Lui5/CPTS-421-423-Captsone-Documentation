import {
  Show,
  SignUpButton,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/react";

import Navbar from "./components/Navbar"

import { Route, Routes } from "react-router"

import HomePage from "./pages/HomePage"
import CollectionPage from "./pages/CollectionPage"
import RecordPage from "./pages/RecordPage"
import ProfilePage from "./pages/ProfilePage"
import CreatePage from "./pages/CreatePage"
import EditRecordPage from "./pages/EditRecordPage"
import useAuthReq from "../hooks/useAuthReq";
import useUserSync from "../hooks/useUserSync";
import { Navigate } from "react-router";

function App() {
  const { isClerkLoaded, isSignedIn} = useAuthReq();
  useUserSync();
  if (!isClerkLoaded) return null;
  
  return (
    <div className="min-h-screen bg-base-100" >
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8" >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionPage />} />
        <Route path="/record/:id" element={<RecordPage />} />
        <Route path="/profile" element={isSignedIn ? <ProfilePage/> : <Navigate to={"/"} /> }/>
        <Route path="/create" element={isSignedIn ? <CreatePage/> : <Navigate to={"/"} /> }/>
        <Route path="/edit/:id" element={isSignedIn ? <EditRecordPage/> : <Navigate to={"/"} /> }/>
      </Routes>
      </main>
    </div>
  )
}

export default App
