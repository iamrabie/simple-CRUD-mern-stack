import {useState} from 'react';

const SearchField = ({onSearch}) => {


    const [search , setSearch] = useState('');


    const handleSearch = (e) => {

      setSearch(e.target.value);
      onSearch(e.target.value);

    }



    return(
        <>
    
        <input
          type="text"
          className="bg-default px-3 rounded-lg outline-none placeholder:text-sm w-[335px]  "
          placeholder="Search by Keyword"
          onChange={handleSearch}
          value={search}
          // onKeyDown={handleKeyPress}
          autoFocus={false}
        />
        </>
    );
}


export default SearchField;