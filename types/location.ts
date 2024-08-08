import {
  BaseItem,
  PaginationMeta,
  baseSchema,
  RestQueryParams,
} from "./global";

import { object, string, number, date, InferType, array, mixed } from "yup";
import { MediaItem, mediaItemSchema } from "./user";

export type LocationQueryParams = RestQueryParams & {
  filters?: LocationFilters;
};
export interface LocationFilters {
  startDate?: Date;
}

export type LocationItem = BaseItem & {
  //TODO: Gety type from backend and add the possiblity for the client to add new types...

  type:
    | "Sport"
    | "Salle"
    | "Administration"
    | "Incident"
    | "Santé"
    | "Culture"
    | "Religion"
    | "Divers"
    | "Education";

  latitude: number;
  longitude: number;
  address?: string;
};

export interface LocationData {
  data: LocationItem;
  meta: PaginationMeta;
}

const locationsSchema = baseSchema.concat(
  object({
    address: string(),
    longitude: number().required(),
    latitude: number().required(),
    cover: mediaItemSchema,
  })
);

export type LocationItemYup = InferType<typeof locationsSchema>;
