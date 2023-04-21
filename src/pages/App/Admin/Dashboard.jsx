import React from 'react';
import { Container, Grid, Typography, Card, CardContent } from '@mui/material';

const Dashboard = () => {
  const customers = 500;
  const revenue = 15000;

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Number of Customers
              </Typography>
              <Typography variant="h5" component="div">
                {customers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Revenue
              </Typography>
              <Typography variant="h5" component="div">
                ${revenue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
