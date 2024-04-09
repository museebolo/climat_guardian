import { FormEvent, useState } from "react";
import {SampleContext} from "@/contexts/SampleContext.tsx";


export default function LoginElement() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken]= useState('')
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
                console.log(reponse)
                if (reponse.error) {
                    setError(reponse.error);
                }if (reponse.token){
                    SampleContext.token = reponse.token
                    console.log(SampleContext.token)
                }
            })
            .catch(e => {
                console.log(e)
            });
    };

    return (
        <>
            <section className="h-screen">
                <div className="flex h-full items-center justify-center">
                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12 shadow-2xl p-12 bg-white rounded-xl  dark:text-white     dark:bg-slate-800">
                        <form method="get"  onSubmit={submit}>
                            <div className=" dark:bg-slate-800 relative mb-6">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className=" dark:bg-slate-800 peer block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none"
                                    placeholder="Nom d'utilisateur"
                                />
                            </div>
                            <div className="relative mb-6">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className=" dark:bg-slate-800 block min-h-[auto] w-full rounded border-0 px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear motion-reduce:transition-none"
                                    placeholder="Mot de passe"
                                />
                            </div>
                            <button
                                type="submit"
                                className="  dark:text-white  shadow-lg bg-black inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-black"
                                data-te-ripple-init
                                data-te-ripple-color="light"
                            >
                                Se connecter
                            </button>
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
