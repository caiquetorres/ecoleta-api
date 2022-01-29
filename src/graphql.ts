
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    email: string;
    name: string;
    password: string;
}

export interface BaseEntity {
    createdAt: DateTime;
    deletedAt?: Nullable<DateTime>;
    id: string;
    updatedAt: DateTime;
}

export interface IMutation {
    createUser(input: CreateUserInput): UserEntity | Promise<UserEntity>;
}

export interface IQuery {
    ping(): string | Promise<string>;
    user(id: string): UserEntity | Promise<UserEntity>;
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
