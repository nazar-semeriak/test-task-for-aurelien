import { Badge } from "@/components/ui/badge";
import React from "react";

type Props = {
  row: any; //TS: Get rid of any
};

export default function TableStatus({ row }: Props) {
  const { publishedAt, publishedDate, unPublishedDate } = row || "";

  const now = new Date();
  const publishedDateObj = new Date(publishedDate);
  const unPublishedDateObj = new Date(unPublishedDate);
  const publishedAtObj = new Date(publishedAt);

  if (unPublishedDate && unPublishedDateObj <= now) {
    return <Badge variant="error">Dépublié</Badge>;
  }

  if (publishedDateObj > now) {
    return <Badge>Programmé</Badge>;
  }

  if (!publishedDate) {
    return <Badge variant="warning">Brouillon</Badge>;
  }

  if (publishedAtObj <= now) {
    return <Badge variant="success">Publié</Badge>;
  }

  return <Badge>Defaut</Badge>;
}
