"use client";
import { useTranslations } from "next-intl";
import React from "react";

export default function RenderTx({ tx, text }: { tx?: string; text?: string }) {
  const t = useTranslations("");

  if (tx) {
    return <span>{t(tx)}</span>;
  } else if (text) {
    return <span>{text}</span>;
  } else {
    return null;
  }
}
