import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        نتیجه مورد نظر یافت نشد !
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities" primary>
          بازگشت به صفحه رویداد ها
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
