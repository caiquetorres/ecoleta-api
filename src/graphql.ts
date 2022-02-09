
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum ImageEntitySortFields {
    title = "title",
    url = "url"
}

export enum ItemEntitySortFields {
    imageId = "imageId",
    name = "name"
}

export enum PointEntitySortFields {
    addressId = "addressId",
    description = "description",
    email = "email",
    imageId = "imageId",
    name = "name",
    whatsapp = "whatsapp"
}

export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC"
}

export enum SortNulls {
    NULLS_FIRST = "NULLS_FIRST",
    NULLS_LAST = "NULLS_LAST"
}

export interface CreateAddressInput {
    city: string;
    country: string;
    district: string;
    state: string;
    street: string;
}

export interface CreateImageInput {
    title?: Nullable<string>;
    url: string;
}

export interface CreateItemInput {
    image?: Nullable<CreateImageInput>;
    name: string;
}

export interface CreatePointInput {
    address: CreateAddressInput;
    description: string;
    email: string;
    image: CreateImageInput;
    name: string;
    whatsapp: string;
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

export interface ImageEntityFilter {
    and?: Nullable<ImageEntityFilter[]>;
    or?: Nullable<ImageEntityFilter[]>;
    title?: Nullable<StringFieldComparison>;
    url?: Nullable<StringFieldComparison>;
}

export interface ImageEntitySort {
    direction: SortDirection;
    field: ImageEntitySortFields;
    nulls?: Nullable<SortNulls>;
}

export interface ItemEntityFilter {
    and?: Nullable<ItemEntityFilter[]>;
    imageId?: Nullable<StringFieldComparison>;
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

export interface PointEntityFilter {
    addressId?: Nullable<StringFieldComparison>;
    and?: Nullable<PointEntityFilter[]>;
    description?: Nullable<StringFieldComparison>;
    email?: Nullable<StringFieldComparison>;
    imageId?: Nullable<StringFieldComparison>;
    name?: Nullable<StringFieldComparison>;
    or?: Nullable<PointEntityFilter[]>;
    whatsapp?: Nullable<StringFieldComparison>;
}

export interface PointEntitySort {
    direction: SortDirection;
    field: PointEntitySortFields;
    nulls?: Nullable<SortNulls>;
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

export interface UpdateAddressInput {
    city: string;
    country: string;
    district: string;
    state: string;
    street: string;
}

export interface UpdateImageInput {
    title?: Nullable<string>;
    url: string;
}

export interface UpdateItemInput {
    image: UpdateImageInput;
    name: string;
}

export interface UpdatePointInput {
    address?: Nullable<UpdateAddressInput>;
    description?: Nullable<string>;
    email?: Nullable<string>;
    image?: Nullable<UpdateImageInput>;
    name?: Nullable<string>;
    whatsapp?: Nullable<string>;
}

export interface UpdateUserInput {
    email: string;
    name: string;
}

export interface BaseEntity {
    createdAt: DateTime;
    deletedAt?: Nullable<DateTime>;
    id: string;
    updatedAt: DateTime;
}

export interface AddressEntity extends BaseEntity {
    city: string;
    country: string;
    createdAt: DateTime;
    deletedAt?: Nullable<DateTime>;
    district: string;
    id: string;
    state: string;
    street: string;
    updatedAt: DateTime;
}

export interface ImageEntity extends BaseEntity {
    createdAt: DateTime;
    deletedAt?: Nullable<DateTime>;
    id: string;
    title?: Nullable<string>;
    updatedAt: DateTime;
    url: string;
}

export interface ImageEntityConnection {
    edges: ImageEntityEdge[];
    pageInfo: PageInfo;
}

export interface ImageEntityEdge {
    cursor: ConnectionCursor;
    node: ImageEntity;
}

export interface ItemEntity extends BaseEntity {
    createdAt: DateTime;
    deletedAt?: Nullable<DateTime>;
    id: string;
    image: ImageEntity;
    imageId?: Nullable<string>;
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
    createImage(input: CreateImageInput): ImageEntity | Promise<ImageEntity>;
    createItem(input: CreateItemInput): ItemEntity | Promise<ItemEntity>;
    createPoint(input: CreatePointInput): PointEntity | Promise<PointEntity>;
    createUser(input: CreateUserInput): UserEntity | Promise<UserEntity>;
    deleteImage(id: string): ImageEntity | Promise<ImageEntity>;
    deleteItem(id: string): ItemEntity | Promise<ItemEntity>;
    deletePoint(id: string): PointEntity | Promise<PointEntity>;
    deleteUser(id: string): UserEntity | Promise<UserEntity>;
    disableImage(id: string): ImageEntity | Promise<ImageEntity>;
    disableItem(id: string): ItemEntity | Promise<ItemEntity>;
    disablePoint(id: string): PointEntity | Promise<PointEntity>;
    disableUser(id: string): UserEntity | Promise<UserEntity>;
    enableImage(id: string): ImageEntity | Promise<ImageEntity>;
    enableItem(id: string): ItemEntity | Promise<ItemEntity>;
    enablePoint(id: string): PointEntity | Promise<PointEntity>;
    enableUser(id: string): UserEntity | Promise<UserEntity>;
    login(input: LoginInput): TokenModel | Promise<TokenModel>;
    updateImage(id: string, input: UpdateImageInput): ImageEntity | Promise<ImageEntity>;
    updateItem(id: string, input: UpdateItemInput): ItemEntity | Promise<ItemEntity>;
    updatePoint(id: string, input: UpdatePointInput): PointEntity | Promise<PointEntity>;
    updateUser(id: string, input: UpdateUserInput): UserEntity | Promise<UserEntity>;
}

export interface PageInfo {
    endCursor?: Nullable<ConnectionCursor>;
    hasNextPage?: Nullable<boolean>;
    hasPreviousPage?: Nullable<boolean>;
    startCursor?: Nullable<ConnectionCursor>;
}

export interface PointEntity extends BaseEntity {
    address: AddressEntity;
    addressId?: Nullable<string>;
    createdAt: DateTime;
    deletedAt?: Nullable<DateTime>;
    description?: Nullable<string>;
    email?: Nullable<string>;
    id: string;
    image: ImageEntity;
    imageId?: Nullable<string>;
    name: string;
    updatedAt: DateTime;
    whatsapp?: Nullable<string>;
}

export interface PointEntityConnection {
    edges: PointEntityEdge[];
    pageInfo: PageInfo;
}

export interface PointEntityEdge {
    cursor: ConnectionCursor;
    node: PointEntity;
}

export interface IQuery {
    image(id: string): ImageEntity | Promise<ImageEntity>;
    images(filter?: Nullable<ImageEntityFilter>, paging?: Nullable<CursorPaging>, sorting?: Nullable<ImageEntitySort[]>): ImageEntityConnection | Promise<ImageEntityConnection>;
    item(id: string): ItemEntity | Promise<ItemEntity>;
    items(filter?: Nullable<ItemEntityFilter>, paging?: Nullable<CursorPaging>, sorting?: Nullable<ItemEntitySort[]>): ItemEntityConnection | Promise<ItemEntityConnection>;
    me(): UserEntity | Promise<UserEntity>;
    ping(): string | Promise<string>;
    point(id: string): PointEntity | Promise<PointEntity>;
    points(filter?: Nullable<PointEntityFilter>, paging?: Nullable<CursorPaging>, sorting?: Nullable<PointEntitySort[]>): PointEntityConnection | Promise<PointEntityConnection>;
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
