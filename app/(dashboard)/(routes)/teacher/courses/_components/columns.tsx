"use client";
import Link from "next/link";
import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          className="w-full hover:text-sky-600
                hover:bg-slate-400/75"
          variant="ghost"
          onClick={(): void =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          className="w-full hover:text-sky-600
                hover:bg-slate-400/75"
          variant="ghost"
          onClick={(): void =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price: number = parseFloat(row.getValue("price") || "0");
      const formattedPrice: string = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return (
        <>{formattedPrice}</>
      );
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          className="w-full hover:text-sky-600
                hover:bg-slate-400/75"
          variant="ghost"
          onClick={(): void =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Published
          <ArrowUpDown className="ml-2 h-4 w-4"/>
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPublished: boolean = row.getValue("isPublished") || false;

      return (
        <Badge className={cn("bg-slate-500", isPublished && "bg-emerald-500")}>
          {isPublished ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id }: { id: string } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex align-middle h-4 w-8 p-0 hover:text-sky-600
                hover:bg-slate-400/75"
            >
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-6 w-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/teacher/courses/${id}`}>
              <DropdownMenuItem>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
