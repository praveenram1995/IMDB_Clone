import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import ResultCard from "./ResultCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import { API_KEY } from "../credentials";

function TopTv() {
  const { clickCard } = useContext(Context);

  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    handleFetch(url);
  }, [page]);

  return (
    <>
      <Container fluid="true" className="justify-content-md-space-around">
        <h3 className="pg-no">Page {page}</h3>
        <Row>
          {result.map((movie) => (
            <ResultCard
              key={movie.id}
              movie={movie}
              clickCard={clickCard(false)}
            />
          ))}
        </Row>
        <Row>
          <Col className="pg-no">
            <Button
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              {"<< prev"}
            </Button>
            <Button
              disabled={page >= 20}
              onClick={() => setPage((prev) => prev + 1)}
            >
              {"next >>"}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TopTv;
