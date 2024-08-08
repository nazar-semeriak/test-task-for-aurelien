import {
  object,
  string,
  number,
  date,
  InferType,
  lazy,
  boolean,
  array,
} from "yup";

export const userItemSchema: any = lazy(() =>
  object({
    id: number().required().positive().integer(),
    username: string().nullable(),
    email: string().email().nullable(),
    provider: string().nullable(),
    password: string().nullable(),
    resetPasswordToken: string().nullable(),
    confirmationToken: string().nullable(),
    confirmed: boolean().nullable(),
    blocked: boolean().nullable(),
    firstName: string().nullable(),
    lastName: string().nullable(),
    followers: array().of(userItemSchema).nullable(),
    followings: array().of(userItemSchema).nullable(),
    // avatar: mediaItemSchema.nullable(),
    // favoriteSports: array().of(sportItemSchema).nullable(),
    // Other fields as necessary
  })
);

export type UserItem = InferType<typeof userItemSchema>;

export interface UsersData {
  data: UserItem[];
  meta: any;
}

export interface MediaItem {
  id?: string;
  url?: string;
  provider_metadata?: any;
}

export const mediaItemSchema = object({
  id: string().required(),
  url: string().required(),
  provider_metadata: object().nullable(),
});
