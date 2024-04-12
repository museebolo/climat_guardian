import {useState} from "react";
import {SampleContext} from "@/contexts/SampleContext.tsx";
import {getToken} from "@/contexts/lib.tsx";

export default function AddRoomElement() {
    const apiAuthToken = getToken();

    const [roomName, setRoomName] = useState('');

    const [newIp, setNewIp] = useState('');

    const addRoom = () => {
        fetch(`${SampleContext.urlData}/esp`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiAuthToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ip: newIp,
                name: roomName
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête');
                }
                console.log('Requête POST réussie');
            })
            .catch(error => {
                console.error('Une erreur s\'est produite:', error);
            });
        setNewIp("")
        setRoomName("")
    };

    return (
        <>
            <form className="flex gap-8 h-8" onSubmit={(e) => {
                e.preventDefault();
                addRoom();
            }}>
                <input
                    value={roomName}
                    autoComplete={"roomName"}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="mt-5 tracking-wide font-semibold text-white-500 w-full px-4 py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    type="text" placeholder="Room name"/>

                <input
                    value={newIp}
                    autoComplete={"newIp"}
                    onChange={(e) => setNewIp(e.target.value)}
                    className="mt-5 tracking-wide font-semibold text-white-500 w-full px-4 py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    type="text" placeholder="New IP"/>

                <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-blue-400 text-white-500 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                    Add a room
                </button>
            </form>
        </>
    )
}
