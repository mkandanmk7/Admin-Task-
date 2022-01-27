import React from "react";
import { FormGroup } from "reactstrap";
import Checkbox from "../Inputs/Checkbox";

const Resource = ({ resource, onChange }) => {
  //   console.log(resource);
  const { resourceIndex, id, checked } = resource;

  const handleChange = (data, e) => {
    onChange && onChange(data, e);
  };

  return (
    <FormGroup>
      <Checkbox
        id={id}
        label={resourceIndex}
        checked={checked}
        name="resource"
        onChange={handleChange}
        data={{ resourceIndex }}
      />
    </FormGroup>
  );
};

export default Resource;
