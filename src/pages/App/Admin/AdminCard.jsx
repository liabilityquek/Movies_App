import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import AdminIcon from "./AdminIcon";

const ExpandMore = styled(IconButton)(({ theme }) => ({
  transform: "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function AdminCard({ games, likes, onGameUpdated }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      {games ? (
        <Box marginTop={4} marginLeft={4}>
          <Card
            sx={{
              maxWidth: 345,
              minHeight: 400,
              color: "white",
              bgcolor: "black",
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                  {games.title}
                </Typography>
              }
            />
            <CardMedia
              component="img"
              height="300"
              image={games.image_url ? games.image_url : "../../../../images/image not available.jpg"}
              alt={games.title}
            />
            <CardContent>
              <Typography variant="body2" color="white">
                Likes: {likes}
                {console.log(`likes: ${likes}, gameId: ${games._id.$oid}`)}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="edit game" >
              <AdminIcon games={games} onGameUpdated={onGameUpdated} likes={likes} />
              </IconButton>
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                sx={{ color: "white" }}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography sx={{ color: "white" }} paragraph>
                  {games.description || "Overview not available."}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Box>
      ) : (
        <Typography
          variant="h6"
          color="white"
          sx={{ mt: 4, textAlign: "center" }}
        >
          Nothing to show..
        </Typography>
      )}
    </div>
  );
}
