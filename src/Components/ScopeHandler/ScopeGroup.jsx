import { get, map } from "lodash";
import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import predefinedScope from "../../Constant/PredefinedScope.json";

const ScopeGroup = ({ activeRole, onChange }) => {
  const [checkRole, setCheckRole] = useState(activeRole);
  console.log(checkRole);

  const handleChange = (e) => {
    console.log(e.target);
    let value = e.target.value;
    setCheckRole(value);
    onChange && onChange(get(predefinedScope, value), value);
  };
  useEffect(() => {
    setCheckRole(activeRole);
  }, [activeRole]);

  return (
    <div className="retainful-scope-group">
      <Form>
        {map(predefinedScope, (role, roleIndex) => {
          return (
            <FormGroup check inline key={"scopeGroup_" + roleIndex}>
              <Input
                type="checkbox"
                value={roleIndex}
                id={roleIndex}
                name={roleIndex}
                onChange={handleChange}
                checked={checkRole === roleIndex}
              />
              <Label>{role.name}</Label>
            </FormGroup>
          );
        })}
      </Form>
    </div>
  );
};

export default ScopeGroup;
