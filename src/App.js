import "./App.css";
import "antd/dist/antd.css";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { Button, DatePicker, Select, Input, Dropdown } from "antd";
import { useState } from "react";
import React from "react";
import MyInput from "./components/Input/Input";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      randomText: "",
      requiredText: "",
    },
  });

  const [selectValue, setSelectValue] = useState(null);
  const [checkDate, setCheckDate] = useState(true);

  const randomText = watch("randomText");
  const requiredText = watch("requiredText");

  const handleSelectChange = (event) => setSelectValue(event.target.value);

  const currentDate = new Date().toISOString().slice(0, 10);
  const handleDatePick = (date, dateString) =>
    setCheckDate(currentDate <= dateString);

  const { Option } = Select;

  return (
    <div className="App">
      <h1>Test form</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log("data", data);
        })}
      >
        <input
          {...register("randomText", {
            minLength: {
              value: 5,
              message: "Value doesn't meet the requirements",
            },
          })}
          placeholder="Enter your text here"
          style={{ width: "300px" }}
        />

        <input
          {...register("requiredText", { required: "This is required" })}
          placeholder="Field is required"
          style={{ width: "300px" }}
        />
        <p>{errors.requiredText?.message}</p>

        <select
          {...register("dropdown")}
          style={{ width: 250 }}
          onChange={handleSelectChange}
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        {selectValue === "C" && <p>{errors.randomText?.message}</p>}

        <DatePicker {...register("datePicker")} onChange={handleDatePick} />
        <Button
          type="primary"
          htmlType="submit"
          style={
            checkDate
              ? {
                  backgroundColor: "#08e672",
                  borderColor: "#08e672",
                }
              : {
                  backgroundColor: "#efc41a",
                  borderColor: "#efc41a",
                }
          }
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default App;
