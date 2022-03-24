import React from 'react';
import { Image, Avatar } from 'antd';
import "./index.scss";
// import { useCharityVerseContract } from '../../../../hooks/useContract';

type TransactionDetailsProps = {
    inputAmount: number,
    chosenPaymentMethod: {
        label: string,
        title: string,
        account: string,
        accountNumber: string,
    }
}

const TransactionDetails: React.FC<TransactionDetailsProps> = (props) => {
    const { inputAmount, chosenPaymentMethod } = props;
    // const [donateFee, setDonateFee] = useState(0);
    // const charityContract = useCharityVerseContract();

    // useEffect(() => {
    //     const queryDonateFee = async () => {
    //         const donateFee = await charityContract.donateFeePercent();
    //         setDonateFee(donateFee / 10000);
    //     }

    //     charityContract && queryDonateFee();
    // }, [charityContract]);

    return (
        <div className="transaction-details">
            <p className="transaction-details__title">Your transaction details</p>
            <div className="transaction-details__info">
                <div className="details-info__block">
                    <span className="details-info__label">
                        Số coin mua
                    </span>
                    <span className="details-info__text">
                        <strong>{inputAmount}</strong>
                        <Image src="/icon/ethereum_2.svg" preview={false} />
                    </span>
                </div>
                {/* <div className="details-info__block">
                    <span className="details-info__label">
                        Fee giao dịch ({donateFee * 100}%)
                    </span>
                    <span className="details-info__text">
                        <strong>{inputAmount * donateFee}</strong>
                        <Image src="/icon/ethereum_2.svg" preview={false} />
                    </span>
                </div> */}
                <div className="details-info__block">
                    <span className="details-info__label">
                        Số tiền phải chuyển
                    </span>
                    <span className="details-info__text">
                        <strong>{inputAmount} VND</strong>
                    </span>
                </div>
            </div>
            <div className="transaction-details__account">
                <p className="details-account__title">Tài khoản nhận tiền</p>
                <div className="details-account__details">
                    <Avatar src={chosenPaymentMethod.label} />
                    <div className="details-account__personal">
                        <p className="details-account__banking">{chosenPaymentMethod.title}</p>
                        <p className="details-account__banking-owner">{chosenPaymentMethod.account}</p>
                        <p className="details-account__banking-number">{chosenPaymentMethod.accountNumber}</p>
                    </div>
                </div>
            </div>
            <div className="transaction-details__receipt details-receipt">
                <span className="details-receipt__label">
                    Tổng số coin nhận
                </span>
                <span className="details-receipt__text">
                    <strong>{inputAmount}</strong>
                    <Image src="/icon/ethereum_2.svg" preview={false} />
                </span>
            </div>
        </div>
    )
}

export default TransactionDetails;