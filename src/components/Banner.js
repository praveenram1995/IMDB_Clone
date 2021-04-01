import React from "react";
import { Col, Row, Card, Image } from "react-bootstrap";

function Banner() {
  return (
    <Row>
      <Col sm={12} md={12} lg={12}>
        <Image
          fluid
          src="https://www.soda.com/wp-content/uploads/2020/03/IMDb-TV-1-600x361.jpg"
          alt=""
          style={{ width: "100vw", height: "50vh" }}
        />
      </Col>
    </Row>
  );
}

export default Banner;
