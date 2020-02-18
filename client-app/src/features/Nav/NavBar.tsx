import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  handleOpenCreateForm: () => void;
}

export const NavBar: React.FC<IProps> = ({ handleOpenCreateForm }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginLeft: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="رویدادها" />
        <Menu.Item>
          <Button
            onClick={handleOpenCreateForm}
            positive
            content="ایجاد رویداد"
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};
