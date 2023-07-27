export interface baseRequest<T, E = any> {
  loading: boolean;
  error: null | E;
  data: null | T;
}

export enum ActionType {
  GET_ANIMAL_LIST_START = 'GET_ANIMAL_LIST_START',
  GET_ANIMAL_LIST_SUCCESS = 'GET_ANIMAL_LIST_SUCCESS',
  GET_ANIMAL_LIST_ERROR = 'GET_ANIMAL_LIST_ERROR',
}

export interface AnimalList {
  entries: AnimalEntry[];
  meta: AnimalListMeta;
}

export interface AnimalEntry {
  meta: EntryMeta;
  fields: Fields;
}

export interface Fields {
  image: Image;
}

export interface Image {
  url: string;
  tags: any[];
  uuid: string;
  title: string;
  altText: null;
  description: null;
  contentType: ContentType;
}

export type ContentType = 'image/jpeg';

export interface EntryMeta {
  name: string;
  slug: string;
  tags: any[];
  type: string;
  uuid: string;
  space: string;
  author: Author;
  locale: string;
  excerpt: string;
  private: boolean;
  targets: any[];
  category: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  unpublishAt: null;
  versionType: string;
  categoryName: null;
  categorySlug: null;
  availableLocales: string[];
}

export interface Author {}

export interface AnimalListMeta {
  totalEntries: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}
