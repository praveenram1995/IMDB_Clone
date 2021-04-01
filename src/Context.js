import React, { useState } from "react";

const Context = React.createContext();

const ContextProvider = (props) => {
  const [result, setResult] = useState([]);
  const [movies, setMovies] = useState(true);

  const handleFetch = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    if (!data.errors) {
      setResult(data.results);
    } else {
      setResult([]);
    }
  };

  const clickCard = (some) => {
    setMovies(some);
  };

  return (
    <Context.Provider value={{ result, handleFetch, movies, clickCard }}>
      {props.children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
