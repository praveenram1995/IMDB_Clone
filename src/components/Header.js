import React from "react";
import { Navbar, Nav, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import InnerNav from "../components/InnerNav";
import { auth } from "../firebase";

function Header({ user }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" fluid>
        <Link to="/">
          <Navbar.Brand>IMDB</Navbar.Brand>
        </Link>
        <Nav className="ml-auto">
          <Nav.Link>
            <Button variant="dark">
              <Link to="/">Search Movie/TV show</Link>
            </Button>
          </Nav.Link>
          <Nav.Link>
            <Button variant="dark">
              <Link to="/wishlist">Wishlist</Link>
            </Button>
          </Nav.Link>
          <Nav.Link>
            <Button
              disabled={!user}
              variant="dark"
              onClick={() => auth.signOut()}
            >
              Sign Out
            </Button>
          </Nav.Link>
        </Nav>
      </Navbar>
      <InnerNav userName={user.displayName} />
    </>
  );
}

export default Header;
