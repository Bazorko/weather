import { Link } from "react-router-dom";
import Container from "../utils/Container.jsx";
const Error = (props) => {
    console.log(props.error);
    localStorage.removeItem("username");
    return(<>
        <section className="h-screen bg-blue-500">
            <Container>
                <section className="h-screen flex flex-col items-center justify-center">
                    <h2 className="text-slate-50">An error occured :c</h2>
                    <p></p>
                    <p className="text-slate-50"><Link to={"/"} className="underline">Click here</Link> to return to the home page.</p>
                </section>
            </Container>
        </section>
    </>);
  }
  export default Error;