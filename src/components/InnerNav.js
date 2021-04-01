import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header({ userName }) {
  return (
    <>
      <Navbar bg="light" variant="primary" fluid>
        <Nav m-auto>
          <Nav.Link>
            <Link to="/user/movies">
              <Button variant="light">Movies</Button>
            </Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/user/shows">
              <Button variant="light">Tv Shows</Button>
            </Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/user/topmovies">
              <Button variant="light">Top Movies</Button>
            </Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/user/topshows">
              <Button variant="light">Top Tv Shows</Button>
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar>
      <p>
        welcome, <i>{userName}</i>
      </p>
    </>
  );
}

export default Header;
