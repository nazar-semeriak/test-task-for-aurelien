import {
  BaseItem,
  PaginationMeta,
  baseSchema,
  RestQueryParams,
} from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { MediaItem, mediaItemSchema } from "./user";

export type ActualityQueryParams = RestQueryParams & {
  filters?: ActualityFilters;
};
export interface ActualityFilters {
  startDate?: Date;
}

export type ActualityItem = BaseItem & {
  type: "Actualités" | "Pilier public" | "Emploi";
  document: MediaItem;
};

export interface ActualitiesData {
  data: ActualityItem[];
  meta: PaginationMeta;
}

export interface ActualityData {
  data: ActualityItem;
  meta: PaginationMeta;
}

const actualitiesSchema = baseSchema.concat(
  object({
    type: mixed().oneOf(["news", "jobs"]).required(),
    cover: mediaItemSchema,
    document: mediaItemSchema,
  })
);

export type ActualityItemYup = InferType<typeof actualitiesSchema>;
