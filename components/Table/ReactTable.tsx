"use client";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  Column,
} from "@tanstack/react-table";
import { ActualityItem } from "@/types/actuality";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, truncateWithEllipses } from "@/lib/helper";
import TableActions from "./TableActions";
import { useState } from "react";
import { ActivityItem } from "@/types/activity";
import { BaseItem, ColumnProps } from "@/types/global";
import { deleteAxiosAPI } from "@/request/request";
import ViewItemModal from "../modal/ViewItemModal";
import DeleteConfirmationModal from "../modal/DeleteConfirmationModal";
import TableStatus from "./Status";
import RenderTx from "../locale/LanguageHelper";
import { useSession } from "next-auth/react";

type ReactTableProps = {
  data: BaseItem[] | ActivityItem[] | ActualityItem[];
  columnsProps: ColumnProps[];
  model:
    | "activities"
    | "actualities"
    | "locations"
    | "locations"
    | "infos"
    | "bidoums"
    | "teams";
  mutate: () => Promise<any>;
};

export function ReactTable({
  data,
  columnsProps,
  model,
  mutate,
}: ReactTableProps) {
  const columnHelper = createColumnHelper<BaseItem | ActualityItem>();

  const [sorting, setSorting] = useState<SortingState>([]);
  const { data: session } = useSession() as any;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [viewItem, setViewItem] = useState<number | null>(null);

  const handleDelete = (id: any) => {
    setDeletingItemId(id);
    setShowDeleteModal(true);
  };

  const deleteItem = async (id: number) => {
    try {
      await deleteAxiosAPI(`/${model}/${id}`, session?.jwt);
      setShowDeleteModal(false);
      setDeletingItemId(null);
      mutate();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleView = (item: any) => {
    setShowPreviewModal(true);
    setViewItem(item);
  };

  // Generate columns from props
  const columns: any = columnsProps.map((columnProp: any) => {
    switch (columnProp.type) {
      case "id":
        return columnHelper.accessor(columnProp.value, {
          cell: (info) => info.getValue(),
          // header: () => RenderTx(columnProp.labelTx, columnProp.label),
          header: () => (
            <RenderTx tx={columnProp.labelTx} text={columnProp.label} />
          ),
          // header: () => <span>{columnProp.label}</span>,
          // footer: (info) => info.column.id,
        });
      case "string":
        return columnHelper.accessor(columnProp.value, {
          cell: (info) => truncateWithEllipses(info.getValue(), 75),
          header: () => (
            <RenderTx tx={columnProp.labelTx} text={columnProp.label} />
          ),
        });
      case "date":
        return columnHelper.accessor(columnProp.value, {
          cell: (info) => info.getValue() && formatDate(info.getValue(), "fr"),
          header: () => (
            <RenderTx tx={columnProp.labelTx} text={columnProp.label} />
          ),
        });
      case "status":
        return columnHelper.accessor("status", {
          //@ts-ignore //TS: Fix the type
          accessorFn: (row) => row,
          header: () => (
            <RenderTx tx={columnProp.labelTx} text={columnProp.label} />
          ),
          cell: (info) => <TableStatus row={info.getValue()} />,
        });

      case "actions":
        return columnHelper.display({
          id: columnProp.value,
          cell: (props) => (
            <TableActions
              id={props.row.original.id.toString()}
              handleDelete={handleDelete}
              handleView={() => {
                handleView(props.row.original);
              }}
              editLink={`/${model}/edit/${props.row.original.id}`}
            />
          ),
          header: () => (
            <RenderTx tx={columnProp.labelTx} text={columnProp.label} />
          ),
        });

      default:
        return null;
    }
  });

  // @ts-ignore
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    defaultColumn: {
      size: 200,
      minSize: 50,
      maxSize: 500,
    },
  });

  return (
    <div className="p-2">
      <ViewItemModal
        show={showPreviewModal}
        item={viewItem}
        onClose={() => setShowPreviewModal(false)}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          if (deletingItemId) {
            deleteItem(deletingItemId);
            setShowDeleteModal(false); // Close the modal after confirming
          }
        }}
      />
      <Table className="mt-5">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
      {/* <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button> */}
    </div>
  );
}
