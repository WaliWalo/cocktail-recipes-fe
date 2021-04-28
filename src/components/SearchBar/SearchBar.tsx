import React from "react";
import {
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import "./styles.css";

function SearchBar() {
  return (
    <div id="searchForm">
      <InputGroup>
        <FormControl
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="Search"
        />
        <InputGroup.Prepend>
          <Form.Control as="select">
            <option>Cocktail</option>
            <option>Ingredient</option>
          </Form.Control>
        </InputGroup.Prepend>
      </InputGroup>
    </div>
  );
}

export default SearchBar;
