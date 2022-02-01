
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateItemInput {
    name: string;
}

export interface CreateUserInput {
    email: string;
    name: string;
    password: string;
}

export interface LoginInput {
    password: string;
    username: string;
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

export interface IMutation {
    createItem(input: CreateItemInput): ItemEntity | Promise<ItemEntity>;
    createUser(input: CreateUserInput): UserEntity | Promise<UserEntity>;
    login(input: LoginInput): TokenModel | Promise<TokenModel>;
}

export interface IQuery {
    item(id: string): ItemEntity | Promise<ItemEntity>;
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

export type DateTime = any;
type Nullable<T> = T | null;
