import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loading from "./../../../components/Loading";
import Typography from "@mui/material/Typography";
import moment from "moment";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SubscriptionPlans from "./SubscriptionPlans";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useRefresh } from "../AuthPage/UseRefresh";
import Bar from "../../../components/Bar";

export default function Subscription({ userName, handleSubscriptionActive, setUser }) {
  const token = localStorage.getItem("token");
  const id = JSON.parse(window.atob(token.split(".")[1]));
  const userId = id.sub.id;
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [switchedPlan, setSwitchedPlan] = useState(null);
  const { refreshToken } = useRefresh();

  const fetchAccountDetails = useCallback(async (authToken) => {
    try {
      const response = await axios.get(
        `https://movies-app-python.onrender.com/getsubscriptiondetails/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const isTrialPeriod = moment(response.data.message.trial_end).isSameOrAfter(moment());
      setAccount(response.data.message);
      console.log(
        `fetch account details: ${JSON.stringify(response.data, null, 2)}`
        );
        setIsLoading(false);
      if (response.data.message.end_date === undefined || isTrialPeriod) {
        handleSubscriptionActive(true);
      } else {
        handleSubscriptionActive(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      const newToken = await refreshToken();
      await fetchAccountDetails(newToken);
    }
  }, [userId, handleSubscriptionActive, refreshToken]);

  useEffect(() => {
    if (account) {
      console.log(`fetch account end date: ${account.end_date}`);
    }
  }, []);

  useEffect(() => {
    fetchAccountDetails(token);
  }, []);

  const handleButtonClick = async (authToken) => {
    try {
      if (account.end_date === undefined) {
        const response = await axios.post(
          `https://movies-app-python.onrender.com/cancelsubscription/${userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      } else if (account.end_date !== undefined) {
        const response = await axios.post(
          `https://movies-app-python.onrender.com/reinstatesubscription/${userId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      }
      fetchAccountDetails(token);
    } catch (error) {
      console.log(error);
      const newToken = await refreshToken();
      await handleButtonClick(newToken);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const regularPrice = account.plan === "Monthly" ? 9.99 : 99.99;

  const effective_start_date = account.start_date;

  const trialDays = moment(account.trial_end).diff(
    effective_start_date,
    "days"
  );

  const trialEndFormatted = moment(account.trial_end).format("DD MMM YYYY");

  const isTrialDays = moment(account.trial_end).isAfter(moment()); //true means got free trial
  console.log(
    "account.end_date:",
    account.end_date,
    "isTrialDays:",
    isTrialDays,
    "trial_end:",
    account.trial_end
  );

  const getNextBillingDate = () => {
    const dateFormat = "ddd, DD MMM YYYY HH:mm:ss z";
    const start_date = moment(account.start_date, dateFormat);
    const trial_end = moment(account.trial_end, dateFormat).add(1, "days");
    const reinstate_date = moment(account.reinstate_date, dateFormat);
    const effective_start_date = reinstate_date.isValid()
      ? reinstate_date
      : start_date;

    const increment = account.plan === "Monthly" ? 30 : 365;
    const daysSinceEffectiveStart = moment().diff(effective_start_date, "days");
    const daysSinceTrialEnd = daysSinceEffectiveStart - trialDays;
    const cyclesPassed = Math.ceil(daysSinceTrialEnd / increment);
    const nextBillingDate = trial_end
      .clone()
      .add(cyclesPassed * increment, "days");

    return nextBillingDate.format("DD MMM YYYY");
  };

  const AlertMessage = (switchedPlan) => {
    let message = "";
    if (switchedPlan) {
      message = "Subscription Plan successfully changed";
    } else if (selectedPlan && selectedPlan === account.plan) {
      message = `You are currently on a ${selectedPlan} Subscription Plan`;
    }
    return (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert onClose={() => {}}>{message}</Alert>
      </Stack>
    );
  };

  const onSubscriptionChanged = (newSwitchedPlan) => {
    fetchAccountDetails();
    setShowAlert(true);
    setSwitchedPlan(newSwitchedPlan);
    if (newSwitchedPlan) {
      setSelectedPlan(null);
    }
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <>
      <Bar setUser={setUser}/>
      {showAlert && AlertMessage(switchedPlan)}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="10vh"
      >
        <Typography
          component="h1"
          variant="h5"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ color: "white", marginTop: 4 }}
        >
          Welcome back, {userName}
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontSize: "1rem", mt: 1, textAlign: "center", color: "white" }}
        >
          {account.end_date !== undefined && isTrialDays
            ? `You are in a ${trialDays} days free trial. After ${trialEndFormatted}, you will not be able to access the benefits unless you reinstate your account.`
            : account.end_date === undefined && isTrialDays
            ? `Your next billing cycle will be on ${getNextBillingDate()} at $${regularPrice}`
            : account.end_date !== undefined && !isTrialDays
            ? `Please reinstate your account to access benefits.`
            : account.end_date === undefined && !isTrialDays
            ? `Your next billing cycle will be on ${getNextBillingDate()} at $${regularPrice}`
            : null}
        </Typography>
      </Box>
      {account.end_date === undefined && (
        <SubscriptionPlans
          userId={userId}
          token={token}
          onSubscriptionChanged={onSubscriptionChanged}
          setSelectedPlan={setSelectedPlan}
          account={account}
        />
      )}

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="40vh"
      >
        <Button
          variant="contained"
          onClick={handleButtonClick}
          sx={{
            width: "35%",
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          {account.end_date === undefined
            ? "Cancel Subscription"
            : "Reinstate Subscription"}
        </Button>
      </Box>
    </>
  );
}
