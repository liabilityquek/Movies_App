import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Tooltip from "@mui/material/Tooltip";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import moment from "moment";

const ExpandMore = styled(IconButton)(({ theme }) => ({
  transform: "rotate(0deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function FavouritesCard({ f, onDelete }) {
  const [expanded, setExpanded] = React.useState(false);
  const currentDate = new Date();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteClick = () => {
    onDelete(f.title);
  };

  return (
    <Box marginTop={4} marginLeft={4}>
      <Card
        sx={{ maxWidth: 345, minHeight: 400, color: "white", bgcolor: "black" }}
      >
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontSize: "1rem" }}>
              {f.title}
            </Typography>
          }
          subheader={<Typography sx={{ color: "white" }}>{f.year}</Typography>}
        />
        <CardMedia
          component="img"
          height="300"
          image={f.image_url ? f.image_url : "../../../../images/image not available.jpg"}
          alt={f.title}
        />
        <CardContent>
          <Typography variant="body2" color="white">
            Rating: {f.rating}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <Tooltip title="Delete this movie?">
        <IconButton aria-label="delete this movie" onClick={handleDeleteClick}>
            <FavoriteIcon sx={{ borderColor: 'white', color: 'red' }}/>
          </IconButton>
          </Tooltip>

          {moment(f.year).isSameOrBefore(currentDate) && (
            <Tooltip title="Play Movie?">
            <IconButton aria-label="play movie">
            <PlayCircleOutlineIcon sx={{ color: 'green', fontSize: '2rem'  }} />
          </IconButton>
          </Tooltip>
          )}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{color:'white'}}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ color: "white" }} paragraph>
              {f.description || "Overview not available."}
            </Typography>

            <Typography paragraph></Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
}
