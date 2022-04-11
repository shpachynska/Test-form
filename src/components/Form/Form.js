import "antd/dist/antd.css";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Button, Select } from "antd";
import { useState } from "react";
import React from "react";
import styles from "./Form.module.css";
import RequiredInput from "./RequiredInput";
import TextInput from "./TextInput";
import MyDatePicker from "./DatePicker";

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
  const methods = useForm({ mode: "all" });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const date = useDatePicker();
  const select = useSelect();

  const { Option } = Select;

  const onSubmit = (data) => {
    data && date.checkDate && alert("Sukcess!");
  };

  return (
    <>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextInput selValue={select.selectValue} />
          <RequiredInput />
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

          {errors.randomText && select.selectValue === "C" && (
            <p>Nie spełnione kryteria</p>
          )}

          <MyDatePicker onChange={date.handleDatePick} />

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
      </FormProvider>
    </>
  );
}
