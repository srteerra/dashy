import { format } from 'date-fns';
import { CheckBadgeIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { capitalize } from '../../utils/string.js';
import {ModalClose} from '../Modal';
import { useState } from 'react';
import { client } from "../../../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

const TransactionDetailModal = ({ currentTransaction, modalOpen, setModalOpen }) => {
    const [username, setUsername] = useState("")
    const [avatar, setAvatar] = useState("")

    if (currentTransaction?.to.name) {
        const query = '*[_type == "users" && _id == $address] {userName, userAddress, userAvatar}';
        const params = { address: currentTransaction?.to.name };

        client.fetch(query, params).then((user) => {
            setUsername(user[0].userName)
            
            if (user[0].userAvatar) {
                setAvatar(builder.image(user[0].userAvatar).url());
            } else {
                setAvatar("https://certchain.infura-ipfs.io/ipfs/Qmf5tiCy77SqzAfAfXCQDuR4NPktQ8AYzkEeN9NrsnYSD6")
            }
        });
    }

    return (
        <ModalClose modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className="space-y-20">
                <TransactionProfile name={username} handle={currentTransaction?.to.name} avatar={avatar} verified={currentTransaction?.to.verified} />
                <TransactionDetails amount={currentTransaction?.amount} description={currentTransaction?.description} transactionDate={currentTransaction?.transactionDate} />
                <TransactionStatus status={currentTransaction?.status} />
                <TransactionMetadata
                    metadata={{
                        amount: `${Number(currentTransaction?.amount).toFixed(2)} SOL`,
                        to: currentTransaction?.to.name,
                        from: currentTransaction?.from.name,
                    }}
                />
                <TransactionFooter />
            </div>
        </ModalClose>
    );
}

const TransactionProfile = ({ name, handle, avatar, verified }) => {
    console.log(verified)
    return (
        <div className="flex flex-col items-center space-y-3">
            <div className="h-16 w-16 rounded-full border-2 border-white">
                <img className="h-full w-full rounded-full object-cover" src={avatar} />
            </div>

            <div className="flex flex-col items-center space-y-1">
                <div className="flex items-center justify-center space-x-1">
                    <p className="font-bold">{name}</p>
                    {verified && <CheckBadgeIcon className="h-5 w-5 text-blue-500" />}
                </div>

                <p className="text-sm font-light text-gray-600 truncate">{handle}</p>
            </div>
        </div>
    );
}

const TransactionDetails = ({ amount, description, transactionDate }) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-6xl">{Number(amount).toFixed(1)} SOL</h3>
            <div className="flex flex-col items-center text-gray-400">
                <p className='my-5'>{description}</p>
                <p>
                    {format(new Date(transactionDate), 'MMM d')} at {format(new Date(transactionDate), 'h:mm aa')}
                </p>
            </div>
        </div>
    );
}

const TransactionStatus = ({ status }) => {
    const isCompleted = status === 'Completed'

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            {isCompleted ? <CheckCircleIcon className="h-8 w-8 text-[#0bb534]" /> : <XCircleIcon className="h-8 w-8 text-red-600" />}
            <p className="text-lg font-semibold">{capitalize(status)}</p>
        </div>
    );
}

const TransactionMetadata = ({ metadata }) => {
    return (
        <div className="space-y-1">
            {Object.entries(metadata).map(([title, data], index) => (
                <div key={index} className="flex justify-between">
                    <p className="text-gray-400 max-w-[25%]">{capitalize(title)}</p>
                    <p className="font-medium text-gray-400 max-w-[75%] truncate">{data}</p>
                </div>
            ))}
        </div>
    );
}

const TransactionFooter = () => {
    return (
        <div className="flex flex-col items-center justify-center text-sm text-gray-400">
            <p>Dashy Payments.</p>
        </div>
    );
}


export default TransactionDetailModal;