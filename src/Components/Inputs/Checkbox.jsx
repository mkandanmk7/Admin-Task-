import React from "react";
import { Input, Label } from "reactstrap";

const Checkbox = ({
  label,
  data,
  onChange,
  name,
  id,
  checked,
  forceChecked,
}) => {
  const isChecked = () => {
    return forceChecked ? forceChecked : !!checked;
  };
  return (
    <Label>
      <Input
        type="checkbox"
        onChange={(e) => onChange(data, e)}
        checked={isChecked()}
        value={id}
        name={name}
        disabled={forceChecked}
      />
      {label}
    </Label>
  );
};

export default Checkbox;
