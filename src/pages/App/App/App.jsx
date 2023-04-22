import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Favourites from "../Favourites/Favourites";
import History from "../History/History";
import AuthPage from "../AuthPage/AuthPage";
import { getUser } from "../../../utilities/users-service";
import Games from "../Games/Games";
import CreateGame from "../Admin/CreateGame";
import Admin from "../Admin/Admin";
import EditGame from "../Admin/EditGame";
import SignIn from "../AuthPage/SignIn";
import NewUser from "../AuthPage/NewUser";
import Forget from "../AuthPage/Forget";
import Unauthorized from "../Unauthorized";
import Loading from "../../../components/Loading";
import Subscription from "../Subscription/Subscription";
import CheckSubscriptionStatus from "../../../components/checkSubscriptionStatus";

const App = () => {
  const [user, setUser] = useState(getUser());
  const [decodedUser, setDecodedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionActive, setSubscriptionActive] = useState(true);
  const [userName, setUserName] = useState("");


  const handleSubscriptionActive = (active) => {
    setSubscriptionActive(active);
  };

  useEffect(() => {
    if (user) {
      try {
        const token = localStorage.getItem("token");
        const decoded = JSON.parse(window.atob(token.split(".")[1]));
        setDecodedUser(decoded);
      } catch (e) {
        console.error("Invalid token", e);
      }
    }
    setIsLoading(false);
  }, [user]);

  console.log("User in App:", JSON.stringify(decodedUser, null, 2));

  useEffect(() => {
    if (decodedUser) {
      const userName = decodedUser.sub.name;
      console.log(`userName: ${userName}`);
      setUserName(userName);
    }
  }, [decodedUser]);

  if (isLoading) {
    return <Loading />;
  }

  if (!decodedUser) {
    return (
      <Routes>
        <Route path="/*" element={<AuthPage setUser={setUser} />} />
      </Routes>
    );
  } else {
    const role = decodedUser.sub.role;

    if (role === "Customer" && subscriptionActive) {
      console.log(`subscriptionActive : ${subscriptionActive}`);
      return (
        <>
          <CheckSubscriptionStatus
            setSubscriptionActive={setSubscriptionActive}
            subscriptionActive={true}
          />
          <Routes>
            <Route path="/" element={<Home userName={userName} subscriptionActive={subscriptionActive}/>} />
            <Route path="/history" element={<History userName={userName} subscriptionActive={subscriptionActive}/>} />
            <Route
              path="/favourites"
              element={<Favourites userName={userName} subscriptionActive={subscriptionActive}/>}
            />
            <Route path="/games" element={<Games userName={userName} subscriptionActive={subscriptionActive}/>} />
            <Route path="/login" element={<SignIn setUser={setUser} />} />
            <Route path="/signup" element={<NewUser />} />
            <Route path="/forget" element={<Forget />} />
            <Route
              path="/account"
              element={
                <Subscription
                  userName={userName}
                  handleSubscriptionActive={handleSubscriptionActive}
                  subscriptionActive={subscriptionActive}
                />
              }
            />
            <Route path="/creategame" element={<Unauthorized />} />
            <Route path="/editgame" element={<Unauthorized />} />
            <Route path="/admin" element={<Unauthorized />} />
          </Routes>
        </>
      );
    } 
    else if (role === "Customer" && !subscriptionActive) {
      console.log(`subscriptionActive : ${subscriptionActive}`);
      
      return (
        <>
          <CheckSubscriptionStatus
            setSubscriptionActive={setSubscriptionActive}
            subscriptionActive={false}
          />
          <Routes>
            {/* <Route
              path="/account"
              element={
                <Subscription
                  userName={userName}
                  handleSubscriptionActive={handleSubscriptionActive}
                  subscriptionActive={false}
                />
              }
            /> */}
            <Route path="/*" element={<Subscription userName={userName} handleSubscriptionActive={handleSubscriptionActive} subscriptionActive={false}/>} />
          </Routes>
        </>
      );
    } 
    else {
      return (
        <Routes>
          <Route path="/" element={<Unauthorized />} />
          <Route path="/history" element={<Unauthorized />} />
          <Route path="/favourites" element={<Unauthorized />} />
          <Route path="/games" element={<Unauthorized />} />
          <Route path="/account" element={<Unauthorized />} />
          <Route
            path="/creategame"
            element={<CreateGame userName={userName} />}
          />
          <Route
            path="/editgame/:id"
            element={<EditGame userName={userName} />}
          />
          <Route path="/admin" element={<Admin userName={userName} />} />
          <Route path="/login" element={<SignIn setUser={setUser} />} />
          <Route path="/signup" element={<NewUser />} />
          <Route path="/forget" element={<Forget />} />
        </Routes>
      );
    }
  }
};

export default App;
