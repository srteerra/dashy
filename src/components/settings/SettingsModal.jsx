import { useState } from 'react';
import Modal from '../Modal';
import { useDashy } from '../../hooks/dashy';
import { client } from "../../../lib/sanityClient";

const SettingsModal = ({ settingsModalOpen, setSettingsModalOpen, setUserName }) => {
    const {userAddress, userName} = useDashy();
    const [newUsername, setNewUsername] = useState("")

    const onUpdate = () => {
        if(newUsername !== "") {
            client.patch(userAddress).set({ userName: newUsername }).commit().then((updatedAcc) => {
                console.log("Hurray, the acc is updated! New document:");
                console.log(updatedAcc);
                console.log(updatedAcc.userName);
                setUserName(updatedAcc.userName)
            });
        }

        setSettingsModalOpen(false);
    }

    return (
        <Modal modalOpen={settingsModalOpen} setModalOpen={setSettingsModalOpen}>
            <div>
                <div>
                    <h1 className='text-xl'>Edit profile</h1>
                </div>

                <div className='my-10'>
                    <label htmlFor="newUsername">New username</label>
                    <div className="flex rounded-lg border border-gray-200 p-4">
                        <input className="w-full pl-2 font-medium text-gray-600 placeholder-gray-300 outline-none" id="newUsername" name="newUsername" type="text" placeholder={userName} value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
                    </div>
                </div>

                <div className="flex w-full space-x-1">
                    <button onClick={onUpdate} className="w-full rounded-lg bg-[#7A49CA] py-3 px-12 text-white hover:bg-opacity-70">
                        Update
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default SettingsModal;