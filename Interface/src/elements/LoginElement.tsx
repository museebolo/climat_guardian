import {FormEvent, useState} from "react";
import {SampleContext} from "@/contexts/SampleContext.tsx";

export default function LoginElement() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await fetch(`${SampleContext.urlLogin}/login.php?username=${username}&password=${password}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(reponse => {
                if (reponse.error) {
                    setError(reponse.error);
                }
                if (reponse.token) {
                    localStorage.setItem('token', reponse.token);
                    localStorage.setItem('username', username);
                    window.location.replace("http://localhost:5173/dashboard");
                }
            })
            .catch(e => {
                console.log(e)
            });
    };

    return (
        <>
            <div className="w-full min-h-screen text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div>
                            <img src="https://www.museebolo.ch/wp-content/uploads/2023/12/Musee_Bolo_Logo.png"
                                 className="w-mx-auto" alt="logo musée bolo"/>
                        </div>
                        <div className="mt-12 flex flex-col items-center">



                                <form method="get" onSubmit={submit} className="mx-auto max-w-xs">
                                    <input
                                        value={username}
                                        autoComplete={"username"}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="text" placeholder="username"/>
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password"
                                        placeholder="Password"
                                    />

                                    <button
                                        className="mt-5 tracking-wide font-semibold bg-blue-400 text-white-500 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <span className="">
                                Sign In
                            </span>
                                    </button>
                                </form>
                                {error && <p className="text-red-500 mt-2">{error}</p>}
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}
