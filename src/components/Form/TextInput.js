import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "antd";
import "antd/dist/antd.css";
import styles from "./Form.module.css";

export default function TextInput(selValue) {
  const methods = useFormContext();
  return (
    <>
      <Controller
        name="randomText"
        control={methods.control}
        rules={
          selValue.selValue === "C"
            ? { pattern: /^[A-Za-z]+$/i, minLength: 5 }
            : { pattern: /^[A-Za-z]+$/i, minLength: "none" }
        }
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
