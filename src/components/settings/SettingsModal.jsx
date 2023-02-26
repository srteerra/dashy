import { useState } from 'react';
import {Modal, ModalClose} from '../Modal';
import { useDashy } from '../../hooks/dashy';
import { client } from "../../../lib/sanityClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imageUrlBuilder from "@sanity/image-url";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

const SettingsModal = ({ settingsModalOpen, setSettingsModalOpen, setUserName, setAvatar }) => {
    const {userAddress, userName} = useDashy();
    const [newUsername, setNewUsername] = useState(null)
    const [newAvatar, setNewAvatar] = useState(null)

    const success = () => toast.success('Profile updated', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    const uploadImage = (e) => {
        if (e) {
            setNewAvatar(e.target.files[0]);
        }
    }

    const onUpdate = () => {
        if(newUsername) {
            if(newAvatar) {
                client.assets.upload("image", newAvatar).then(async (imageAsset) => {
                    return client
                        .patch(userAddress)
                        .set({
                            userAvatar: {
                            _type: "image",
                            asset: {
                                _type: "reference",
                                _ref: imageAsset._id,
                            },
                            },
                        }).commit().then((res) => {
                            console.log(res);
                            setAvatar(builder.image(res.userAvatar).url());
                        });
                })
                .then(() => {
                    console.log("Done!");
                });
            }

            client.patch(userAddress).set({ userName: newUsername }).commit().then((updatedAcc) => {
                console.log("Hurray, the acc is updated! New document:");
                console.log(updatedAcc);
                console.log(updatedAcc.userName);
                setUserName(updatedAcc.userName)
                success();
            });
        }

        setSettingsModalOpen(false);
    }

    return (
        <ModalClose modalOpen={settingsModalOpen} setModalOpen={setSettingsModalOpen}>
            <div className='w-full'>
                <div>
                    <h1 className='font-bold text-xl'>Edit profile</h1>
                </div>

                <div className='my-10'>
                    <label htmlFor="newUsername">New Username</label>
                    <div className="flex rounded-lg border border-gray-200 p-4">
                        <input className="w-full pl-2 font-medium text-gray-600 placeholder-gray-300 outline-none" id="newUsername" name="newUsername" type="text" placeholder={userName} value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
                    </div>
                </div>

                <div className='my-10'>
                    <label htmlFor="newAvatar">Change Avatar</label>
                    <div className="flex rounded-lg border border-gray-200 p-4">
                        <input className="w-full pl-2 font-medium text-gray-600 placeholder-gray-300 outline-none" id="newAvatar" name="newAvatar" type="file" onChange={(e) => uploadImage(e)}/>
                    </div>
                </div>

                <div className="flex w-full space-x-1">
                    <button onClick={onUpdate} className="w-full rounded-lg bg-[#7A49CA] py-3 px-12 text-white hover:bg-opacity-70">
                        Update
                    </button>
                </div>
            </div>
        </ModalClose>
    );
}

export default SettingsModal;