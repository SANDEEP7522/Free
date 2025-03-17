import { getUserAccounts } from "@/action/dashboard";
import CreateAccountDrawer from "@/components/createAccountDrawer/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React from "react";
import AccountCard from "./_componentes/account-card";
const DashboardPage = async () => {
  const accounts = await getUserAccounts();

  return (
    <div className="px-5">
      {/* budget progress chart */}

      {/* Overviewes of the process */}

      {/* Account of user */}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <CreateAccountDrawer>
          <Card className="cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg p-6 flex flex-col items-center justify-center border border-gray-300 rounded-lg bg-white">
            <CardContent className="flex flex-col items-center text-center">
              <Plus size={24} className="text-blue-600 mb-2" />
              <p className="text-lg font-semibold text-gray-700">
                Add New Account
              </p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {accounts.length > 0 &&
          accounts?.map((account) => {
            return (
              <AccountCard key={account.id} account={account} />
            )
          })}
      </div>
    </div>
  );
};

export default DashboardPage;
