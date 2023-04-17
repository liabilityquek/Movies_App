import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import NewUser from "./NewUser";
import Forget from "./Forget";
import React, { useState } from "react";

export default function AuthPage({ setUser, user }) {

  if (user !== null) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Routes>
      <Route path="/login" element={<SignIn setUser={setUser} />} />
      <Route path="/signup" element={<NewUser />} />
      <Route path="/forget" element={<Forget />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
