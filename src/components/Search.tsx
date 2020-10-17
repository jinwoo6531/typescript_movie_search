import React,{useState} from 'react'

interface SearchProps {
    search: (searchValue:string) => void;
}

function Search(props:SearchProps) {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }

    const resetInputField = () => {
        setSearchValue("");
    }

    const callSearchFunction = (event:React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        event.preventDefault();
        props.search(searchValue);
        resetInputField();
    }
    return (
        <form className="search">
            <input
                value={searchValue}
                onChange={handleSearchInputChanges}
                type="text"
            />
            <input onClick={callSearchFunction} type="submit" value="SEARCH" />
        </form>
    )
}

export default Search
