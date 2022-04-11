import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "antd";
import "antd/dist/antd.css";
import styles from "./Form.module.css";

export default function RequiredInput() {
  const methods = useFormContext();
  return (
    <>
      <Controller
        name="requiredText"
        control={methods.control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            {...field}
            style={{ width: "300px" }}
            placeholder="Enter your text here"
            className={styles.formElement}
          />
        )}
      />
    </>
  );
}
