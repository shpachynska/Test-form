import "antd/dist/antd.css";
import { useFormContext } from "react-hook-form";
import { Button } from "antd";

export default function SubmitButton() {
  const { register } = useFormContext();
  return (
    <Button
      {...register("submitButton")}
      type="primary"
      htmlType="submit"
      style={{
        backgroundColor: "#08e672",
        borderColor: "#08e672",
      }}
    >
      Submit
    </Button>
  );
}
