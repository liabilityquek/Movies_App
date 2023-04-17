import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Favourites from "../Favourites/Favourites";
import History from "../History/History";
import AuthPage from "../AuthPage/AuthPage";
import { getUser } from "../../../utilities/users-service";

const App = () => {
  const [user, setUser] = useState(getUser());

  if (user === null) {
    return <AuthPage setUser={setUser} user={user} />;
  } else {
    console.log("App.jsx user:", user);
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    );
  }
};

export default App;
