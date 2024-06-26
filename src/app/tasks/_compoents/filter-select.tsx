"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import React from "react";

const filterKeys = { all: "All", completed: "Completed", pending: "Pending" };
export type FilterKeys = keyof typeof filterKeys;

const FilterSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: FilterKeys) => void;
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Select filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(filterKeys).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
