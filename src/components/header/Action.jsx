import { BanknotesIcon, PlusIcon } from '@heroicons/react/24/solid';

const Action = ({ setModalOpen }) => {

    const onNewTransaction = () => {
        setModalOpen(true)
    }

    return (
        <div>
            <button onClick={onNewTransaction} className="w-full rounded-lg bg-[#7A49CA] py-3 hover:bg-opacity-70 mt-16">
                <span className="font-medium text-white flex flex-row justify-center"><BanknotesIcon width={'25px'} className="mr-2"/>Pay</span>
            </button>
        </div>
    );
}

export default Action;