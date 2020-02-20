import React, { SyntheticEvent } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import moment from "jalali-moment";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  submitting: boolean;
  target: string;
}

export const ActivityList: React.FC<IProps> = ({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
  target
}) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>
                {moment(activity.date, "YYYY/MM/DD")
                  .locale("fa")
                  .format("YYYY/MM/DD")}
              </Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.venue} , {activity.city}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectActivity(activity.id)}
                  floated="right"
                  content="جزئیات"
                  color="blue"
                ></Button>
                <Button
                  name={activity.id}
                  onClick={e => deleteActivity(e, activity.id)}
                  loading={target === activity.id && submitting}
                  floated="right"
                  content="حذف"
                  color="red"
                ></Button>
                <Label basic content={activity.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
