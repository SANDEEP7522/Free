"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { accountSchema } from "@/app/lib/schema";

import { createAccount } from "@/action/dashboard";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useFetch } from "@/hooks/use-fetch";

const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  useEffect(() => {
    setValue("type", "CURRENT");
  }, [setValue]);

  const {
    data: newAccount,
    loading: createAccountLoading,
    error,
    fn: createAccountFn,
  } = useFetch(async (data) => {
    try {
      const response = await createAccount(data);
      console.log("response", response);
      
      return response;
    } catch (err) {
      throw new Error(err.message || "Something went wrong while creating the account.");
    }
  });

  useEffect(() => {
    if (newAccount && !createAccountLoading) {
      console.log("newAccount", newAccount);
      console.log("createAccountLoading", createAccountLoading);
      
      
      toast.success("Account created successfully");
      // setAccounts((prev) => [...prev, newAccount]);
      setOpen(false); 
      reset();
    }
  }, [createAccountLoading, newAccount]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Something went wrong");
    }
  }, [error]);

  const onSubmit = async (data) => {
    try {
      const response = await createAccountFn(data);
      console.log("Created account function executed", response);
    } catch (err) {
      toast.error(err.message || "Account creation failed.");
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="p-6 max-w-lg mx-auto">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold text-gray-800">
            Create a New Account
          </DrawerTitle>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Account Name</label>
            <Input id="name" placeholder="Enter account name" {...register("name")} className="w-full" />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">Account Type</label>
            <Select onValueChange={(value) => setValue("type", value)} defaultValue={watch("type")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CURRENT">Current</SelectItem>
                <SelectItem value="SAVINGS">Savings</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <span className="text-red-500">{errors.type.message}</span>}
          </div>

          <div className="space-y-2">
            <label htmlFor="balance" className="text-sm font-medium">Initial Balance</label>
            <Input id="balance" type="number" placeholder="0.00" step="0.01" {...register("balance")} className="w-full" />
            {errors.balance && <span className="text-red-500">{errors.balance.message}</span>}
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Set as Default</label>
            <Switch id="isDefault" onCheckedChange={(checked) => setValue("isDefault", checked)} checked={watch("isDefault") || false} />
          </div>

          <div className="flex justify-end gap-4">
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Create Account"}</Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
