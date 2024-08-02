import CityListItem from "./CityListItem";
const CityList = (props) => {
    return(<>
        {props.citiesArray && props.citiesArray.map(city => {
            return(<CityListItem key={city._id} city={city.city} stateAbbr={"NY"}/>);
        })}
    </>);
}
export default CityList;