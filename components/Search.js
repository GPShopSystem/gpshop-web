import React from 'react';
import { Search as SearchIcon } from 'react-feather'

const Search = ({
    name,
    placeholder,
    icon,
    ...props
}) => {
    return ( 
        <div className="searchBox">
            {icon && <SearchIcon />}
            <input
                name={name}
                type="search"
                placeholder={placeholder}
                {...props}
            />
        </div>
     );
}
 
export default Search;