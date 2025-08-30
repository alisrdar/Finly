import TransactionInfoCard from '../cards/TransactionInfoCard'
import type { Transaction } from '../../types'
import DashButton from '../ui/dashButton'

const RecentTransactions = ({
  transactions,onSeeMore
}: {
  transactions: Transaction[];
  onSeeMore: () => void;
}) => {
  return (
    <div className="bg-card px-6 border p-4 rounded-lg shadow-md hover:shadow-sm
     transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <h5 className="font-semibold text-lg text-foreground">
          Recent Transactions
        </h5>
        <DashButton btnText='See All' onClick={onSeeMore} />
      </div>

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
    </div>
  )
}

export default RecentTransactions
