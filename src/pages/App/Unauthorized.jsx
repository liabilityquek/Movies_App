import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Unauthorized = () => {
  return (
  <>
  <Box
    component="main"
    sx={{
      alignItems: 'center',
      display: 'flex',
      flexGrow: 1,
      minHeight: '100%'
    }}
  >
    <Container maxWidth="md">
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            mb: 3,
            textAlign: 'center'
          }}
        >

        </Box>
        <Typography
          align="center"
          sx={{ mb: 3 }}
          variant="h3"
        >
          401: You do not have permission to access this page.
        </Typography>
        <Typography
          align="center"
          color="text.secondary"
          variant="body1"
        >
          You either tried some shady route or you came here by mistake.
          
        </Typography>
      </Box>
    </Container>
  </Box>
</>
);
};


export default Unauthorized;
