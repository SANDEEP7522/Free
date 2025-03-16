"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import React, { useState } from "react";
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

const CreateAccountDrawer = ({ children }) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = async (data) => {
    console.log(data);
         setOpen(false);
       reset();
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="p-6 max-w-lg mx-auto">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-bold text-gray-800">
            Are you absolutely sure?
          </DrawerTitle>
        </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Account Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Account Name
            </label>
            <Input
              id="name"
              placeholder="Enter account name"
              {...register("name")}
              className="w-full cursor-pointer"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          {/* Account Type */}
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Account Type
            </label>
            <Select
              onValueChange={(value) => setValue("type", value)}
              defaultValue={watch("type")}
            >
              <SelectTrigger className="w-full cursor-pointer">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CURRENT">Current</SelectItem>
                <SelectItem value="SAVINGS">Savings</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && (
              <span className="text-red-500">{errors.type.message}</span>
            )}
          </div>

          {/* Initial Balance */}
          <div className="space-y-2">
            <label htmlFor="balance" className="text-sm font-medium">
              Initial Balance
            </label>
            <Input
              id="balance"
              type="number"
              placeholder="0.00"
              step="0.01"
              {...register("balance")}
              className="w-full cursor-pointer"
            />
            {errors.balance && (
              <span className="text-red-500">{errors.balance.message}</span>
            )}
          </div>

          {/* Set as Default */}
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="isDefault" className="text-sm font-medium">
                Set as Default
              </label>
              <p className="text-xs text-gray-500">
                Set this account as your default account.
              </p>
            </div>
            <Switch
              id="isDefault"
              onCheckedChange={(checked) => setValue("isDefault", checked)}
              checked={watch("isDefault")}
              className="cursor-pointer"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <DrawerClose>
              <Button
                variant="outline"
                type="button"
                className="w-full sm:w-auto cursor-pointer"
              >
                Cancel
              </Button>
            </DrawerClose>

            <Button type="submit" className="w-full sm:w-auto cursor-pointer ">
              Create Account
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
