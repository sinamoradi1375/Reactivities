import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteChildrenProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteChildrenProps<DetailParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: ""
  });

  const matchParamsId = match?.params.id;

  useEffect(() => {
    if (matchParamsId && activity.id.length === 0) {
      loadActivity(matchParamsId).then(() => {
        initialFormState && setActivity(initialFormState);
      });
    }

    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    match,
    clearActivity,
    matchParamsId,
    initialFormState,
    activity.id.length
  ]);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };

      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name="title"
          placeholder="عنوان"
          value={activity.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name="description"
          rows={2}
          placeholder="توضیحات"
          value={activity.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name="category"
          placeholder="دسته بندی"
          value={activity.category}
        />
        <Form.Input
          onChange={handleInputChange}
          name="date"
          type="datetime-local"
          placeholder="تاریخ"
          style={{ direction: "ltr" }}
          value={activity.date}
        />
        <Form.Input
          onChange={handleInputChange}
          name="city"
          placeholder="شهر"
          value={activity.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name="venue"
          placeholder="محل برگذاری"
          value={activity.venue}
        />
        <Button
          loading={submitting}
          positive
          floated="right"
          type="submit"
          content="ثبت"
        />
        <Button
          onClick={() => history.push("/activities")}
          floated="right"
          type="button"
          content="انصراف"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
