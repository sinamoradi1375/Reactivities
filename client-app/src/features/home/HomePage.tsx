import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <Container style={{ marginTop: "7em" }}>
      <h1>خانه</h1>
      <h3>رفتن به <Link to="/activities">رویدادها</Link></h3>
    </Container>
  );
};
