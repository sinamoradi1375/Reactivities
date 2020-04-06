// import React, { useState } from "react";
// import DatePicker, { DayValue } from "react-modern-calendar-datepicker";
// import { FieldRenderProps } from "react-final-form";
// import { FormFieldProps, Form, Label } from "semantic-ui-react";

// interface IProps
//   extends FieldRenderProps<string, HTMLElement>,
//     FormFieldProps {}

// const DateInput: React.FC<IProps> = ({
//   input,
//   width,
//   type,
//   placeholder,
//   meta: { touched, error },
//   ...rest
// }) => {
//   const [selectedDay, setSelectedDay] = useState<DayValue>(null);

//   const renderCustomInput = ({ ref }: { ref: any }) => (
//     <input ref={ref} readOnly value={input.value} placeholder={placeholder} />
//   );

//   return (
//     <Form.Field error={touched && !!error} type={type} width={width}>
//       <DatePicker
//         value={selectedDay!}
//         onChange={input.onChange}
//         renderInput={renderCustomInput} // render a custom input
//         shouldHighlightWeekends
//         locale="fa"
//         calendarClassName="responsive-calendar"
//         {...rest}
//       />
//       {touched && error && (
//         <Label basic color="red">
//           {error}
//         </Label>
//       )}
//     </Form.Field>
//   );
// };

// export default DateInput;

import React, { useState } from "react";
import DatePicker, { DayValue } from "react-modern-calendar-datepicker";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const DateInput: React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  meta: { touched, error },
}) => {
  const [selectedDay, setSelectedDay] = useState<DayValue>(null);

  const renderCustomInput = ({ ref }: { ref: any }) => (
    <input
      ref={ref}
      {...input}
      readOnly
      value={
        selectedDay
          ? `${selectedDay.year}/${selectedDay.month}/${selectedDay.day}`
          : ""
      }
      placeholder={placeholder}
    />
  );

  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <DatePicker
        value={selectedDay!}
        onChange={setSelectedDay}
        renderInput={renderCustomInput} // render a custom input
        shouldHighlightWeekends
        locale="fa"
        calendarClassName="responsive-calendar"
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
