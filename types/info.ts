import {
  BaseItem,
  PaginationMeta,
  baseSchema,
  RestQueryParams,
} from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { MediaItem, mediaItemSchema } from "./user";

export type InfoQueryParams = RestQueryParams & {
  filters?: InfoFilters;
};
export interface InfoFilters {
  startDate?: Date;
}

export type InfoItem = BaseItem & {
  cover: MediaItem;
  document: MediaItem;
};

export interface InfoData {
  data: InfoItem[];
  meta: PaginationMeta;
}

const infosSchema = baseSchema.concat(
  object({
    type: mixed().oneOf(["news", "jobs"]).required(),
    cover: mediaItemSchema,
    document: mediaItemSchema,
  })
);

export type InfoItemYup = InferType<typeof infosSchema>;
