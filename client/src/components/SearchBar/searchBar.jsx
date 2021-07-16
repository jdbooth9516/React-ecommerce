import React, {useEffect} from 'react';
import { values } from 'regenerator-runtime';
import useForm from '../UseForm/useForm';

const SearchBar = (props) => {
    const { values, handleChange, handleSubmit } = useForm(searchProducts)

    function searchProducts(){
        props.searchProducts(values.searchInput);
    }

    return (
        <div className="searchBar">
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="searchInput"
                        placeholder="Search products..."
                        onChange={handleChange}
                        value={values.searchInput}
                        required={true}
                    />
                </label>
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchBar;