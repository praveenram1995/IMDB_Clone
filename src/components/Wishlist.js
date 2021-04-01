import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { db } from "../firebase";
import WishlistCard from "./wishlistCard";
import { Row, Container } from "react-bootstrap";

const Wishlist = ({ user }) => {
  const [wishlist, setWishlist] = useState([]);
  const uid = user.uid;

  useEffect(() => {
    db.collection(`${uid}`)
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setWishlist(
          snapshot.docs.map((doc) => {
            console.log(doc.data(), "in useeffect");
            return {
              id: doc.id,
              wishlist: doc.data().wishlist
            };
          })
        );
      });
  }, [uid]);

  console.log(wishlist.wishlist, "wishlist is null");
  return (
    <Container>
      <h1 className="pg-no">{user.displayName}'s Wishlist/Favorites</h1>
      <Row>
        {wishlist.map((movie) => (
          <WishlistCard
            key={movie.id}
            id={movie.id}
            movie={movie.wishlist}
            uid={uid}
          />
        ))}
      </Row>
    </Container>
  );
};
export default Wishlist;
