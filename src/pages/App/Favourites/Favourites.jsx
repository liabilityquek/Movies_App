import * as React from 'react';
import ShowFavourites from './ShowFavourites';
import Typography from "@mui/material/Typography";
import Bar from '../../../components/Bar';

export default function Favourites ({ userName }) {
    return(
        <>

        <Bar />
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
        <ShowFavourites itemsPerPage={9}/>
        </>
    )
}