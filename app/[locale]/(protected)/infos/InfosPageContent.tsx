"use client";
import Link from "next/link";

import { ActivitiesData } from "@/types/activity";
import { ReactTable } from "@/components/Table/ReactTable";
import { ColumnProps } from "@/types/global";
import { Button } from "@/components/ui/button";
import Fetcher from "@/components/Fetcher";
import PaginationMain from "@/components/section/Pagination";

export const InfosPageContent = () => {
  const title = "Les infos et services";

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
      <Fetcher<ActivitiesData> url="/infos">
        {({ data: infos, mutate, totalPages, goToPage, currentPage }) => {
          return (
            <div className="my-3 px-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{title}</h1>
                <Link href="/infos/create" passHref>
                  <Button>Créer un nouveau service</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <ReactTable
                  model="infos"
                  data={infos.data}
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
