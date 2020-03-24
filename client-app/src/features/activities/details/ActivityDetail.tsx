import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
// import moment from "jalali-moment";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import Common from "../../../app/helpers/common";

interface DetailParams {
  id: string;
}

const ActivityDetail: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id]);

  if (loadingInitial || !activity)
    return <LoadingComponent content="بارگذاری رویداد..." />;

  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${activity!.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{Common.ConvertGregorianToJalaliDate(activity.date)}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={3}>
          <Button
            as={Link}
            to={`/editActivity/${activity.id}`}
            basic
            color="blue"
            content="ویرایش"
          />
          <Button
            onClick={() => history.push("/activities")}
            basic
            color="grey"
            content="انصراف"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetail);
