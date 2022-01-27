import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "reactstrap";
import ScopeGroup from "./Components/ScopeHandler/ScopeGroup";
import Permission from "./Constant/Permission.json";
import { useCallback, useState } from "react";
import { map } from "lodash";
import FormWrapper from "./Components/ScopeHandler/FormWrapper";
import Resource from "./Components/ScopeHandler/Resource";
import ScopeWrapper from "./Components/ScopeHandler/ScopeWrapper";
import ScopeItem from "./Components/ScopeHandler/ScopeItem";

function App() {
  const [resources, setResources] = useState(Permission);
  const [selectedScopeCategories, setSelectedScopeCategories] = useState([]);
  const [activeRole, setActiveRole] = useState();

  const setPredefinedScopeStatus = (role) => {
    console.log("in status");
    const cacheResources = { ...resources };

    map(role.resources, (predefinedResource) => {
      const activeResource = cacheResources[predefinedResource.id];
      console.log(activeResource);

      if (!activeResource) return;

      const hasScope = (scope) =>
        predefinedResource.scopes.indexOf(scope) !== -1;

      activeResource.checked = hasScope("*") ? true : false;

      map(activeResource.scopes, (scope) => {
        if (hasScope("*") || hasScope(scope.id)) scope.checked = true;
        else scope.checked = false;
      });
    });

    setResources(cacheResources);
  };

  //get selected  Categories
  const getSelectedCategories = () => {
    let categories = [];
    map(resources, (resource) => {
      map(resource.scopes, (scope) => {
        if (!categories.includes(scope.category) && scope.checked)
          categories.push(scope.category);
      });
    });
    console.log(categories);
    return categories;
  };
  // resouce Click handler
  const resourceClickHandler = useCallback(
    (data) => {
      const { resourceIndex } = data;
      let cacheResources = { ...resources };

      cacheResources[resourceIndex].checked = !resources[resourceIndex].checked;
      setResources({ ...cacheResources });
    },
    [resources]
  );

  //ScopeClick handler
  const scopeClickHandler = useCallback(
    (data) => {
      clearActiveRole();
      const cacheResources = { ...resources };
      console.log(data);
      const { scopeIndex, resourceIndex, selectedScope } = data;
      if (!selectedScope) return;
      cacheResources[resourceIndex].scopes[scopeIndex].checked =
        !selectedScope.checked;
      setResources({ ...cacheResources });
      let categories = getSelectedCategories();
      console.log(categories);
      setSelectedScopeCategories(categories);
    },
    [resources]
  );

  const clearActiveRole = () => {
    setActiveRole(null);
  };
  const ScopeGroupChangeHandler = useCallback((role, activeRole) => {
    console.log(role);
    setActiveRole(activeRole);
    setPredefinedScopeStatus(role);
  }, []);

  return (
    <div className="container">
      <Row>
        <Col>
          <ScopeGroup
            activeRole={activeRole}
            onChange={ScopeGroupChangeHandler}
          />
        </Col>
        <FormWrapper>
          {map(resources, (resource, resourceIndex) => {
            return (
              <div key={resourceIndex}>
                <Resource
                  resource={{ ...resource, resourceIndex }}
                  onChange={resourceClickHandler}
                />
                {map(resource.scopes, (scope, scopeIndex) => {
                  return (
                    <ScopeWrapper key={scopeIndex}>
                      <ScopeItem
                        scope={{
                          item: scope,
                          scopeIndex,
                          resourceIndex,
                        }}
                        scopes={resource.scopes}
                        forceChecked={resource.checked}
                        onChange={scopeClickHandler}
                        selectedScopeCategories={selectedScopeCategories}
                      />
                    </ScopeWrapper>
                  );
                })}
              </div>
            );
          })}
        </FormWrapper>
      </Row>
    </div>
  );
}

export default App;
