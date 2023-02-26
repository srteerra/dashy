import { truncate } from "../../utils/string";
import Image from "next/image";
import scanIcon from "../../assets/scan.png";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Profile = ({ setModalOpen, avatar, userAddress, userName, connected, publicKey }) => {

    const onProfileOpen = () => {
        setModalOpen(true)
    }

    return (
        <div className="flex flex-col items-center space-y-3">
            <div onClick={onProfileOpen} className="h-20 w-20 relative cursor-pointer rounded-full border-2 border-white">
                <img className="h-full w-full rounded-full object-cover" src={avatar} />
                <Image src={scanIcon} className="h-[30px] w-[30px] rounded-full object-cover absolute right-0 bottom-0"/>
            </div>

            <div className="flex flex-col items-center space-y-1">
                <p className="font-semibold text-white">{userName}</p>

                <WalletMultiButton>
                    <span className='text-sm'>{ connected ? truncate(publicKey.toString()) : 'Connect Wallet'}</span>
                </WalletMultiButton>
            </div>
        </div>
    );
}

export default Profile;