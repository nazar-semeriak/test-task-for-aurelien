import {
  BaseItem,
  PaginationMeta,
  baseSchema,
  RestQueryParams,
} from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { MediaItem, mediaItemSchema } from "./user";

export type ActivityQueryParams = RestQueryParams & {
  filters?: ActivityFilters;
};
export interface ActivityFilters {
  startDate?: Date;
}

export type ActivityItem = BaseItem & {
  latitude?: number;
  longitude?: number;
  document: MediaItem;
};

export interface ActivitiesData {
  data: ActivityItem[];
  meta: PaginationMeta;
}
export interface ActivityData {
  data: ActivityItem;
  meta: PaginationMeta;
}

export interface ActivitiesResponse {
  data: ActivitiesData;
}

const activitiesSchema = baseSchema.concat(
  object({
    // category: mixed().oneOf(['culture', 'sport', 'kids', /* add more categories as needed */]).required(),
    cover: mediaItemSchema,
    document: mediaItemSchema,
  })
);

export type ActivityItemYup = InferType<typeof activitiesSchema>;
