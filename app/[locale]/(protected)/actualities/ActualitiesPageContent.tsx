"use client";
import Link from "next/link";

import { ActivitiesData, ActivityItem } from "@/types/activity";
import { ReactTable } from "@/components/Table/ReactTable";
import { ColumnProps } from "@/types/global";
import { Button } from "@/components/ui/button";
import Fetcher from "@/components/Fetcher";
import { useState } from "react";
import useSWR from "swr";
import { fetchUseSWR } from "@/request/request";
import * as qs from "qs";
import { ActualitiesData } from "@/types/actuality";
import { Pagination } from "@tanstack/react-table";
import PaginationMain from "@/components/section/Pagination";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const ActualitiesPageContent = () => {
  const title = "Les actualités";

  //Mandatory
  const columnsProps: ColumnProps[] = [
    { value: "id", label: "id", labelTx: "Table.id", type: "id" },
    { value: "type", label: "Type", labelTx: "Table.type", type: "string" },

    { value: "title", label: "Titre", labelTx: "Table.title", type: "string" },
    {
      value: "publishedDate",
      // value: "publishedDate",
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

  //Temp test query
  // function Page({ index }: any) {
  //   const effectiveParams = {
  //     pagination: { page: index + 1, pageSize: 2 },
  //   };

  //   const queryString = qs.stringify(effectiveParams, {
  //     encode: false,
  //     arrayFormat: "indices",
  //     allowDots: false,
  //   });

  //   const { data } = useSWR(`/actualities?${queryString}`, fetchUseSWR);

  //   if (!data) return <div>Loading...</div>;

  //   return data?.data?.map((item: any) => (
  //     <div key={item.id}>{item.title}</div>
  //   ));
  // }

  // const [cnt, setCnt] = useState(1);

  // const pages = [];
  // for (let i = 0; i < cnt; i++) {
  //   pages.push(<Page index={i} key={i} />);
  // }

  return (
    <>
      <Fetcher<ActualitiesData> url="/actualities">
        {({ data: actualities, mutate, totalPages, goToPage, currentPage }) => {
          return (
            <div className="my-3 px-4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">{title}</h1>
                <Link href="/actualities/create" passHref>
                  <Button>Créer une nouvelle actualité</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <ReactTable
                  model="actualities"
                  data={actualities?.data}
                  columnsProps={columnsProps}
                  mutate={mutate}
                />
                <PaginationMain
                  currentPage={currentPage}
                  totalPages={totalPages}
                  goToPage={goToPage}
                />
                {/* <div className="flex justify-center">
                  <Button
                    onClick={loadMore}
                    disabled={!hasNextPage}
                    loading={isLoading}
                  >
                    Charger plus
                  </Button>
                </div> */}
              </div>
            </div>
          );
        }}
      </Fetcher>
    </>
  );
};
