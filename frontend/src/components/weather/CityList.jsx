import CityListItem from "./CityListItem";
const CityList = (props) => {
    return(<>
        {props.displayCities.map((city, index) => {
            return (
                <CityListItem key={index} city={city}/>
            );
        })}
    </>);
}
export default CityList;