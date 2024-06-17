const City = (props) => {
    const { city, state } = props;
    return(<>
        <section className="flex flex-col items-center mt-16">
            <section className="flex flex-col items-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl pt-3 pb-1.5">50&deg; F</h1>
                <section className="flex flex-row text-xs gap-x-4">
                    <p>L: 25&deg; F</p>
                    <p>H: 75&deg; F</p>
                </section>
            </section>
            <h2 className="text-xl sm:text-2xl md:text-3xl py-3">{city}</h2>
            <h3 className="text-sm sm:text-base md:text-lg">{state}</h3>
        </section>
    </>);
}
export default City;