import * as React from "react";
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
import HistoryIcon from "./HistoryIcon";

const ExpandMore = styled(IconButton)(({ theme }) => ({
  transform: "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function HistoryCard({ movieData, onDelete }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
    <Box marginTop={4} marginLeft={4}>
      <Card
        sx={{ maxWidth: 345, minHeight: 400, color: "white", bgcolor: "black" }}
      >
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontSize: "1rem" }}>
              {movieData.title}
            </Typography>
          }
          subheader={
            <Typography sx={{ color: "white" }}>
              {movieData.release_date}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt={movieData.title}
        />
        <CardContent>
          <Typography variant="body2" color="white">
            Rating: {movieData.vote_average}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        
            <IconButton
              aria-label="favourite this movie"
            >
              <HistoryIcon movieData={movieData} />
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
              {movieData.overview || "Overview not available."}
            </Typography>

            <Typography paragraph></Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
    </div>
  );
}
