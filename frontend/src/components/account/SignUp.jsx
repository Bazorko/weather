const SignUp = (props) => {
    return(<>
        <section>
            <p className="text-3xl">Sign Up.</p>
        </section>
        <section className="pt-6 w-full">
            <form action="#" className="flex flex-col w-full gap-2">
                <div className="flex flex-col md:flex-row gap-2">
                    <input type="text" name="firstName" className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg w-full md:w-3/6" placeholder="Enter your first name"/>
                    <input type="text" name="lastName" className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg w-full md:w-3/6" placeholder="Enter your last name"/>
                </div>
                <input type="email" name="email" className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter your email address"/>
                <input type="password" name="password" className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter your password"/>
                <button type="submit" className="py-2 border-2 rounded-lg bg-blue-500 text-slate-50">Sign In</button>
            </form>
            <p onClick={props.handleClick} className="p-5 text-center">Already have an account?</p>
        </section>
    </>);
}
export default SignUp;