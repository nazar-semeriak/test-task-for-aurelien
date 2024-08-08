import { MediaItem } from "./user";

type ImageUpload = { uri: string } | string | null | any;

export type LocationType = {
  longitude: number;
  latitude: number;
  address: string;
};

export const baseSchema = object({
  title: string().required(),
  content: string(),
  contentRtM: string(),
  startDate: date(),
  endDate: date(),
});

export type BaseItem = {
  id: number;
  title: string;
  description?: string;
  contentRTE?: string;
  startDate?: Date;
  endDate?: Date;
  publishedAt: Date;
  unPublishedAt?: Date;
  publishedDate?: Date;
  unPublishedDate?: Date;
  cover?: any;
  avatar?: any;
  status?: string;
  contact?: any;
};

export interface BasesData {
  data: BaseItem[];
  meta: PaginationMeta;
}

export interface BaseData {
  data: BaseItem;
  meta: PaginationMeta;
}

export type ItemType = {
  value: ValueType;
  label: I18n.Scope;
};

export type ValueType = string | number | boolean;

//****** TABLE ******\\
export type FormValues = BaseItem & {
  // dateRange?: {
  //   from?: Date | string | undefined | null | "" | number;
  //   to?: Date | null | string | number;
  // };
  // publishedDateRange?: {
  //   from?: Date | string | undefined | null | "" | number;
  //   to?: Date | null | string | number;
  // };
  id?: number;
  publishedDate?: Date;
  unPublishedDate?: Date;
  publishedAt?: Date;
  unPublishedAt?: Date;

  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  actions?: string;
  name?: string;
  surname?: string;
  dicastere?: string;
  function?: string;
  status?: string;
  address?: string;
  phone?: string;
  mail?: string;
  website?: string;
  type?: string; //TODO: Replace by type from ActivityType and after other types....

  // Ajoutez d'autres champs spécifiques au formulaire si nécessaire
};
// export type FormValues = {
//   id?: number;
//   title: string;
//   contentRTE?: any;
//   cover?: any;
//   type: "Actualités" | "Pilier public" | "Emploi"; //for Select
//   startDate?: Date;
//   endDate?: Date;
//   publishedAt?: Date;
//   unPublishedAt?: Date;
//   status?: string;
//   actions?: string;
//   publishedDateRange?: {
//     from?: Date;
//     to?: Date;
//   };
//   dateRange?: {
//     from?: Date;
//     to?: Date;
//   };
// };

export type ColumnProps = {
  value: keyof FormValues;
  label: string;
  labelTx?: string;
  type:
    | "string"
    | "date"
    | "status"
    | "actions"
    | "id"
    | "dateRange"
    | "custom";
};

//****** IMAGE ******\\
export const imageItemSchema = object({
  public_id: string(),
  url: string(),
});

// export type ImageItem = InferType<typeof imageItemSchema>;

export interface MediaItem {
  id?: string;
  url?: URL;
  provider_metadata?: any;
  // Define the properties of MediaItem here
  // ...
}

//****** FORM ******\\
export type FieldValidation = {
  type: string;
  required?: boolean;
  minLength?: number;
  min?: number;
  maxLenght?: number;
  format?: string;
};

//****** REQUEST ******\\
export interface RestQueryParams {
  fields?: string | string[];
  filters?: object;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
  sort?: string;
  populate: string | object;
  locale?: string | string[];
  publicationState?: "live" | "preview";
  cover?: any; //TODO: Replace by MediaItem from Pelop2.0
}

//General
export interface PaginationMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface Data {
  data: any;
  meta: PaginationMeta;
}
