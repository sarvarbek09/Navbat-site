import TotalPayments from "./components/total-payments";
import { AnalyticsDashboard } from "./components/analytics-dashboard";
import { RecentTransactionsTable } from "./components/transactions-table";
import {transactionsData} from './lib/transactions-data'

export default function AdminPayments() {
  return <div>
    <div className="flex items-end justify-between">
      <div className="flex flex-col gap-4">
        <div className="block"><span className="rounded-md bg-(--admin-gray) text-xs py-1 px-3">PAGE: ADMIN_PAYMENTS | DS: SALONFLOW_V1</span></div>
        <h1 className="text-5xl font-bold">Payments & Revenue</h1>
        <p className="text-sm text-muted-foreground">
          Overview of financial performance and recent transactions.
        </p>
        {/* Add your salon management components here */}
      </div>
      <div className="space-x-2">
      </div>
    </div>

    <div className="mt-12">
      <TotalPayments/>
    </div>
    <div className="mt-16">
      <AnalyticsDashboard/>
    </div>
    <div className="mt-12">
      <RecentTransactionsTable data={transactionsData}/>
    </div>
  </div>;
}
