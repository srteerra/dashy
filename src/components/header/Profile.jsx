import { truncate } from "../../utils/string";
import Image from "next/image";
import scanIcon from "../../assets/scan.png";

const Profile = ({ setModalOpen, avatar, userAddress, userName }) => {
    const onProfileOpen = () => {
        setModalOpen(true)
    }

    return (
        <div onClick={onProfileOpen} className="flex cursor-pointer flex-col items-center space-y-3">
            <div className="h-16 w-16 relative rounded-full border-2 border-white">
                <img className="h-full w-full rounded-full object-cover" src={avatar} />
                <Image src={scanIcon} className="h-[20px] w-[20px] rounded-full object-cover absolute right-0 bottom-0"/>
            </div>

            

            <div className="flex flex-col items-center space-y-1">
                <p className="font-semibold text-white">{userName}</p>

                <p className="text-sm font-light italic text-gray-100">{truncate(userAddress)}</p>
            </div>
        </div>
    );
}

export default Profile;