import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteChildrenProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import { TextAreaInput } from "../../../app/common/form/TextAreaInput";
import { SelectInput } from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteChildrenProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
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
    activity.id.length,
  ]);

  // const handleSubmit = () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = {
  //       ...activity,
  //       id: uuid()
  //     };

  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     );
  //   } else {
  //     editActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     );
  //   }
  // };

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="title"
                  placeholder="عنوان"
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  name="description"
                  placeholder="توضیحات"
                  value={activity.description}
                  component={TextAreaInput}
                  rows={3}
                />
                <Field
                  name="category"
                  placeholder="دسته بندی"
                  value={activity.category}
                  component={SelectInput}
                  options={category}
                />

                <Field component={DateInput} name="date" placeholder="تاریخ" />
                <Field
                  component={TextInput}
                  name="city"
                  placeholder="شهر"
                  value={activity.city}
                />
                <Field
                  component={TextInput}
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
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
