import React from "react";
import { getTranslations } from "next-intl/server";

export default async function RenderTxServer({
  tx,
  text,
}: {
  tx?: string;
  text?: string;
}) {
  //FIXME: Ca ne marche pas. bien
  // const t = useTranslations("");

  const t = await getTranslations("");

  if (tx) {
    return <span>{t(tx)}</span>;
  } else if (text) {
    return <span>{text}</span>;
  } else {
    return null;
  }
}
