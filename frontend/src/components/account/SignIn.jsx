const SignIn = (props) => {
    return(<>
        <section>
            <p className="text-3xl">Sign In.</p>
        </section>
        <section className="pt-6 w-full">
            <form action="#" className="flex flex-col w-full gap-2">
                <input type="email" name="email" className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter your email address"/>
                <input type="password" name="password" className="py-1.5 pl-1.5 border-zinc-600 border-2 rounded-lg" placeholder="Enter your password"/>
                <button type="submit" className="py-2 border-2 rounded-lg bg-blue-500 text-slate-50">Sign In</button>
            </form>
        </section>
        <section className="p-6 cursor-pointer">
            <p onClick={props.handleClick} className="text-center">Don't have an account?</p>
        </section>
    </>);
}
export default SignIn;