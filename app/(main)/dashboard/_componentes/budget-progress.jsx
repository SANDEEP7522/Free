"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,                              
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/action/budget";
import { useFetch } from "@/hooks/use-fetch";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );

  const [currentBudget, setCurrentBudget] = useState(initialBudget); // ✅ Budget state maintain

  const {
    loading: isLoading,
    fn: updateBudgetFn,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentUsed = currentBudget
    ? (currentExpenses / currentBudget.amount) * 100
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    await updateBudgetFn(amount);
  };

  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  useEffect(() => {
    console.log(updatedBudget);
    if (updatedBudget?.success) {
      setIsEditing(false);
      setNewBudget(updatedBudget.data.amount.toString()); //  Input field update
      setCurrentBudget(updatedBudget.data); //  UI update
      toast.success("Budget updated successfully");
    }
  }, [updatedBudget]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update budget");
    }
  }, [error]);

  return (
    <Card className="w-full mx-auto p-4 shadow-md border rounded-lg bg-white mt-5 mb-5">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex-1">
          <CardTitle className="text-lg font-medium flex items-center gap-1">
            Monthly Budget <span className="text-lg">💰</span>
          </CardTitle>
          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-32"
                  placeholder="Enter amount"
                  autoFocus
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUpdateBudget}
                  disabled={isLoading}
                  className="hover:bg-green-100"
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="hover:bg-red-100"
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <CardDescription className="text-gray-600 flex items-center gap-1">
                  {currentBudget ? (
                    <>
                      <span className="text-lg">📊</span> ${currentExpenses.toFixed(2)} of $
                      {currentBudget.amount.toFixed(2)} spent
                    </>
                  ) : (
                    "No budget set"
                  )}
                </CardDescription>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-6 w-6 hover:bg-gray-100"
                >
                  <Pencil className="h-3 w-3 text-gray-500 hover:text-blue-500" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {currentBudget && (
          <div className="space-y-2">
            <Progress
              value={percentUsed}
              extraStyles={`${
                percentUsed >= 90
                  ? "bg-red-500"
                  : percentUsed >= 75
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              
            />
            
            <p className="text-xs text-muted-foreground text-right flex items-center justify-end gap-1">
              {percentUsed.toFixed(1)}% used {percentUsed > 100 ? "⚠️" : "✅"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
