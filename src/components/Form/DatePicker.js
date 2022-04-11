import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import styles from "./Form.module.css";

export default function MyDatePicker(handleDatePick) {
  const methods = useFormContext();
  return (
    <>
      <Controller
        name="datePicker"
        control={methods.control}
        render={({ field }) => (
          <DatePicker
            {...field}
            style={{ width: "250px" }}
            onChange={handleDatePick.onChange}
            className={styles.formElement}
          />
        )}
      />
    </>
  );
}
