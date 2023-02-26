import { format } from 'date-fns';
import { useState } from 'react';
import { client } from "../../../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import outIcon from "../../assets/out.png";
import inIcon from "../../assets/in.png";
import Image from "next/image";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

const TransactionItem = ({ id, from, to, description, transactionDate, amount, toggleTransactionDetailModal }) => {
    const query = '*[_type == "users" && _id == $address] {userName, userAddress, userAvatar}';
    const params = { address: to.name };
    
    const [username, setUsername] = useState("")
    const [userAddress, setuserAddress] = useState("")
    const [avatar, setAvatar] = useState("")

    client.fetch(query, params).then((user) => {
        if(user[0]) {
            setUsername(user[0].userName)
            setuserAddress(user[0].userAddress)

            if (user[0].userAvatar) {
                setAvatar(builder.image(user[0].userAvatar).url());
            } else {
                setAvatar("https://certchain.infura-ipfs.io/ipfs/Qmf5tiCy77SqzAfAfXCQDuR4NPktQ8AYzkEeN9NrsnYSD6")
            }
        } else {
            setUsername("Solana Pay")
            setAvatar("https://certchain.infura-ipfs.io/ipfs/Qmf5tiCy77SqzAfAfXCQDuR4NPktQ8AYzkEeN9NrsnYSD6")
        }
        
        
    });

    const onItemClick = () => {
        toggleTransactionDetailModal(true, id)
    }

    return (
        <div onClick={onItemClick} className="grid gap-4 my-6 relative shadow-lg cursor-pointer grid-cols-4 sm:grid-cols-8 items-center py-8 px-12 hover:bg-gray-50">
            {to.name === userAddress ? <Image src={outIcon} width="40" className="absolute top-0 left-2"/> : <Image src={inIcon} width="40" className="absolute top-0 left-2"/>}
            <div className="col-span-2 flex items-center space-x-4">
                <img className="h-8 w-8 rounded-full object-cover" src={avatar} alt="avatar" />
                <p className="text-sm text-gray-800">{username}</p>
            </div>

            <p className="col-span-4 text-sm text-gray-400">{description}</p>
            <p className="col-span-1 text-sm text-gray-400">{format(new Date(transactionDate), 'MMM d')}</p>
            <p className="col-span-1 text-right text-sm font-black text-[#7A49CA]">{amount}  SOL</p>
        </div>
    );
}

export default TransactionItem;