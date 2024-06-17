const Container = (props) => {
    return(<>
        <article className="h-screen px-4">
            {props.children}
        </article>
    </>);
  }
  export default Container;