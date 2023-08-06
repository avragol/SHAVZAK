import { Link } from 'react-router-dom';

const NoAccessPage = () => {

    return (
        <div className="flex flex-col items-center justify-center h-screen">

            <h1 className="text-9xl font-bold text-mainCustomColor">403</h1>

            <p className="mt-4 text-3xl text-center">
                Sorry, you don't have access to this page.
            </p>

            <p className="mt-2 text-center text-gray-500">
                Please <Link to="/" className="text-mainCustomColor font-bold">go back to home page</Link> or <Link to="/login" className="text-mainCustomColor font-bold">log in</Link> to your account.
            </p>

        </div>
    );
}

export default NoAccessPage;