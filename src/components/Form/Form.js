import "antd/dist/antd.css";
import { useForm, Controller } from "react-hook-form";
import { Button, DatePicker, Select, Input, Dropdown } from "antd";
import { useState } from "react";
import React from "react";
import styles from "./Form.module.css";

const useDatePicker = () => {
  const [checkDate, setCheckDate] = useState(true);
  const currentDate = new Date().toISOString().slice(0, 10);
  const handleDatePick = (date, dateString) =>
    setCheckDate(currentDate <= dateString);

  return { checkDate, handleDatePick };
};

const useSelect = () => {
  const [selectValue, setSelectValue] = useState(null);
  const handleSelectChange = (value) => setSelectValue(value);

  return { selectValue, handleSelectChange };
};

export default function Form() {
  const date = useDatePicker();
  const select = useSelect();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      randomText: "",
      requiredText: "",
    },
  });

  const { Option } = Select;

  const onSubmit = (data) => {
    data && date.checkDate && alert("Sukcess!");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="randomText"
        control={control}
        rules={{ minLength: 5 }}
        render={({ field }) => (
          <Input
            {...field}
            style={{ width: "300px" }}
            placeholder="Enter your text here"
            className={styles.formElement}
          />
        )}
      />

      <Controller
        name="requiredText"
        control={control}
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

      {errors.requiredText && <p>To pole jest wymagane</p>}

      <Controller
        name="dropdown"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            onChange={select.handleSelectChange}
            style={{ width: 250 }}
            placeholder="Choose an option"
            className={styles.formElement}
          >
            <Option value="A">A</Option>
            <Option value="B">B</Option>
            <Option value="C">C</Option>
          </Select>
        )}
      />

      {select.selectValue === "C" && errors.randomText && (
        <p>Nie spełnione kryteria</p>
      )}

      <DatePicker
        {...register("datePicker")}
        className={styles.formElement}
        onChange={date.handleDatePick}
      />

      <Button
        type="primary"
        htmlType="submit"
        style={
          date.checkDate
            ? { backgroundColor: "#08e672" }
            : { backgroundColor: "#efc41a" }
        }
      >
        Submit
      </Button>
    </form>
  );
}
