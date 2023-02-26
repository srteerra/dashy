import { useState } from 'react';
import {Modal, ModalClose} from '../Modal';
import { useDashy } from '../../hooks/dashy';
import { client } from "../../../lib/sanityClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactsModal = ({ ContactsModalOpen, setContactsModalOpen, setUserName }) => {
    const {userAddress, userName} = useDashy();
    const [newUsername, setNewUsername] = useState("")

    const success = () => toast.success('New friend added', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    const friends = [
        {
            id: 1,
            avatar: 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png',
            name: "DaC7EXBytSgz7EXBytSgz...",
        },
        {
            id: 2,
            avatar: 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png',
            name: "DaC7EXBytSgz7EXBytSgz...",
        },
        {
            id: 3,
            avatar: 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png',
            name: "DaC7EXBytSgz7EXBytSgz...",
        },
        {
            id: 4,
            avatar: 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png',
            name: "DaC7EXBytSgz7EXBytSgz...",
        },
        {
            id: 5,
            avatar: 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png',
            name: "DaC7EXBytSgz7EXBytSgz...",
        } 
    ]

    const onAdd = () => {
        if(newUsername !== "") {
            client.patch(userAddress).set({ userName: newUsername }).commit().then((updatedAcc) => {
                console.log("Hurray, new frien added:");
                console.log(updatedAcc);
                console.log(updatedAcc.userName);
                setUserName(updatedAcc.userName)
                success();
            });
        }

        setContactsModalOpen(false);
    }

    return (
        <ModalClose modalOpen={ContactsModalOpen} setModalOpen={setContactsModalOpen}>
            <div>
                <div>
                    <h1 className='font-bold text-xl'>Friends list</h1>
                </div>
                <div className='w-full max-h-[200px] overflow-scroll my-5 border-2'>
                    {friends.map((friend) => (
                        <div key={friend.id} className="flex items-center text-slate-500 h-12 justify-between px-3 my-2 shadow hover:bg-slate-100">
                            <img src={friend.avatar} className='w-[40px]' alt="avatar" />
                            <p>{ friend.name }</p>
                        </div>
                    ))}
                </div>

                <div className='my-10'>
                    <label htmlFor="newUsername">New friend</label>
                    <div className="flex rounded-lg border mt-2 border-gray-200 p-4">
                        <input className="w-full pl-2 font-medium text-gray-600 placeholder-gray-300 outline-none" id="newUsername" name="newUsername" type="text" placeholder={"DaC7EXBytSgz..."} value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
                    </div>
                </div>

                <div className="flex w-full space-x-1">
                    <button onClick={onAdd} className="w-full rounded-lg bg-[#7A49CA] py-3 px-12 text-white hover:bg-opacity-70">
                        Add
                    </button>
                </div>
            </div>
        </ModalClose>
    );
}

export default ContactsModal;