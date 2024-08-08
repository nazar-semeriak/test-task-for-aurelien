"use client";
import { Button } from "@/components/ui/button";
import { useGForm } from "../FormikForm.props";
import { RiLoader2Line, RiRecordCircleFill } from "@remixicon/react";
import { useTranslations } from "next-intl";
import RenderTx from "@/components/locale/LanguageHelper";
import CreateLocationPage from "@/app/[locale]/(protected)/locations/create/page";

export default function SubmitButton({ onPress, ...props }: any) {
  const { setFieldValue, isSubmitting, values } = useGForm();
  const t = useTranslations("");

  const now = new Date();
  const text =
    values?.publishedDate > now
      ? t("Form.planification")

      : values?.publishedDate === undefined
      ? t("Form.saveDraft")
      : t("Form.publish");

  return (
    <div className="mt-8 flex items-center  space-x-2">
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <>
            <RiLoader2Line className="animate-spin mr-2" />
            {/* {t("General.loading")} */}
            <RenderTx tx="General.loading" />
          </>
        ) : (
          text
        )}
      </Button>
      {props.saveDraft && (
        <Button
          className="me-3"
          variant="secondary"
          type="submit"
          onClick={() => setFieldValue("publishedAt", null)}
        >
          {t("Form.saveDraft")}
        </Button>
      )}
    </div>
  );
}
