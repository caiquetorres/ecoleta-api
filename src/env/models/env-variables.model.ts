import {
  IsBoolean,
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

/**
 * Class that represents how environment variables should be set before
 * the application starts.
 */
export class EnvVariables {
  @IsDefined({ message: 'It is required to set the "NODE_ENV"' })
  @IsString({ message: 'It is required to set a valid string value' })
  @IsIn(['test', 'development', 'production'])
  NODE_ENV: string

  @IsOptional()
  @IsString({ message: 'It is required to set a valid string value' })
  PACKAGE_VERSION?: string

  @IsOptional()
  @IsNumber({}, { message: 'It is required to set a number value' })
  PORT?: number

  //#region HTTP

  @IsDefined({ message: 'It is required to set the http timeout' })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'It is required to set a valid number value' },
  )
  HTTP_TIMEOUT: number

  //#endregion

  //#region JWT

  @IsDefined({ message: 'It is required to set the jwt secret' })
  @IsString({ message: 'It is required to set a valid string value' })
  JWT_SECRET: string

  @IsDefined({ message: 'It is required to set the jwt expires in' })
  @IsString({ message: 'It is required to set a valid string value' })
  JWT_EXPIRES_IN: string

  //#endregion

  //#region Rate limit

  @IsDefined({ message: 'It is required to set the throttler time to live' })
  @IsNumber({}, { message: 'It is required to set a valid number' })
  THROTTLER_TTL: number

  @IsDefined({ message: 'It is required to set the throttler limit' })
  @IsNumber({}, { message: 'It is required to set a valid number' })
  THROTTLER_LIMIT: number

  //#endregion

  //#region Database

  @IsDefined({ message: 'It is required to set the database type' })
  @IsString({ message: 'It is required to send a valid string value' })
  @IsIn(['postgres', 'sqlite'])
  DATABASE_TYPE: 'postgres' | 'sqlite'

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  DATABASE_URL?: string

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  DATABASE_DATABASE?: string

  @IsOptional()
  @IsNumber({}, { message: 'It is required to send a number value' })
  DATABASE_PORT?: number

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  DATABASE_HOST?: string

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  DATABASE_USERNAME?: string

  @IsOptional()
  @IsString({ message: 'It is required to send a valid string value' })
  DATABASE_PASSWORD?: string

  @IsOptional()
  @IsBoolean({ message: 'It is required to send a boolean value' })
  DATABASE_SYNCHRONIZE?: boolean

  @IsOptional()
  @IsBoolean({ message: 'It is required to send a boolean value' })
  DATABASE_MIGRATIONS_RUN?: boolean

  @IsOptional()
  @IsBoolean({ message: 'It is required to send a boolean value' })
  DATABASE_SSL?: boolean

  //#endregion

  //#region Swagger

  @IsDefined({ message: 'It is required to set the swagger title' })
  @IsString({ message: 'It is required to set a valid string value' })
  SWAGGER_TITLE: string

  @IsDefined({ message: 'It is required to set the swagger description' })
  @IsString({ message: 'It is required to set a valid string value' })
  SWAGGER_DESCRIPTION: string

  @IsDefined({ message: 'It is required to set the swagger version' })
  @IsString({ message: 'It is required to set a valid string value' })
  SWAGGER_VERSION: string

  @IsDefined({ message: 'It is required to set the swagger tag' })
  @IsString({ message: 'It is required to set a valid string value' })
  SWAGGER_TAG: string

  //#endregion
}
