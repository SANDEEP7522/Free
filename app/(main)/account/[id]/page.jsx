import { getAccountWithTransactions } from "@/action/accounts";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import { TransactionTable } from "../_componetes/transaction-table";
import { BarLoader } from "react-spinners";

const AccountsPage = async ({ params }) => {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }
  const { transactions, ...account } = accountData;

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Account Details</h1>
        <p className="text-gray-600 text-sm">
          Manage your financial activities effortlessly
        </p>
      </div>

      {/* Account Info Section */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-xl font-semibold flex items-center">
          {account.name}
          <span className="ml-2 text-lg">
            {account.type === "SAVINGS" ? "💰" : "🏦"}
          </span>
        </h1>
        <span className="text-gray-600 text-sm">
          {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
        </span>
      </div>

      {/* Balance & Transactions */}
      <div className="flex justify-between items-center py-4">
        <div className="text-2xl font-bold text-green-600 flex items-center">
          💵 ${parseFloat(account.balance).toFixed(2)}
        </div>
        <p className="text-gray-500 text-sm flex items-center">
          📊 {account._count.transactions} Transactions
        </p>
      </div>



      {/* Chart Section Placeholder */}
      <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center">
        📈 Chart Section (To be implemented)
      </div>




      {/* Transaction Table Placeholder */}
     <Suspense fallback={<BarLoader className="mx-auto" color="#36d7b7" size={30} />} >
     <TransactionTable transactions={transactions} />
     </Suspense>
    </div>
  );
};

export default AccountsPage;
