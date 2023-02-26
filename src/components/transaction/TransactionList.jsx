import { useMemo, useState } from 'react';
import TransactionDetailModal from './TransactionDetailModal';
import TransactionItem from './TransactionItem';
import { Fade } from "react-awesome-reveal";

const TransactionList = ({ transactions }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentTransactionID, setCurrentTransactionID] = useState(null);
    const currentTransaction = useMemo(() => transactions.find((transaction) => transaction.id === currentTransactionID), [currentTransactionID]);

    const toggleTransactionDetailModal = (value, transactionID) => {
        setCurrentTransactionID(transactionID);
        setModalOpen(value);
    }

    return (
        <div>
            <div className="pb-4 pt-10">
                <p className="mx-auto max-w-3xl px-10 text-sm font-medium uppercase text-[#abafb2] xl:px-0">Transactions</p>
            </div>
            <div className="mx-auto max-w-3xl divide-y divide-gray-100 py-4 px-4 md:px-10 xl:px-0">
                {transactions.map(({ id, from, to, amount, description, transactionDate }) => (
                    <TransactionItem key={id} from={from} id={id} to={to} description={description} transactionDate={transactionDate} amount={amount} toggleTransactionDetailModal={toggleTransactionDetailModal} />
                ))}

                <TransactionDetailModal modalOpen={modalOpen} setModalOpen={setModalOpen} currentTransaction={currentTransaction} />
            </div>
        </div>
    );
}

export default TransactionList;