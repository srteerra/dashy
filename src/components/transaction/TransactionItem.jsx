import { format } from 'date-fns';
import { useState } from 'react';
import { client } from "../../../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

const TransactionItem = ({ id, to, description, transactionDate, amount, toggleTransactionDetailModal }) => {
    const query = '*[_type == "users" && _id == $address] {userName, userAddress, userAvatar}';
    const params = { address: to.name };
    
    const [username, setUsername] = useState("")
    const [avatar, setAvatar] = useState("")

    client.fetch(query, params).then((user) => { 
        console.log("her", user)
        setUsername(user[0].userName)
        
        if (user[0].userAvatar) {
            setAvatar(builder.image(user[0].userAvatar).url());
        } else {
            setAvatar("https://certchain.infura-ipfs.io/ipfs/Qmf5tiCy77SqzAfAfXCQDuR4NPktQ8AYzkEeN9NrsnYSD6")
        }
    });

    const onItemClick = () => {
        toggleTransactionDetailModal(true, id)
    }

    return (
        <div onClick={onItemClick} className="grid gap-4 my-6 shadow-lg cursor-pointer grid-cols-4 sm:grid-cols-8 items-center py-8 px-12 hover:bg-gray-50">
            <div className="col-span-2 flex items-center space-x-4">
                <img className="h-8 w-8 rounded-full object-cover" src={avatar} alt="avatar" />
                <p className="truncate text-sm text-gray-800">{username}</p>
            </div>

            <p className="col-span-4 text-sm text-gray-400">{description}</p>
            <p className="col-span-1 text-sm text-gray-400">{format(new Date(transactionDate), 'MMM d')}</p>
            <p className="col-span-1 text-right text-sm font-medium text-gray-800">{amount}  SOL</p>
        </div>
    );
}

export default TransactionItem;