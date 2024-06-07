const Container = (props) => {
    return(<>
        <div className="h-screen px-4">
            {props.children}
        </div>
    </>);
  }
  export default Container;