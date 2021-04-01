import React, { useState, useContext, useEffect } from "react";
import { Container, Button, Card } from "@material-ui/core";
import { useParams, Link } from "react-router-dom";
import { Context } from "../Context";
import { API_KEY } from "../credentials";
import firebase from "firebase";
import { db } from "../firebase";

function CardDetail({ user }) {
  const { detailId } = useParams();
  const { movies } = useContext(Context);
  const [result, setResult] = useState([]);
  const uid = user.uid;

  const handleClick = (e) => {
    e.preventDefault();
    db.collection(`${uid}`).add({
      wishlist: result,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  const handleFetch = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setResult(data);
  };

  useEffect(() => {
    console.log(detailId);
    const MovieUrl = `https://api.themoviedb.org/3/movie/${detailId}?api_key=${API_KEY}&language=en-US`;
    const TvUrl = `https://api.themoviedb.org/3/tv/${detailId}?api_key=${API_KEY}&language=en-US`;
    handleFetch(movies ? MovieUrl : TvUrl);
  }, [detailId]);

  console.log(result, "it is null");

  return (
    <Container>
      <img
        style={{ width: "100%" }}
        src={`https://image.tmdb.org/t/p/w500${
          result.backdrop_path || result.poster_path
        }`}
        alt=""
      />
      <h1 className="pg-no">{result.name || result.original_title}</h1>
      <h4>Run time : {result.runtime || "unknown"} Min</h4>
      <ul>
        <strong>Genre </strong>
        {result.genres ? (
          result.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)
        ) : (
          <li>Genre unknown</li>
        )}
      </ul>
      <h3>Overview :-</h3>
      <br />
      <p>{result.overview}</p>
      <p>Languages : {result.original_language}</p>
      <h4>Popularity : {result.popularity}</h4>
      <Button onClick={handleClick} variant="contained" color="dark">
        <Link to="/wishlist">Add to Favorite</Link>
      </Button>
      &nbsp;&nbsp;
      <Button variant="contained" color="dark">
        <Link to="/">Back To Home</Link>
      </Button>
    </Container>
  );
}

export default CardDetail;
