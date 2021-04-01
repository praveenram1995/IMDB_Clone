import React, {useState, useEffect, useContext} from 'react'
import {Row, Col, Form, Container} from 'react-bootstrap'
import {API_KEY} from '../credentials'
import {Context} from '../Context'
import ResultCard from '../components/ResultCard'
import Banner from '../components/Banner'

function Home() {
    const [query, setQuery] = useState("")
    const {result, handleFetch, clickCard} = useContext(Context)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`
        handleFetch(url)
    }
    
    return (
        <>
        <Banner />
        <Form className="justify-content-md-center" onSubmit={handleSubmit}>
          <Form.Control
            color="dark"
            variant="dark"
            value={query}
            type="text"
            placeholder="Search Movies"
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form>
        <Container fluid className="justify-content-md-space-around">
          <Row>
            {result.map((movie) => (
              <ResultCard
                key={movie.id}
                movie={movie}
                style={{ padding: "4px" }}
                clickCard={clickCard(true)}
              />
            ))}
          </Row>
        </Container>
      </>
        
    )
}

export default Home
