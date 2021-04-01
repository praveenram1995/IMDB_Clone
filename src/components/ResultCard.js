import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    margin: "5px"
  },
  media: {
    height: 200
  }
});

const ResultCard = ({ movie, clickCard }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={clickCard}>
      <CardActionArea>
        {movie.poster_path ? (
          <CardMedia
            component="img"
            alt={movie.title}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
          />
        ) : (
          <CardMedia
            component="img"
            alt={movie.title}
            image="https://ecommedicalsupplies.com/images/noimage.png"
            title={movie.title || movie.original_name}
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.original_name || movie.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/user/${movie.id}`}>
          <Button size="small" color="primary" onClick={clickCard}>
            Learn More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ResultCard;

// <CardActions>
//         <Button size="small" color="primary">
//           Share
//         </Button>
//         <Link to={`/user/${movie.id}`}>
//           <Button size="small" color="primary" onClick={clickCard}>
//             Learn More
//           </Button>
//         </Link>
//       </CardActions>
