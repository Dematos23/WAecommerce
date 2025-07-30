"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSortProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function ProductSort({ value, onValueChange }: ProductSortProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="precio-asc">Precio: Menor a Mayor</SelectItem>
        <SelectItem value="precio-desc">Precio: Mayor a Menor</SelectItem>
        <SelectItem value="nombre-asc">Nombre: A-Z</SelectItem>
        <SelectItem value="nombre-desc">Nombre: Z-A</SelectItem>
      </SelectContent>
    </Select>
  );
}
