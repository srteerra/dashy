const Action = ({ setModalOpen }) => {

    const onNewTransaction = () => {
        setModalOpen(true)
    }

    return (
        <div>
            <button onClick={onNewTransaction} className="w-full rounded-lg bg-[#7A49CA] py-3 hover:bg-opacity-70 mt-16">
                <span className="font-medium text-white">Pay</span>
            </button>
            <button onClick={onNewTransaction} className="w-full rounded-lg bg-[#ffffff] py-3 hover:bg-opacity-70 mt-5">
                <span className="font-medium text-black">Create a Party</span>
            </button>
        </div>
    );
}

export default Action;