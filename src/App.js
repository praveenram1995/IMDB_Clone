import React, { Component } from "react";
import Header from "./components/Header";
import { Container, Image, Row, Col } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Popular from "./components/Popular";
import PopularTv from "./components/PopularTv";
import TopMovies from "./components/TopMovies";
import TopTv from "./components/TopTv";
import CardDetail from "./components/CardDetail";
import { signInWithGoogle, auth } from "./firebase";
import Wishlist from "./components/Wishlist";

class App extends Component {
  state = {
    user: null
  };

  unsubscribe = null;

  componentDidMount = () => {
    this.unsubscribe = auth.onAuthStateChanged((user) => {
      this.setState({ user: user });
    });
  };
  render() {
    const { user } = this.state;
    console.log(user);
    return (
      <div>
        {user === null ? (
          <Row>
            <Col sm={12} md={12} lg={12} className="pg-no">
              <Image
                fluid
                src="https://www.soda.com/wp-content/uploads/2020/03/IMDb-TV-1-600x361.jpg"
                alt=""
                style={{ width: "100vw", height: "70vh" }}
              />
              <h1>Sign In To Start</h1>
              <Button
                variant="contained"
                color="primary"
                onClick={signInWithGoogle}
              >
                Sign In With Google
              </Button>
            </Col>
          </Row>
        ) : (
          <Container fluid="true">
            <Header user={user} />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/user/movies">
                <Popular />
              </Route>
              <Route exact path="/user/shows">
                <PopularTv />
              </Route>
              <Route exact path="/user/topmovies">
                <TopMovies />
              </Route>
              <Route exact path="/user/topshows">
                <TopTv />
              </Route>
              <Route path="/user/:detailId">
                <CardDetail user={user} />
              </Route>
              <Route exact path="/wishlist">
                <Wishlist user={user} />
              </Route>
            </Switch>
          </Container>
        )}
      </div>
    );
  }
}

export default App;
