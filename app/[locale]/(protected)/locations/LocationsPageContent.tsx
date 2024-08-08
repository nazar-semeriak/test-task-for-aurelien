"use client";
import Link from "next/link";

import { ActivitiesData } from "@/types/activity";
import { ReactTable } from "@/components/Table/ReactTable";
import { ColumnProps } from "@/types/global";
import { Button } from "@/components/ui/button";
import Fetcher from "@/components/Fetcher";
import PaginationMain from "@/components/section/Pagination";

export const LocationsPageContent = () => {
  const title = "Les locations";

  //Mandatory
  const columnsProps: ColumnProps[] = [
    { value: "id", label: "id", labelTx: "Table.id", type: "id" },
    { value: "title", label: "Titre", labelTx: "Table.title", type: "string" },
    { value: "type", label: "Type", labelTx: "Table.type", type: "string" },
    {
      value: "publishedDate",
      labelTx: "Table.publishedDate",
      label: "Date de début",
      type: "date",
    },
    {
      value: "unPublishedDate",
      labelTx: "Table.unPublishedDate",
      label: "Date de fin",
      type: "date",
    },

    {
      //@ts-ignore
      value: "location.address",
      labelTx: "Table.address",
      label: "Address",
      type: "string",
    },
    {
      value: "status",
      labelTx: "Table.status",
      label: "Status",
      type: "status",
    },
    {
      value: "actions",
      labelTx: "Table.actions",
      label: "Actions",
      type: "actions",
    },
  ];

  return (
    <>
      <Fetcher<ActivitiesData> url="/locations">
        {({ data: locations, mutate, totalPages, goToPage, currentPage }) => {
          return (
            <div className="my-3 px-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{title}</h1>
                <Link href="/locations/create" passHref>
                  <Button>Créer une nouvelle location</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <ReactTable
                  model="locations"
                  data={locations.data}
                  columnsProps={columnsProps}
                  mutate={mutate}
                />
                <PaginationMain
                  currentPage={currentPage}
                  totalPages={totalPages}
                  goToPage={goToPage}
                />
              </div>
            </div>
          );
        }}
      </Fetcher>
    </>
  );
};
