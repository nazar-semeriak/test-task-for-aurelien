import { formatDateTime } from "@/lib/helper";

import React from "react";
import Image from "next/image";

import { MediaItem } from "@/types/user";
import { useLocale } from "next-intl";

import { LocationType } from "@/types/global";
import RenderTx from "../locale/LanguageHelper";

interface PhonePreviewProps {
  entity: {
    title?: string;
    contentRTE?: any;
    contentQuill?: any;
    publishedAt?: any;
    unPublishedAt?: any;
    unPublishedDate?: any;
    cover?: MediaItem | string | undefined | any;
    avatar?: MediaItem | string | undefined | any;
    startDate?: Date;
    name?: string;
    surname?: string;
    dicastere?: string;
    descriptionDicastere?: any;
    politicalParty?: string;
    fonction?: string;
    suppleant?: string;
    notification?: boolean;
    mail?: string;
    website?: string;
    location?: LocationType;
    phone?: string;
    type?: string;
    startdate?: Date;
    endDate?: Date;
  };
  previewType?:
    | "activities"
    | "actualities"
    | "locations"
    | "settings"
    | "infos"
    | "bidoums"
    | "teams"; //TS: Do not repeat this types re
}

export const getFormattedSrc = (
  media: MediaItem | string | undefined | any
) => {
  if (typeof media === "string") {
    return media;
  } else if (media?.url) {
    return media.url;
  } else if (media) {
    return URL.createObjectURL(media[0]);
  } else {
    return "";
  }
};

export const PhonePreview = ({ entity, previewType }: PhonePreviewProps) => {
  const {
    title,
    contentQuill,
    cover,
    avatar,
    location,
    publishedAt,

    name,
    surname,
    dicastere,
    descriptionDicastere,
    politicalParty,
    fonction,
    suppleant,
    mail,
    website,
    phone,
    type,
    startDate,
    endDate,
    notification,
  } = entity || "";

  const locale = useLocale();

  // cover && (typeof cover === "string" ? cover : URL.createObjectURL(cover[0]));

  const coverSrc = getFormattedSrc(cover);

  const RenderDate = ({ date }: any) => {
    return (
      date && (
        <p className="mt-2 text-sm text-gray-500">
          <i className="fa fa-calendar pe-2"></i>
          {formatDateTime(date, locale)}
        </p>
      )
    );
  };

  const RenderEventDate = ({ startDate, endDate }: any) => {
    return (
      startDate && (
        <p className="mt-2 text-sm text-gray-500">
          <i className="fa fa-calendar pe-2"></i>
          {formatDateTime(startDate, locale)}
          {endDate && (
            <>
              <i className="fa fa-arrow-right px-2"></i>
              {formatDateTime(endDate, locale)}
            </>
          )}
        </p>
      )
    );
  };

  const RenderContentQuill = ({ contentQuill }: any) => {
    return (
      contentQuill && (
        <div
          className="quill mt-2"
          dangerouslySetInnerHTML={{
            __html: contentQuill,
          }}
        />
      )
    );
  };

  const RenderCover = ({ cover }: { cover: string }) => {
    return (
      <div className="flex justify-center mt-2">
        <Image
          src={cover}
          alt="Cover Image"
          className="rounded-lg"
          width={320}
          height={160}
          objectFit="cover"
        />
      </div>
    );
  };

  const RenderAvatar = ({
    avatar,
  }: {
    avatar: MediaItem | string | undefined | any;
  }) => {
    return (
      <div className="position-relative mx-auto">
        {avatar && (
          <Image
            src={avatar}
            alt="Avatar Image"
            width={160}
            height={160}
            quality={100}
            className="rounded-full aspect-square object-cover" //DOC: nice tailwindcss class for image
          />
        )}
      </div>
    );
  };

  const RenderTeamText = ({ text, tx }: { text?: string; tx: any }) => {
    return (
      text && (
        <h3 className="text-md">
          <span className="font-semibold">
            <RenderTx tx={tx} /> :
          </span>
          {text}
        </h3>
      )
    );
  };

  const RenderTitle = ({ title }: { title?: string }) => {
    return title && <h1 className="text-2xl font-bold break-words">{title}</h1>;
  };

  const RenderAddress = ({ address }: { address?: string }) => {
    return address && <h1 className="text-md">{address}</h1>;
  };

  //STYLE: Add icon from mobile app (lucid icon)
  const RenderType = ({ type }: { type?: string }) => {
    return type && <h3 className="text-lg break-words">{type}</h3>;
  };

  const RenderTeam = () => {
    return (
      <>
        <div className="flex flex-col gap-1">
          {avatar && <RenderAvatar avatar={getFormattedSrc(avatar)} />}

          <h1 className="text-2xl font-bold break-words">
            {title} {surname} {name}
          </h1>

          <div className="text-left">
            <RenderTeamText text={fonction} tx="Form.fonction" />
            <RenderTeamText text={mail} tx="Form.mail" />
            <RenderTeamText text={phone} tx="Form.phone" />
            <RenderTeamText text={dicastere} tx="Form.dicastere" />
            <RenderContentQuill contentQuill={descriptionDicastere} />
            <RenderTeamText text={politicalParty} tx="Form.politicalParty" />
            <RenderTeamText text={suppleant} tx="Form.suppleant" />
          </div>
        </div>
      </>
    );
  };

  const RenderActivity = () => {
    return (
      <>
        <div className="flex flex-col gap-1">
          {cover && <RenderCover cover={getFormattedSrc(coverSrc)} />}

          <div className="text-left">
            <RenderType type={type} />
            <RenderTitle title={title} />
            {startDate && (
              <h3 className="text-md">
                <RenderTx tx="Form.eventDateRange" />
              </h3>
            )}
            <RenderEventDate startDate={startDate} endDate={endDate} />
            <RenderContentQuill contentQuill={contentQuill} />
          </div>
        </div>
      </>
    );
  };

  const RenderLocation = () => {
    return (
      <>
        <div className="flex flex-col gap-1">
          {cover && <RenderCover cover={getFormattedSrc(coverSrc)} />}

          <div className="text-left">
            <RenderType type={type} />
            <RenderTitle title={title} />
            <RenderAddress address={location?.address} />
            <RenderContentQuill contentQuill={contentQuill} />
          </div>
        </div>
      </>
    );
  };

  const RenderInfo = () => {
    return (
      <>
        <div className="flex flex-col gap-1 ">
          <div className="text-left">
            <RenderType type={type} />
            <RenderTitle title={title} />
            <RenderContentQuill contentQuill={contentQuill} />
          </div>
        </div>
      </>
    );
  };

  const RenderDefault = () => {
    return (
      <>
        {cover && <RenderCover cover={getFormattedSrc(coverSrc)} />}
        <div className="mt-1 text-left">
          <RenderType type={type} />
          <RenderDate date={publishedAt} />
          <RenderTitle title={title} />

          <RenderContentQuill contentQuill={contentQuill} />
        </div>
      </>
    );
  };

  const RenderContact = () => {
    return (
      //STYLE: Align flex bottom
      <div className="flex flex-col gap-2 text-left">
        <div>
          <i className="fa fa-envelope pe-2 "></i>
          {mail}
        </div>
        <div>
          <i className="fa fa-phone pe-2"></i>
          {phone}
        </div>
        {/* //add website */}
        <div>
          <i className="fa fa-globe pe-2"></i>
          {website}
        </div>
      </div>
    );
  };

  const renderContentByType = () => {
    switch (previewType) {
      case "teams":
        return <RenderTeam />;
      case "activities":
        return <RenderActivity />;
      case "locations":
        return <RenderLocation />;
      case "infos":
        return <RenderInfo />;
      case "settings":
        return <RenderContact />;
      default:
        return <RenderDefault />;
    }
  };

  return (
    <div className="marvel-device iphone-x">
      <div className="notch">
        <div className="camera"></div>
        <div className="speaker"></div>
      </div>
      <div className="top-bar"></div>
      <div className="sleep"></div>
      <div className="bottom-bar"></div>
      <div className="volume"></div>
      <div className="overflow">
        <div className="shadow shadow--tr"></div>
        <div className="shadow shadow--tl"></div>
        <div className="shadow shadow--br"></div>
        <div className="shadow shadow--bl"></div>
      </div>
      <div className="inner-shadow"></div>
      <div className="screen flex justify-center items-center">
        <div className="w-full h-full max-w-md p-4 overflow-y-auto">
          {/* //Use the previewTypeSwitch to display the right data */}
          <Image
            src="/img/logo-daillens.png"
            alt="Logo Daillens"
            width={130}
            height={64}
            className="mx-auto my-5"
          />
          {renderContentByType()}
        </div>
      </div>
    </div>
  );
};
