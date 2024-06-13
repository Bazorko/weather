const Modal = (props) => {
    return(<>
        <article onClick={ event => {
            props.handleClick();
        }} className="h-screen absolute left-0 w-screen bg-opacity-60 bg-gray-400 flex flex-col justify-center items-center">
            <section onClick={event => {
                event.stopPropagation();
            }} className="bg-slate-50 lg:px-24 rounded-lg w-11/12 md:w-3/6 p-6">
                {props.children}
            </section>
        </article>
    </>);
}
export default Modal;