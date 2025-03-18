"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { updateDefaultAccount } from "@/action/accounts";
import { useFetch } from "@/hooks/use-fetch";
import { toast } from "sonner";

const AccountCard = ({ account }) => {
  const { name, type, balance, isDefault, id } = account;

  const {
    fn: updateDefaultFn,
    data: updateDefaultData,
    error,
    loading: updateDefaultLoading,
  } = useFetch(updateDefaultAccount);

  const handleUpdateDefault = async (event) => {
    event.preventDefault();
    if (isDefault) {
      toast.warning("This account is already default");
      return;
    }

    await updateDefaultFn(id);
  };

  useEffect(() => {
    if (updateDefaultData?.success) {
      toast.success("Default account updated successfully");
    }

    if (error) {
      toast.error(error.message || "Something went wrong");
    }
  }, [updateDefaultData, error, updateDefaultLoading]);

  return (
    <div>
      <Card className="cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg p-4 sm:p-6 flex flex-col items-center justify-center border border-gray-300 rounded-lg bg-white w-full max-w-sm sm:max-w-md">
        <Link href={`/account/${id}`} className="w-full">
          <CardHeader className="flex flex-col sm:flex-row justify-between items-center w-full">
            <CardTitle className="text-center sm:text-left text-lg sm:text-xl font-semibold">
              {name}
            </CardTitle>
            <Switch
              checked={isDefault}
              onChange={handleUpdateDefault}
              disabled={updateDefaultLoading}
              className="mt-2 sm:mt-0"
            />
          </CardHeader>

          <CardContent className="w-full text-center sm:text-left">
            <div className="text-2xl font-semibold">
              ${parseFloat(balance).toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground capitalize">
              {type.charAt(0) + type.slice(1).toLowerCase()} Account
            </p>
          </CardContent>

          <CardFooter className="grid grid-cols-2 gap-4 w-full text-center sm:text-left">
            <div className="flex items-center gap-1 text-green-600">
              <ArrowUpRight className="w-4 h-4" />
              <span>Income</span>
            </div>
            <div className="flex items-center gap-1 text-red-600">
              <ArrowDownRight className="w-4 h-4" />
              <span>Expense</span>
            </div>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
};

export default AccountCard;
