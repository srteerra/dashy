import { Modal, ModalClose } from "../Modal";
import { truncate } from "@/utils/string";
import { createQR, encodeURL, findReference, validateTransfer, FindReferenceError, ValidateTransferError } from "@solana/pay";
import { PublicKey, Keypair } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { useConnection } from '@solana/wallet-adapter-react';
import { useDashy } from "../../hooks/dashy";
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransactionQRModal = ({ modalOpen, setModalOpen, userAddress, userName, avatar, setQrCode }) => {
    const qrRef = useRef();
    const [handleClick, setHandleClick] = useState(false);
    const [amountInput, setAmountInput] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const { transactions, setTransactions } = useDashy();
    const toastId = useRef(null);
    const trans = () => toastId.current = toast.loading("Waiting for payment...",{closeOnClick: false, closeButton: true,});
    const update = () => toast.update(toastId.current, {render:"Completed", type: toast.TYPE.SUCCESS, isLoading: false, closeOnClick: true, autoClose: 3000, });
    const notify = () => toast.update(toastId.current, {render:"Transaction request cancelled", type: toast.TYPE.WARNING, isLoading: false, closeOnClick: true, autoClose: 3000, });
    
    const { connection } = useConnection();

    const loadQr = () => {
        setQrCode(true);
        setHandleClick(true);
        trans();
    }

    const loadOff = () => {
        setModalOpen(false);
        setHandleClick(false);
        notify();
        
    }

    useEffect(() => {
        if(userAddress != ''){
            const recipient = new PublicKey(userAddress);
            const amount = new BigNumber(amountInput);
            const reference = Keypair.generate().publicKey;
            const label = 'Dashy Payment';
            const message = messageInput;
            const urlParams = {
                recipient,
                amount,
                reference, 
                label,
                message
            }

            const urlEncoded = encodeURL(urlParams);

            const qr = createQR(urlEncoded, 350, 'transparent');
            if (qrRef.current && amount.isGreaterThan(0)) {
                qrRef.current.innerHTML = '';
                qr.append(qrRef.current);
            }

            if(handleClick){
                const interval = setInterval(async () => {
                    //console.log("waiting for transaction confirmation")
                    try {
                        // Check if there is any transaction for the reference
                        const signatureInfo = await findReference(connection, reference, { finality: 'confirmed' })
                        console.log("validating")
                        // Validate that the transaction has the expected recipient, amount and SPL token
                        await validateTransfer(
                            connection,
                            signatureInfo.signature,
                            {
                              recipient,
                              amount,
                              // splToken: usdcAddress,
                              reference,
                              message
                            },
                            { commitment: 'confirmed' }
                          )
                          
                        console.log("confirmed, proceed with evil deeds")
        
                        const newID = (transactions.length + 1).toString()
                        const newTransaction = {
                            id: newID,
                            from: {
                                name: recipient,
                                handle: recipient,
                                avatar: "https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png?format=png&width=960",
                                verified: true,
                            },
                            to: {
                                name: reference,
                                handle: '-',
                                avatar: "https://imageio.forbes.com/specials-images/imageserve/6170e01f8d7639b95a7f2eeb/Sotheby-s-NFT-Natively-Digital-1-2-sale-Bored-Ape-Yacht-Club--8817-by-Yuga-Labs/0x0.png?format=png&width=960",
                                verified: false,
                            },
                            description: message,
                            transactionDate: new Date(),
                            status: 'Completed',
                            amount: amount,
                            source: '-',
                            identifier: '-',
                        };
                        console.log(newTransaction, "NEW TRANSACTIONS EXISTS")
                        setTransactions([newTransaction, ...transactions]);
                        setModalOpen(false);
                        clear();
                    } catch (e) {
                        if (e instanceof FindReferenceError) {
                            // No transaction found yet, ignore this error
                            return;
                        }
                        if (e instanceof ValidateTransferError) {
                            // Transaction is invalid
                            console.error('Transaction is invalid', e)
                            return;
                        }
                        console.error('Unknown error', e)
                    }
                }, 500);
                
                return () => {
                    clearInterval(interval);
                    notify();
                }

                function clear(){
                    clearInterval(interval);
                    update();
                }
            }
        }
        return
    }, [handleClick]);

    return (
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            
            <div >
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div ref={qrRef} />
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="grid grid-cols-2">
                        <div className="flex items-center">
                            <img src={avatar} alt="" srcset="" className="w-14 rounded-full" />
                        </div>
                        <div className="my-auto">
                            <p className="text-lg font-medium text-gray-800">{userName}</p>
                            <p className="text-sm font-light text-gray-600">Scan to pay</p>
                        </div>
                    </div>

                    <div className="w-full py-6">
                        <div className="flex rounded-lg border border-gray-200 p-4">
                            <label className="text-gray-300" htmlFor="qrPurpose">
                                Amount:
                            </label>
                            <input className="w-full pl-2 font-medium text-gray-600 placeholder-gray-300 outline-none" id="qrPurpose" name="qrPurpose" type="number" placeholder="0.5" value={amountInput} onChange={(e) => setAmountInput(e.target.value)}/>
                        </div>
                        <div className="flex rounded-lg border border-gray-200 p-4">
                            <label className="text-gray-300" htmlFor="msgPurpose">
                                Message:
                            </label>
                            <input className="w-full pl-2 font-medium text-gray-600 placeholder-gray-300 outline-none" id="msgPurpose" name="msgPurpose" type="text" placeholder="Thanks for your help!" value={messageInput} onChange={(e) => setMessageInput(e.target.value)}/>
                        </div>
                    </div>

                    <button onClick={() => loadQr()} className="w-full rounded-lg bg-[#7A49CA] py-3 hover:bg-opacity-70">
                        <span className="font-medium text-white">Load QR code</span>
                    </button>

                    <button onClick={() => loadOff()} className="w-full rounded-lg border-2 border-red-700 py-3 hover:bg-opacity-70">
                        <span className="font-medium text-red-700">Cancel</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default TransactionQRModal;