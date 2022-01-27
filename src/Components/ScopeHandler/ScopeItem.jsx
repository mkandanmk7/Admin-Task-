import { find } from "lodash";
import React from "react";
import { FormGroup } from "reactstrap";
import Checkbox from "../Inputs/Checkbox";

const ScopeItem = ({
  scopes,
  scope,
  onChange,
  forceChecked,
  selectedScopeCategories = [],
}) => {
  const { scopeIndex, item, resourceIndex } = scope;
  const { id, value, category, label, checked } = item;
  const handleChange = (data, e) => {
    onChange && onChange(data, e);
  };

  //readScope
  const isReadScope = () => {
    value === "read" && selectedScopeCategories.includes(category);
  };
  //writeScope
  const isWriteScope = () =>
    !!find(scopes, { category, value: "write", checked: true });

  //   isForceChecked ()
  const isForceChecked = () => {
    if (
      forceChecked ||
      (isReadScope() && !checked) ||
      (isReadScope() && isWriteScope())
    )
      return true;
    return false;
  };

  return (
    <FormGroup>
      <Checkbox
        label={label}
        id={id}
        name="scope"
        value={value}
        data={{ selectedScope: item, scopeIndex, resourceIndex }}
        onChange={handleChange}
        checked={checked}
        forceChecked={isForceChecked()}
      />
    </FormGroup>
  );
};

export default ScopeItem;
