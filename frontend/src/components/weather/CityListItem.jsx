const CityListItem = (props) => {
    return(<>
        <section className="flex w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 justify-center rounded-lg border-2 border-neutral-400 p-4">
            <section className="flex-1 text-center">
                <h2 className="p-2">{props.city.city}</h2>
                <h3 className="p-2">{props.city.state}</h3>
            </section>
            <section className="flex-1 text-center">
                <p className="p-2">{props.city.temp}&deg; F</p>
                <section className="flex">
                    <p className="flex-1 text-right p-2">{props.city.temp_min}&deg; F</p>
                    <p className="flex-1 text-left p-2">{props.city.temp_max}&deg; F</p>
                </section>
            </section>
        </section>
    </>);
}
export default CityListItem;