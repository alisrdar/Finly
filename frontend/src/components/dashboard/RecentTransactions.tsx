import TransactionInfoCard from '../cards/TransactionInfoCard'
import type { Transaction } from '../../types'
// import DashButton from '../ui/DashButton';
import CardWrapper from '../cards/CardWrapper';

const RecentTransactions = ({
  transactions,onSeeMore
}: {
  transactions: Transaction[];
  onSeeMore: () => void;
}) => {
  return (
    <CardWrapper
      title="Recent Transactions"
      onBtnClick={onSeeMore}
      btnText='See All'
    >
      <div className="space-y-1 my-4 pt-4">
        {transactions.map((tx) => (
          <TransactionInfoCard
            key={tx._id}
            title={tx.title}
            icon={tx.icon}
            amount={tx.amount}
            date={new Date(tx.date).toLocaleDateString()} 
            type={tx.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </CardWrapper>
  )
}

export default RecentTransactions
