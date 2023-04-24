import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import axios from "axios";

const tiers = [
  {
    title: "Monthly",
    price: "9.99",
    buttonText: "Select Plan",
    buttonVariant: "outlined",
    description: "You pay extra $19.89",
    billingPeriod: "mo",
  },
  {
    title: "Annually",
    subheader: "Most popular",
    price: "99.99",
    buttonText: "Select Plan",
    buttonVariant: "outlined",
    description: "You save $19.89",
    billingPeriod: "yr",
  },
];

function PricingContent({
  userId,
  token,
  onSubscriptionChanged,
  setSelectedPlan,
  account,
}) {
  const handleSelectPlan = async (plan) => {
    try {
      const response = await axios.post(
        `${process.env.SERVER}/amendsubscription/${userId}`,
        { plan },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Plan updated successfully");
        const switchedPlan = plan !== account.plan;
        onSubscriptionChanged(switchedPlan);
        console.log(`plan: ${plan}`);
        setSelectedPlan(plan);
      } else {
        console.log("Error updating plan");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />

      <AppBar
        position="static"
        color="default"
        elevation={5}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          marginTop: 4,
        }}
      ></AppBar>
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 2, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h5"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ color: "white" }}
        >
          Subscription Plans
        </Typography>
      </Container>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} justifyContent={"center"}>
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  borderWidth: account.plan === tier.title ? "5px" : "0px",
                  borderColor:
                    account.plan === tier.title ? "darkred" : "transparent",
                  borderStyle: "solid",
                }}
              >
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={
                    tier.title === "Annually" ? (
                      <StarIcon />
                    ) : (
                      <div style={{ width: "24px", height: "24px" }} />
                    )
                  }
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    height: "100px",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />

                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /{tier.billingPeriod}
                    </Typography>
                  </Box>
                  <ul>
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                    >
                      {tier.description}
                    </Typography>
                  </ul>
                </CardContent>
                <CardActions>
                  {account.plan !== tier.title && (
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      onClick={() => handleSelectPlan(tier.title)}
                    >
                      {tier.buttonText}
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default function SubscriptionPlans({
  userId,
  token,
  onSubscriptionChanged,
  setSelectedPlan,
  account,
}) {
  return (
    <PricingContent
      userId={userId}
      token={token}
      onSubscriptionChanged={onSubscriptionChanged}
      setSelectedPlan={setSelectedPlan}
      account={account}
    />
  );
}
