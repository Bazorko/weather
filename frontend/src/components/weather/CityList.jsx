import CityListItem from "./CityListItem";
const CityList = (props) => {
    return(<>
        {props.citiesArray && props.citiesArray.map(city => {
            return(<CityListItem key={city._id} id={city._id} city={city.city} stateAbbr={"NY"} citiesArray={props.citiesArray} setCitiesArray={props.setCitiesArray}/>);
        })}
    </>);
}
export default CityList;