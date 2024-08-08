"use client";
import Link from "next/link";

import { ActivitiesData } from "@/types/activity";
import { ReactTable } from "@/components/Table/ReactTable";
import { ColumnProps } from "@/types/global";
import { Button } from "@/components/ui/button";
import Fetcher from "@/components/Fetcher";
import PaginationMain from "@/components/section/Pagination";

export const ActivitiesPageContent = () => {
  const title = "Les événements";

  //Mandatory
  const columnsProps: ColumnProps[] = [
    { value: "id", label: "id", labelTx: "Table.id", type: "id" },
    { value: "type", label: "Type", labelTx: "Table.type", type: "string" },

    { value: "title", label: "Titre", labelTx: "Table.title", type: "string" },
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
      value: "startDate",
      labelTx: "Table.startDate",
      label: "Start Date",
      type: "date",
    },
    {
      value: "endDate",
      labelTx: "Table.endDate",
      label: "End Date",
      type: "date",
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
      <Fetcher url="/activities" sort="startDate:asc">
        {({ data: activities, mutate, totalPages, goToPage, currentPage }) => {
          return (
            //TODO: Create a component for this
            <div className="my-3 px-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{title}</h1>
                <Link href="/activities/create" passHref>
                  <Button>Créer un nouvel événement</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <ReactTable
                  model="activities"
                  data={activities.data}
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
