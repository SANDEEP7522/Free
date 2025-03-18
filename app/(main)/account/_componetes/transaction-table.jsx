"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { categoryColors } from "@/data/categories";
import { format, set } from "date-fns";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MoreHorizontal,
  Pencil,
  RefreshCcw,
  Search,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

export function TransactionTable({ transactions }) {
  const router = useRouter();

  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");

  // Memoized filtered and sorted transactions
  const filterAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((transaction) =>
        transaction.description?.toLowerCase().includes(searchLower)
      );
    }

    // Apply type filter
    if (typeFilter) {
      result = result.filter((transaction) => transaction.type === typeFilter);
    }

    // Apply recurring filter
    if (recurringFilter) {
      result = result.filter((transaction) => {
        if (recurringFilter === "recurring") return transaction.isRecurring;
        return !transaction.isRecurring;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.field) {
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

  const handleShorten = (field) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };
  const handleSelectAll = () => {
    setSelectedIds(
      selectedIds.length === filterAndSortedTransactions.length
        ? []
        : filterAndSortedTransactions.map((item) => item.id)
    );
  };

  const handleDelete = () => {
    console.log("Deleting selected transactions:", selectedIds);
  };

  const handleClearFilters = () => {
    setSelectedIds([]);
    setSearchTerm("");
    setTypeFilter("");
    setRecurringFilter("");
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-wrap items-center gap-2 p-4 border rounded-lg bg-white shadow-md">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search transactions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* All Types Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {typeFilter || "All Types"}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTypeFilter("")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter("INCOME")}>
              Income
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTypeFilter("EXPENSE")}>
              Expense
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* All Transactions Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {recurringFilter || "All Transactions"}{" "}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setRecurringFilter("")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRecurringFilter("recurring")}>
              Recurring Only
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setRecurringFilter("non-recurring")}
            >
              Non-Recurring Only
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex flex-wrap gap-2 items-center">
          {/* Delete Button (Visible if selectedIds exist) */}
          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="flex items-center"
              size="sm"
            >
              <Trash className="mr-2 h-4 w-4" />({selectedIds.length})
            </Button>
          )}

          {/* Clear Filters Button (Visible if filters/search are active) */}
          {(searchTerm || typeFilter || recurringFilter) && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleClearFilters}
              title="Clear filters"
              className="h-4 w-5"
            >
              X
            </Button>
          )}
        </div>
      </div>

      <div className="min-w-[600px]">
        <Table className="w-full">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  onCheckedChange={handleSelectAll}
                  checked={
                    selectedIds.length === filterAndSortedTransactions.length
                  }
                />
              </TableHead>

              <TableHead
                className="cursor-pointer text-left sm:text-right"
                onClick={() => handleShorten("date")}
              >
                <div className="flex items-center">
                  Date
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </div>
              </TableHead>

              <TableHead>Description</TableHead>
              <TableHead
                className="cursor-pointer text-left sm:text-right"
                onClick={() => handleShorten("category")}
              >
                <div className="flex items-center">
                  Category
                  {sortConfig.field === "category" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-left sm:text-right"
                onClick={() => handleShorten("amount")}
              >
                <div className="flex items-center">
                  Amount
                  {sortConfig.field === "amount" &&
                    (sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Recurring</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterAndSortedTransactions.length > 0 ? (
              filterAndSortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Checkbox
                      onCheckedChange={() =>
                        setSelectedIds((prev) =>
                          prev.includes(transaction.id)
                            ? prev.filter((id) => id !== transaction.id)
                            : [...prev, transaction.id]
                        )
                      }
                      checked={selectedIds.includes(transaction.id)}
                    />
                  </TableCell>
                  <TableCell>
                    {format(new Date(transaction.date), "PP")}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Badge
                      style={{
                        background: categoryColors[transaction.category],
                      }}
                    >
                      {transaction.category}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={
                      transaction.type === "INCOME"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {transaction.type === "INCOME" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {transaction.isRecurring ? (
                      <Badge>
                        <RefreshCcw />{" "}
                        {RECURRING_INTERVALS[transaction.recurringInterval]}
                      </Badge>
                    ) : (
                      <Badge>
                        <Clock /> One-time
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/transactions/create?edit=${transaction.id}`
                            )
                          }
                        >
                          <Pencil /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => {}}
                        >
                          <Trash /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
