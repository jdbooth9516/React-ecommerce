import React from "react";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import useForm from "../UseForm/useForm";
import "./searchBar.css";

const SearchBar = (props) => {
  const { values, handleChange, handleSubmit } = useForm(searchProducts);

  function searchProducts() {
    props.searchProducts(values.searchInput);
  }

  return (
    <div className="searchBar">
      <form className="search-form" onSubmit={handleSubmit}>
        <button className="search-btn" type="submit">
          <FindInPageIcon aria-label="search" />
        </button>
        <label className="search-label">
          <input
            className="search-bar"
            type="text"
            name="searchInput"
            placeholder="Search products..."
            onChange={handleChange}
            value={values.searchInput}
            required={true}
          />
        </label>
      </form>
    </div>
  );
};

export default SearchBar;
