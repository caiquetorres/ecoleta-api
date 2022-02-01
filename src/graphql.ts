
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum ItemEntitySortFields {
    name = "name"
}

export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC"
}

export enum SortNulls {
    NULLS_FIRST = "NULLS_FIRST",
    NULLS_LAST = "NULLS_LAST"
}

export interface CreateItemInput {
    name: string;
}

export interface CreateUserInput {
    email: string;
    name: string;
    password: string;
}

export interface CursorPaging {
    after?: Nullable<ConnectionCursor>;
    before?: Nullable<ConnectionCursor>;
    first?: Nullable<number>;
    last?: Nullable<number>;
}

export interface ItemEntityFilter {
    and?: Nullable<ItemEntityFilter[]>;
    name?: Nullable<StringFieldComparison>;
    or?: Nullable<ItemEntityFilter[]>;
}

export interface ItemEntitySort {
    direction: SortDirection;
    field: ItemEntitySortFields;
    nulls?: Nullable<SortNulls>;
}

export interface LoginInput {
    password: string;
    username: string;
}

export interface StringFieldComparison {
    eq?: Nullable<string>;
    gt?: Nullable<string>;
    gte?: Nullable<string>;
    iLike?: Nullable<string>;
    in?: Nullable<string[]>;
    is?: Nullable<boolean>;
    isNot?: Nullable<boolean>;
    like?: Nullable<string>;
    lt?: Nullable<string>;
    lte?: Nullable<string>;
    neq?: Nullable<string>;
    notILike?: Nullable<string>;
    notIn?: Nullable<string[]>;
    notLike?: Nullable<string>;
}

export interface BaseEntity {
    createdAt: DateTime;
    deletedAt?: Nullable<DateTime>;
    id: string;
    updatedAt: DateTime;
}

export interface ItemEntity extends BaseEntity {
    createdAt: DateTime;
    deletedAt?: Nullable<DateTime>;
    id: string;
    name: string;
    updatedAt: DateTime;
}

export interface ItemEntityConnection {
    edges: ItemEntityEdge[];
    pageInfo: PageInfo;
}

export interface ItemEntityEdge {
    cursor: ConnectionCursor;
    node: ItemEntity;
}

export interface IMutation {
    createItem(input: CreateItemInput): ItemEntity | Promise<ItemEntity>;
    createUser(input: CreateUserInput): UserEntity | Promise<UserEntity>;
    login(input: LoginInput): TokenModel | Promise<TokenModel>;
}

export interface PageInfo {
    endCursor?: Nullable<ConnectionCursor>;
    hasNextPage?: Nullable<boolean>;
    hasPreviousPage?: Nullable<boolean>;
    startCursor?: Nullable<ConnectionCursor>;
}

export interface IQuery {
    item(id: string): ItemEntity | Promise<ItemEntity>;
    items(filter?: Nullable<ItemEntityFilter>, paging?: Nullable<CursorPaging>, sorting?: Nullable<ItemEntitySort[]>): ItemEntityConnection | Promise<ItemEntityConnection>;
    me(): UserEntity | Promise<UserEntity>;
    ping(): string | Promise<string>;
    user(id: string): UserEntity | Promise<UserEntity>;
}

export interface TokenModel {
    expiresIn: string;
    token: string;
}

export interface UserEntity extends BaseEntity {
    createdAt: DateTime;
    deletedAt?: Nullable<DateTime>;
    email: string;
    id: string;
    name: string;
    roles: string[];
    updatedAt: DateTime;
}

export type ConnectionCursor = any;
export type DateTime = any;
type Nullable<T> = T | null;
