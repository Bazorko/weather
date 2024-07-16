import { useFetchCities } from "../../hooks/useFetchCities";
import CityListItem from "./CityListItem";
const CityList = (props) => {
    const { cities, loading, error } = useFetchCities(props.username);
        return(<>
            {cities && cities.map((city, index) => {
                return(<CityListItem key={index} city={city} stateAbbr={"NY"}/>);
            })}
        </>);
}
export default CityList;