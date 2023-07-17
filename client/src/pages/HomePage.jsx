const HomePage = () => {
    return (
        <div className="text-center">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-textColor sm:text-6xl">
                        Welcome To SHAVZAK!
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                        fugiat veniam occaecat fugiat aliqua.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a href="/about" className="button bg-mainCustomColor hover:bg-mainCustomColorHover text-white hover:outline outline-2 outline-mainCustomColor">
                            About
                        </a>
                        <a href="/register" className="button leading-6 text-mainCustomColor hover:outline outline-2 outline-mainCustomColor">
                            Register <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;