import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

//the main interface that neil wrote
// interface IProps extends FieldRenderProps<string, HTMLInputElement>, FormFieldProps {}
interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const TextInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
}) => {
  //M11 E3 M3 explaining two exclamation marks
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <input {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
