import { useState } from "react";
import { Link } from "react-router-dom";
const SearchForCity = () => {
    const [inputValue, setInputValue] = useState("");
    const stateAbbr = "NY";
    const stateFull = "New York";
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }
    return(<>
        <form className="flex flex-row justify-center">
            <input type="text" placeholder="Enter a city" value={inputValue} onChange={handleInputChange} className="py-2 pl-1 border-2 border-slate-50 w-96 rounded-l-lg"/>
            <Link className="w-28 p-1 py-2 bg-slate-50 border-blue-500 border-l-2 text-neutral-600 text-center rounded-r-lg" to={`../weather/${inputValue}/${stateAbbr}/${stateFull}`}>Search</Link>
        </form>
    </>);
}
export default SearchForCity;