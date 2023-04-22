import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function CheckSubscriptionStatus({ setSubscriptionActive }) {
  const token = localStorage.getItem("token");
  let userId;
  if (token) {
    const id = JSON.parse(window.atob(token.split(".")[1]));
    userId = id.sub.id;
  }
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getsubscriptiondetails/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAccount(response.data.message);
        console.log(`checkSubscriptionStatus: ${JSON.stringify(response.data, null, 2)}`);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAccountDetails();
  }, [token, userId]);

  useEffect(() => {
    if (account && account.end_date) {
      const isEndDate = moment(account.end_date).isSameOrBefore(moment());
      setSubscriptionActive(!isEndDate);
      console.log(`isEndDte: ${isEndDate}`)
      if (isEndDate) {
        console.log(`isEndDte: ${isEndDate}`)
        navigate("/account");
      }
    }
  }, [account, navigate, setSubscriptionActive]);

  
  useEffect(() => {
    if (token === null || token === undefined) {
      navigate("/login");
    }
  }, [token, navigate]);
  
  

  return null;
}

