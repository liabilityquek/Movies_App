import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";

export default function CheckSubscriptionStatus({ setSubscriptionActive }) {
  const token = localStorage.getItem("token");
  let userId;
  if (token) {
    const id = JSON.parse(window.atob(token.split(".")[1]));
    userId = id.sub.id;
  }
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchAccountDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.SERVER}/getsubscriptiondetails/${userId}`,
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

  useEffect(() => {
    fetchAccountDetails();
  }, [token, userId]);

  useEffect(() => {
    if (account) {
      const isEndDate = moment(account.end_date).isSameOrBefore(moment());
      const isTrialPeriod = moment(account.trial_end).isSameOrAfter(moment());
      setSubscriptionActive(!isEndDate || isTrialPeriod);
      console.log(`isEndDate: ${isEndDate}`);
      console.log(`isTrialPeriod: ${isTrialPeriod}`);
    }
  }, [account, setSubscriptionActive]);

  // Listen for route changes
  useEffect(() => {
    fetchAccountDetails();
  }, [location.pathname]);

  useEffect(() => {
    if (token === null || token === undefined) {
      navigate("/login");
    }
  }, [token, navigate]);

  return null;
}
