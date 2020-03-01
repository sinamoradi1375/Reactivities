import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import moment from "jalali-moment";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";

const ActivityDetail: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    selectedActivity: activity,
    openEditForm,
    cancelSelectedActivity
  } = activityStore;
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
          <span>
            {moment(activity!.date, "YYYY/MM/DD")
              .locale("fa")
              .format("YYYY/MM/DD")}
          </span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={3}>
          <Button
            onClick={() => openEditForm(activity!.id)}
            basic
            color="blue"
            content="ویرایش"
          />
          <Button
            onClick={() => cancelSelectedActivity()}
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
