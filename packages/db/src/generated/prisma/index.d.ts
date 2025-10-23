
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Avatar
 * 
 */
export type Avatar = $Result.DefaultSelection<Prisma.$AvatarPayload>
/**
 * Model Element
 * 
 */
export type Element = $Result.DefaultSelection<Prisma.$ElementPayload>
/**
 * Model Map
 * 
 */
export type Map = $Result.DefaultSelection<Prisma.$MapPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Space
 * 
 */
export type Space = $Result.DefaultSelection<Prisma.$SpacePayload>
/**
 * Model MapElement
 * 
 */
export type MapElement = $Result.DefaultSelection<Prisma.$MapElementPayload>
/**
 * Model SpaceElement
 * 
 */
export type SpaceElement = $Result.DefaultSelection<Prisma.$SpaceElementPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  admin: 'admin',
  user: 'user'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Avatars
 * const avatars = await prisma.avatar.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Avatars
   * const avatars = await prisma.avatar.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.avatar`: Exposes CRUD operations for the **Avatar** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Avatars
    * const avatars = await prisma.avatar.findMany()
    * ```
    */
  get avatar(): Prisma.AvatarDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.element`: Exposes CRUD operations for the **Element** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Elements
    * const elements = await prisma.element.findMany()
    * ```
    */
  get element(): Prisma.ElementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.map`: Exposes CRUD operations for the **Map** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Maps
    * const maps = await prisma.map.findMany()
    * ```
    */
  get map(): Prisma.MapDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.space`: Exposes CRUD operations for the **Space** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Spaces
    * const spaces = await prisma.space.findMany()
    * ```
    */
  get space(): Prisma.SpaceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mapElement`: Exposes CRUD operations for the **MapElement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MapElements
    * const mapElements = await prisma.mapElement.findMany()
    * ```
    */
  get mapElement(): Prisma.MapElementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.spaceElement`: Exposes CRUD operations for the **SpaceElement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SpaceElements
    * const spaceElements = await prisma.spaceElement.findMany()
    * ```
    */
  get spaceElement(): Prisma.SpaceElementDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.3
   * Query Engine version: bb420e667c1820a8c05a38023385f6cc7ef8e83a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Avatar: 'Avatar',
    Element: 'Element',
    Map: 'Map',
    User: 'User',
    Space: 'Space',
    MapElement: 'MapElement',
    SpaceElement: 'SpaceElement'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "avatar" | "element" | "map" | "user" | "space" | "mapElement" | "spaceElement"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Avatar: {
        payload: Prisma.$AvatarPayload<ExtArgs>
        fields: Prisma.AvatarFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvatarFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvatarFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          findFirst: {
            args: Prisma.AvatarFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvatarFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          findMany: {
            args: Prisma.AvatarFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>[]
          }
          create: {
            args: Prisma.AvatarCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          createMany: {
            args: Prisma.AvatarCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvatarCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>[]
          }
          delete: {
            args: Prisma.AvatarDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          update: {
            args: Prisma.AvatarUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          deleteMany: {
            args: Prisma.AvatarDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvatarUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AvatarUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>[]
          }
          upsert: {
            args: Prisma.AvatarUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarPayload>
          }
          aggregate: {
            args: Prisma.AvatarAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvatar>
          }
          groupBy: {
            args: Prisma.AvatarGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvatarGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvatarCountArgs<ExtArgs>
            result: $Utils.Optional<AvatarCountAggregateOutputType> | number
          }
        }
      }
      Element: {
        payload: Prisma.$ElementPayload<ExtArgs>
        fields: Prisma.ElementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ElementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ElementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          findFirst: {
            args: Prisma.ElementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ElementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          findMany: {
            args: Prisma.ElementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          create: {
            args: Prisma.ElementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          createMany: {
            args: Prisma.ElementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ElementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          delete: {
            args: Prisma.ElementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          update: {
            args: Prisma.ElementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          deleteMany: {
            args: Prisma.ElementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ElementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ElementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>[]
          }
          upsert: {
            args: Prisma.ElementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ElementPayload>
          }
          aggregate: {
            args: Prisma.ElementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateElement>
          }
          groupBy: {
            args: Prisma.ElementGroupByArgs<ExtArgs>
            result: $Utils.Optional<ElementGroupByOutputType>[]
          }
          count: {
            args: Prisma.ElementCountArgs<ExtArgs>
            result: $Utils.Optional<ElementCountAggregateOutputType> | number
          }
        }
      }
      Map: {
        payload: Prisma.$MapPayload<ExtArgs>
        fields: Prisma.MapFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MapFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MapFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          findFirst: {
            args: Prisma.MapFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MapFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          findMany: {
            args: Prisma.MapFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>[]
          }
          create: {
            args: Prisma.MapCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          createMany: {
            args: Prisma.MapCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MapCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>[]
          }
          delete: {
            args: Prisma.MapDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          update: {
            args: Prisma.MapUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          deleteMany: {
            args: Prisma.MapDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MapUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MapUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>[]
          }
          upsert: {
            args: Prisma.MapUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapPayload>
          }
          aggregate: {
            args: Prisma.MapAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMap>
          }
          groupBy: {
            args: Prisma.MapGroupByArgs<ExtArgs>
            result: $Utils.Optional<MapGroupByOutputType>[]
          }
          count: {
            args: Prisma.MapCountArgs<ExtArgs>
            result: $Utils.Optional<MapCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Space: {
        payload: Prisma.$SpacePayload<ExtArgs>
        fields: Prisma.SpaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          findFirst: {
            args: Prisma.SpaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          findMany: {
            args: Prisma.SpaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>[]
          }
          create: {
            args: Prisma.SpaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          createMany: {
            args: Prisma.SpaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpaceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>[]
          }
          delete: {
            args: Prisma.SpaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          update: {
            args: Prisma.SpaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          deleteMany: {
            args: Prisma.SpaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SpaceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>[]
          }
          upsert: {
            args: Prisma.SpaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpacePayload>
          }
          aggregate: {
            args: Prisma.SpaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpace>
          }
          groupBy: {
            args: Prisma.SpaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpaceCountArgs<ExtArgs>
            result: $Utils.Optional<SpaceCountAggregateOutputType> | number
          }
        }
      }
      MapElement: {
        payload: Prisma.$MapElementPayload<ExtArgs>
        fields: Prisma.MapElementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MapElementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MapElementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementPayload>
          }
          findFirst: {
            args: Prisma.MapElementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MapElementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementPayload>
          }
          findMany: {
            args: Prisma.MapElementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementPayload>[]
          }
          create: {
            args: Prisma.MapElementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementPayload>
          }
          createMany: {
            args: Prisma.MapElementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MapElementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementPayload>[]
          }
          delete: {
            args: Prisma.MapElementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementPayload>
          }
          update: {
            args: Prisma.MapElementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementPayload>
          }
          deleteMany: {
            args: Prisma.MapElementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MapElementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MapElementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementPayload>[]
          }
          upsert: {
            args: Prisma.MapElementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapElementPayload>
          }
          aggregate: {
            args: Prisma.MapElementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMapElement>
          }
          groupBy: {
            args: Prisma.MapElementGroupByArgs<ExtArgs>
            result: $Utils.Optional<MapElementGroupByOutputType>[]
          }
          count: {
            args: Prisma.MapElementCountArgs<ExtArgs>
            result: $Utils.Optional<MapElementCountAggregateOutputType> | number
          }
        }
      }
      SpaceElement: {
        payload: Prisma.$SpaceElementPayload<ExtArgs>
        fields: Prisma.SpaceElementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpaceElementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpaceElementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpaceElementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpaceElementPayload>
          }
          findFirst: {
            args: Prisma.SpaceElementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpaceElementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpaceElementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpaceElementPayload>
          }
          findMany: {
            args: Prisma.SpaceElementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpaceElementPayload>[]
          }
          create: {
            args: Prisma.SpaceElementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpaceElementPayload>
          }
          createMany: {
            args: Prisma.SpaceElementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpaceElementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpaceElementPayload>[]
          }
          delete: {
            args: Prisma.SpaceElementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpaceElementPayload>
          }
          update: {
            args: Prisma.SpaceElementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpaceElementPayload>
          }
          deleteMany: {
            args: Prisma.SpaceElementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpaceElementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SpaceElementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpaceElementPayload>[]
          }
          upsert: {
            args: Prisma.SpaceElementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpaceElementPayload>
          }
          aggregate: {
            args: Prisma.SpaceElementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpaceElement>
          }
          groupBy: {
            args: Prisma.SpaceElementGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpaceElementGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpaceElementCountArgs<ExtArgs>
            result: $Utils.Optional<SpaceElementCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    avatar?: AvatarOmit
    element?: ElementOmit
    map?: MapOmit
    user?: UserOmit
    space?: SpaceOmit
    mapElement?: MapElementOmit
    spaceElement?: SpaceElementOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type AvatarCountOutputType
   */

  export type AvatarCountOutputType = {
    users: number
  }

  export type AvatarCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | AvatarCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * AvatarCountOutputType without action
   */
  export type AvatarCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarCountOutputType
     */
    select?: AvatarCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AvatarCountOutputType without action
   */
  export type AvatarCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type ElementCountOutputType
   */

  export type ElementCountOutputType = {
    mapElements: number
    spaceElements: number
  }

  export type ElementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mapElements?: boolean | ElementCountOutputTypeCountMapElementsArgs
    spaceElements?: boolean | ElementCountOutputTypeCountSpaceElementsArgs
  }

  // Custom InputTypes
  /**
   * ElementCountOutputType without action
   */
  export type ElementCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ElementCountOutputType
     */
    select?: ElementCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ElementCountOutputType without action
   */
  export type ElementCountOutputTypeCountMapElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MapElementWhereInput
  }

  /**
   * ElementCountOutputType without action
   */
  export type ElementCountOutputTypeCountSpaceElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpaceElementWhereInput
  }


  /**
   * Count Type MapCountOutputType
   */

  export type MapCountOutputType = {
    mapElements: number
  }

  export type MapCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mapElements?: boolean | MapCountOutputTypeCountMapElementsArgs
  }

  // Custom InputTypes
  /**
   * MapCountOutputType without action
   */
  export type MapCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapCountOutputType
     */
    select?: MapCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MapCountOutputType without action
   */
  export type MapCountOutputTypeCountMapElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MapElementWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    spaces: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    spaces?: boolean | UserCountOutputTypeCountSpacesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSpacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpaceWhereInput
  }


  /**
   * Count Type SpaceCountOutputType
   */

  export type SpaceCountOutputType = {
    elements: number
  }

  export type SpaceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    elements?: boolean | SpaceCountOutputTypeCountElementsArgs
  }

  // Custom InputTypes
  /**
   * SpaceCountOutputType without action
   */
  export type SpaceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceCountOutputType
     */
    select?: SpaceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SpaceCountOutputType without action
   */
  export type SpaceCountOutputTypeCountElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpaceElementWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Avatar
   */

  export type AggregateAvatar = {
    _count: AvatarCountAggregateOutputType | null
    _avg: AvatarAvgAggregateOutputType | null
    _sum: AvatarSumAggregateOutputType | null
    _min: AvatarMinAggregateOutputType | null
    _max: AvatarMaxAggregateOutputType | null
  }

  export type AvatarAvgAggregateOutputType = {
    id: number | null
  }

  export type AvatarSumAggregateOutputType = {
    id: number | null
  }

  export type AvatarMinAggregateOutputType = {
    id: number | null
    imageUrl: string | null
    name: string | null
  }

  export type AvatarMaxAggregateOutputType = {
    id: number | null
    imageUrl: string | null
    name: string | null
  }

  export type AvatarCountAggregateOutputType = {
    id: number
    imageUrl: number
    name: number
    _all: number
  }


  export type AvatarAvgAggregateInputType = {
    id?: true
  }

  export type AvatarSumAggregateInputType = {
    id?: true
  }

  export type AvatarMinAggregateInputType = {
    id?: true
    imageUrl?: true
    name?: true
  }

  export type AvatarMaxAggregateInputType = {
    id?: true
    imageUrl?: true
    name?: true
  }

  export type AvatarCountAggregateInputType = {
    id?: true
    imageUrl?: true
    name?: true
    _all?: true
  }

  export type AvatarAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Avatar to aggregate.
     */
    where?: AvatarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avatars to fetch.
     */
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvatarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avatars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avatars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Avatars
    **/
    _count?: true | AvatarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AvatarAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AvatarSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvatarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvatarMaxAggregateInputType
  }

  export type GetAvatarAggregateType<T extends AvatarAggregateArgs> = {
        [P in keyof T & keyof AggregateAvatar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvatar[P]>
      : GetScalarType<T[P], AggregateAvatar[P]>
  }




  export type AvatarGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvatarWhereInput
    orderBy?: AvatarOrderByWithAggregationInput | AvatarOrderByWithAggregationInput[]
    by: AvatarScalarFieldEnum[] | AvatarScalarFieldEnum
    having?: AvatarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvatarCountAggregateInputType | true
    _avg?: AvatarAvgAggregateInputType
    _sum?: AvatarSumAggregateInputType
    _min?: AvatarMinAggregateInputType
    _max?: AvatarMaxAggregateInputType
  }

  export type AvatarGroupByOutputType = {
    id: number
    imageUrl: string
    name: string
    _count: AvatarCountAggregateOutputType | null
    _avg: AvatarAvgAggregateOutputType | null
    _sum: AvatarSumAggregateOutputType | null
    _min: AvatarMinAggregateOutputType | null
    _max: AvatarMaxAggregateOutputType | null
  }

  type GetAvatarGroupByPayload<T extends AvatarGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvatarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvatarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvatarGroupByOutputType[P]>
            : GetScalarType<T[P], AvatarGroupByOutputType[P]>
        }
      >
    >


  export type AvatarSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    name?: boolean
    users?: boolean | Avatar$usersArgs<ExtArgs>
    _count?: boolean | AvatarCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["avatar"]>

  export type AvatarSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    name?: boolean
  }, ExtArgs["result"]["avatar"]>

  export type AvatarSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    imageUrl?: boolean
    name?: boolean
  }, ExtArgs["result"]["avatar"]>

  export type AvatarSelectScalar = {
    id?: boolean
    imageUrl?: boolean
    name?: boolean
  }

  export type AvatarOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "imageUrl" | "name", ExtArgs["result"]["avatar"]>
  export type AvatarInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Avatar$usersArgs<ExtArgs>
    _count?: boolean | AvatarCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AvatarIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AvatarIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AvatarPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Avatar"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      imageUrl: string
      name: string
    }, ExtArgs["result"]["avatar"]>
    composites: {}
  }

  type AvatarGetPayload<S extends boolean | null | undefined | AvatarDefaultArgs> = $Result.GetResult<Prisma.$AvatarPayload, S>

  type AvatarCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AvatarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AvatarCountAggregateInputType | true
    }

  export interface AvatarDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Avatar'], meta: { name: 'Avatar' } }
    /**
     * Find zero or one Avatar that matches the filter.
     * @param {AvatarFindUniqueArgs} args - Arguments to find a Avatar
     * @example
     * // Get one Avatar
     * const avatar = await prisma.avatar.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvatarFindUniqueArgs>(args: SelectSubset<T, AvatarFindUniqueArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Avatar that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AvatarFindUniqueOrThrowArgs} args - Arguments to find a Avatar
     * @example
     * // Get one Avatar
     * const avatar = await prisma.avatar.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvatarFindUniqueOrThrowArgs>(args: SelectSubset<T, AvatarFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Avatar that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarFindFirstArgs} args - Arguments to find a Avatar
     * @example
     * // Get one Avatar
     * const avatar = await prisma.avatar.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvatarFindFirstArgs>(args?: SelectSubset<T, AvatarFindFirstArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Avatar that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarFindFirstOrThrowArgs} args - Arguments to find a Avatar
     * @example
     * // Get one Avatar
     * const avatar = await prisma.avatar.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvatarFindFirstOrThrowArgs>(args?: SelectSubset<T, AvatarFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Avatars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Avatars
     * const avatars = await prisma.avatar.findMany()
     * 
     * // Get first 10 Avatars
     * const avatars = await prisma.avatar.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const avatarWithIdOnly = await prisma.avatar.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvatarFindManyArgs>(args?: SelectSubset<T, AvatarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Avatar.
     * @param {AvatarCreateArgs} args - Arguments to create a Avatar.
     * @example
     * // Create one Avatar
     * const Avatar = await prisma.avatar.create({
     *   data: {
     *     // ... data to create a Avatar
     *   }
     * })
     * 
     */
    create<T extends AvatarCreateArgs>(args: SelectSubset<T, AvatarCreateArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Avatars.
     * @param {AvatarCreateManyArgs} args - Arguments to create many Avatars.
     * @example
     * // Create many Avatars
     * const avatar = await prisma.avatar.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvatarCreateManyArgs>(args?: SelectSubset<T, AvatarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Avatars and returns the data saved in the database.
     * @param {AvatarCreateManyAndReturnArgs} args - Arguments to create many Avatars.
     * @example
     * // Create many Avatars
     * const avatar = await prisma.avatar.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Avatars and only return the `id`
     * const avatarWithIdOnly = await prisma.avatar.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvatarCreateManyAndReturnArgs>(args?: SelectSubset<T, AvatarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Avatar.
     * @param {AvatarDeleteArgs} args - Arguments to delete one Avatar.
     * @example
     * // Delete one Avatar
     * const Avatar = await prisma.avatar.delete({
     *   where: {
     *     // ... filter to delete one Avatar
     *   }
     * })
     * 
     */
    delete<T extends AvatarDeleteArgs>(args: SelectSubset<T, AvatarDeleteArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Avatar.
     * @param {AvatarUpdateArgs} args - Arguments to update one Avatar.
     * @example
     * // Update one Avatar
     * const avatar = await prisma.avatar.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvatarUpdateArgs>(args: SelectSubset<T, AvatarUpdateArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Avatars.
     * @param {AvatarDeleteManyArgs} args - Arguments to filter Avatars to delete.
     * @example
     * // Delete a few Avatars
     * const { count } = await prisma.avatar.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvatarDeleteManyArgs>(args?: SelectSubset<T, AvatarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Avatars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Avatars
     * const avatar = await prisma.avatar.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvatarUpdateManyArgs>(args: SelectSubset<T, AvatarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Avatars and returns the data updated in the database.
     * @param {AvatarUpdateManyAndReturnArgs} args - Arguments to update many Avatars.
     * @example
     * // Update many Avatars
     * const avatar = await prisma.avatar.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Avatars and only return the `id`
     * const avatarWithIdOnly = await prisma.avatar.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AvatarUpdateManyAndReturnArgs>(args: SelectSubset<T, AvatarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Avatar.
     * @param {AvatarUpsertArgs} args - Arguments to update or create a Avatar.
     * @example
     * // Update or create a Avatar
     * const avatar = await prisma.avatar.upsert({
     *   create: {
     *     // ... data to create a Avatar
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Avatar we want to update
     *   }
     * })
     */
    upsert<T extends AvatarUpsertArgs>(args: SelectSubset<T, AvatarUpsertArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Avatars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarCountArgs} args - Arguments to filter Avatars to count.
     * @example
     * // Count the number of Avatars
     * const count = await prisma.avatar.count({
     *   where: {
     *     // ... the filter for the Avatars we want to count
     *   }
     * })
    **/
    count<T extends AvatarCountArgs>(
      args?: Subset<T, AvatarCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvatarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Avatar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AvatarAggregateArgs>(args: Subset<T, AvatarAggregateArgs>): Prisma.PrismaPromise<GetAvatarAggregateType<T>>

    /**
     * Group by Avatar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AvatarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvatarGroupByArgs['orderBy'] }
        : { orderBy?: AvatarGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AvatarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvatarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Avatar model
   */
  readonly fields: AvatarFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Avatar.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvatarClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Avatar$usersArgs<ExtArgs> = {}>(args?: Subset<T, Avatar$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Avatar model
   */
  interface AvatarFieldRefs {
    readonly id: FieldRef<"Avatar", 'Int'>
    readonly imageUrl: FieldRef<"Avatar", 'String'>
    readonly name: FieldRef<"Avatar", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Avatar findUnique
   */
  export type AvatarFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatar to fetch.
     */
    where: AvatarWhereUniqueInput
  }

  /**
   * Avatar findUniqueOrThrow
   */
  export type AvatarFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatar to fetch.
     */
    where: AvatarWhereUniqueInput
  }

  /**
   * Avatar findFirst
   */
  export type AvatarFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatar to fetch.
     */
    where?: AvatarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avatars to fetch.
     */
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Avatars.
     */
    cursor?: AvatarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avatars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avatars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Avatars.
     */
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * Avatar findFirstOrThrow
   */
  export type AvatarFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatar to fetch.
     */
    where?: AvatarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avatars to fetch.
     */
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Avatars.
     */
    cursor?: AvatarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avatars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avatars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Avatars.
     */
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * Avatar findMany
   */
  export type AvatarFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter, which Avatars to fetch.
     */
    where?: AvatarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Avatars to fetch.
     */
    orderBy?: AvatarOrderByWithRelationInput | AvatarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Avatars.
     */
    cursor?: AvatarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Avatars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Avatars.
     */
    skip?: number
    distinct?: AvatarScalarFieldEnum | AvatarScalarFieldEnum[]
  }

  /**
   * Avatar create
   */
  export type AvatarCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * The data needed to create a Avatar.
     */
    data: XOR<AvatarCreateInput, AvatarUncheckedCreateInput>
  }

  /**
   * Avatar createMany
   */
  export type AvatarCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Avatars.
     */
    data: AvatarCreateManyInput | AvatarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Avatar createManyAndReturn
   */
  export type AvatarCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * The data used to create many Avatars.
     */
    data: AvatarCreateManyInput | AvatarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Avatar update
   */
  export type AvatarUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * The data needed to update a Avatar.
     */
    data: XOR<AvatarUpdateInput, AvatarUncheckedUpdateInput>
    /**
     * Choose, which Avatar to update.
     */
    where: AvatarWhereUniqueInput
  }

  /**
   * Avatar updateMany
   */
  export type AvatarUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Avatars.
     */
    data: XOR<AvatarUpdateManyMutationInput, AvatarUncheckedUpdateManyInput>
    /**
     * Filter which Avatars to update
     */
    where?: AvatarWhereInput
    /**
     * Limit how many Avatars to update.
     */
    limit?: number
  }

  /**
   * Avatar updateManyAndReturn
   */
  export type AvatarUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * The data used to update Avatars.
     */
    data: XOR<AvatarUpdateManyMutationInput, AvatarUncheckedUpdateManyInput>
    /**
     * Filter which Avatars to update
     */
    where?: AvatarWhereInput
    /**
     * Limit how many Avatars to update.
     */
    limit?: number
  }

  /**
   * Avatar upsert
   */
  export type AvatarUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * The filter to search for the Avatar to update in case it exists.
     */
    where: AvatarWhereUniqueInput
    /**
     * In case the Avatar found by the `where` argument doesn't exist, create a new Avatar with this data.
     */
    create: XOR<AvatarCreateInput, AvatarUncheckedCreateInput>
    /**
     * In case the Avatar was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvatarUpdateInput, AvatarUncheckedUpdateInput>
  }

  /**
   * Avatar delete
   */
  export type AvatarDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    /**
     * Filter which Avatar to delete.
     */
    where: AvatarWhereUniqueInput
  }

  /**
   * Avatar deleteMany
   */
  export type AvatarDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Avatars to delete
     */
    where?: AvatarWhereInput
    /**
     * Limit how many Avatars to delete.
     */
    limit?: number
  }

  /**
   * Avatar.users
   */
  export type Avatar$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Avatar without action
   */
  export type AvatarDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
  }


  /**
   * Model Element
   */

  export type AggregateElement = {
    _count: ElementCountAggregateOutputType | null
    _avg: ElementAvgAggregateOutputType | null
    _sum: ElementSumAggregateOutputType | null
    _min: ElementMinAggregateOutputType | null
    _max: ElementMaxAggregateOutputType | null
  }

  export type ElementAvgAggregateOutputType = {
    id: number | null
    width: number | null
    height: number | null
  }

  export type ElementSumAggregateOutputType = {
    id: number | null
    width: number | null
    height: number | null
  }

  export type ElementMinAggregateOutputType = {
    id: number | null
    width: number | null
    height: number | null
    imageUrl: string | null
    isStatic: boolean | null
  }

  export type ElementMaxAggregateOutputType = {
    id: number | null
    width: number | null
    height: number | null
    imageUrl: string | null
    isStatic: boolean | null
  }

  export type ElementCountAggregateOutputType = {
    id: number
    width: number
    height: number
    imageUrl: number
    isStatic: number
    _all: number
  }


  export type ElementAvgAggregateInputType = {
    id?: true
    width?: true
    height?: true
  }

  export type ElementSumAggregateInputType = {
    id?: true
    width?: true
    height?: true
  }

  export type ElementMinAggregateInputType = {
    id?: true
    width?: true
    height?: true
    imageUrl?: true
    isStatic?: true
  }

  export type ElementMaxAggregateInputType = {
    id?: true
    width?: true
    height?: true
    imageUrl?: true
    isStatic?: true
  }

  export type ElementCountAggregateInputType = {
    id?: true
    width?: true
    height?: true
    imageUrl?: true
    isStatic?: true
    _all?: true
  }

  export type ElementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Element to aggregate.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Elements
    **/
    _count?: true | ElementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ElementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ElementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ElementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ElementMaxAggregateInputType
  }

  export type GetElementAggregateType<T extends ElementAggregateArgs> = {
        [P in keyof T & keyof AggregateElement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateElement[P]>
      : GetScalarType<T[P], AggregateElement[P]>
  }




  export type ElementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ElementWhereInput
    orderBy?: ElementOrderByWithAggregationInput | ElementOrderByWithAggregationInput[]
    by: ElementScalarFieldEnum[] | ElementScalarFieldEnum
    having?: ElementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ElementCountAggregateInputType | true
    _avg?: ElementAvgAggregateInputType
    _sum?: ElementSumAggregateInputType
    _min?: ElementMinAggregateInputType
    _max?: ElementMaxAggregateInputType
  }

  export type ElementGroupByOutputType = {
    id: number
    width: number
    height: number
    imageUrl: string
    isStatic: boolean
    _count: ElementCountAggregateOutputType | null
    _avg: ElementAvgAggregateOutputType | null
    _sum: ElementSumAggregateOutputType | null
    _min: ElementMinAggregateOutputType | null
    _max: ElementMaxAggregateOutputType | null
  }

  type GetElementGroupByPayload<T extends ElementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ElementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ElementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ElementGroupByOutputType[P]>
            : GetScalarType<T[P], ElementGroupByOutputType[P]>
        }
      >
    >


  export type ElementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    width?: boolean
    height?: boolean
    imageUrl?: boolean
    isStatic?: boolean
    mapElements?: boolean | Element$mapElementsArgs<ExtArgs>
    spaceElements?: boolean | Element$spaceElementsArgs<ExtArgs>
    _count?: boolean | ElementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["element"]>

  export type ElementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    width?: boolean
    height?: boolean
    imageUrl?: boolean
    isStatic?: boolean
  }, ExtArgs["result"]["element"]>

  export type ElementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    width?: boolean
    height?: boolean
    imageUrl?: boolean
    isStatic?: boolean
  }, ExtArgs["result"]["element"]>

  export type ElementSelectScalar = {
    id?: boolean
    width?: boolean
    height?: boolean
    imageUrl?: boolean
    isStatic?: boolean
  }

  export type ElementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "width" | "height" | "imageUrl" | "isStatic", ExtArgs["result"]["element"]>
  export type ElementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mapElements?: boolean | Element$mapElementsArgs<ExtArgs>
    spaceElements?: boolean | Element$spaceElementsArgs<ExtArgs>
    _count?: boolean | ElementCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ElementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ElementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ElementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Element"
    objects: {
      mapElements: Prisma.$MapElementPayload<ExtArgs>[]
      spaceElements: Prisma.$SpaceElementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      width: number
      height: number
      imageUrl: string
      isStatic: boolean
    }, ExtArgs["result"]["element"]>
    composites: {}
  }

  type ElementGetPayload<S extends boolean | null | undefined | ElementDefaultArgs> = $Result.GetResult<Prisma.$ElementPayload, S>

  type ElementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ElementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ElementCountAggregateInputType | true
    }

  export interface ElementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Element'], meta: { name: 'Element' } }
    /**
     * Find zero or one Element that matches the filter.
     * @param {ElementFindUniqueArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ElementFindUniqueArgs>(args: SelectSubset<T, ElementFindUniqueArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Element that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ElementFindUniqueOrThrowArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ElementFindUniqueOrThrowArgs>(args: SelectSubset<T, ElementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Element that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindFirstArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ElementFindFirstArgs>(args?: SelectSubset<T, ElementFindFirstArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Element that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindFirstOrThrowArgs} args - Arguments to find a Element
     * @example
     * // Get one Element
     * const element = await prisma.element.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ElementFindFirstOrThrowArgs>(args?: SelectSubset<T, ElementFindFirstOrThrowArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Elements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Elements
     * const elements = await prisma.element.findMany()
     * 
     * // Get first 10 Elements
     * const elements = await prisma.element.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const elementWithIdOnly = await prisma.element.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ElementFindManyArgs>(args?: SelectSubset<T, ElementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Element.
     * @param {ElementCreateArgs} args - Arguments to create a Element.
     * @example
     * // Create one Element
     * const Element = await prisma.element.create({
     *   data: {
     *     // ... data to create a Element
     *   }
     * })
     * 
     */
    create<T extends ElementCreateArgs>(args: SelectSubset<T, ElementCreateArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Elements.
     * @param {ElementCreateManyArgs} args - Arguments to create many Elements.
     * @example
     * // Create many Elements
     * const element = await prisma.element.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ElementCreateManyArgs>(args?: SelectSubset<T, ElementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Elements and returns the data saved in the database.
     * @param {ElementCreateManyAndReturnArgs} args - Arguments to create many Elements.
     * @example
     * // Create many Elements
     * const element = await prisma.element.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Elements and only return the `id`
     * const elementWithIdOnly = await prisma.element.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ElementCreateManyAndReturnArgs>(args?: SelectSubset<T, ElementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Element.
     * @param {ElementDeleteArgs} args - Arguments to delete one Element.
     * @example
     * // Delete one Element
     * const Element = await prisma.element.delete({
     *   where: {
     *     // ... filter to delete one Element
     *   }
     * })
     * 
     */
    delete<T extends ElementDeleteArgs>(args: SelectSubset<T, ElementDeleteArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Element.
     * @param {ElementUpdateArgs} args - Arguments to update one Element.
     * @example
     * // Update one Element
     * const element = await prisma.element.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ElementUpdateArgs>(args: SelectSubset<T, ElementUpdateArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Elements.
     * @param {ElementDeleteManyArgs} args - Arguments to filter Elements to delete.
     * @example
     * // Delete a few Elements
     * const { count } = await prisma.element.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ElementDeleteManyArgs>(args?: SelectSubset<T, ElementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Elements
     * const element = await prisma.element.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ElementUpdateManyArgs>(args: SelectSubset<T, ElementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Elements and returns the data updated in the database.
     * @param {ElementUpdateManyAndReturnArgs} args - Arguments to update many Elements.
     * @example
     * // Update many Elements
     * const element = await prisma.element.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Elements and only return the `id`
     * const elementWithIdOnly = await prisma.element.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ElementUpdateManyAndReturnArgs>(args: SelectSubset<T, ElementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Element.
     * @param {ElementUpsertArgs} args - Arguments to update or create a Element.
     * @example
     * // Update or create a Element
     * const element = await prisma.element.upsert({
     *   create: {
     *     // ... data to create a Element
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Element we want to update
     *   }
     * })
     */
    upsert<T extends ElementUpsertArgs>(args: SelectSubset<T, ElementUpsertArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Elements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementCountArgs} args - Arguments to filter Elements to count.
     * @example
     * // Count the number of Elements
     * const count = await prisma.element.count({
     *   where: {
     *     // ... the filter for the Elements we want to count
     *   }
     * })
    **/
    count<T extends ElementCountArgs>(
      args?: Subset<T, ElementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ElementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Element.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ElementAggregateArgs>(args: Subset<T, ElementAggregateArgs>): Prisma.PrismaPromise<GetElementAggregateType<T>>

    /**
     * Group by Element.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ElementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ElementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ElementGroupByArgs['orderBy'] }
        : { orderBy?: ElementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ElementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetElementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Element model
   */
  readonly fields: ElementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Element.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ElementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mapElements<T extends Element$mapElementsArgs<ExtArgs> = {}>(args?: Subset<T, Element$mapElementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    spaceElements<T extends Element$spaceElementsArgs<ExtArgs> = {}>(args?: Subset<T, Element$spaceElementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpaceElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Element model
   */
  interface ElementFieldRefs {
    readonly id: FieldRef<"Element", 'Int'>
    readonly width: FieldRef<"Element", 'Int'>
    readonly height: FieldRef<"Element", 'Int'>
    readonly imageUrl: FieldRef<"Element", 'String'>
    readonly isStatic: FieldRef<"Element", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Element findUnique
   */
  export type ElementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element findUniqueOrThrow
   */
  export type ElementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element findFirst
   */
  export type ElementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Elements.
     */
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element findFirstOrThrow
   */
  export type ElementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Element to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Elements.
     */
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element findMany
   */
  export type ElementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter, which Elements to fetch.
     */
    where?: ElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Elements to fetch.
     */
    orderBy?: ElementOrderByWithRelationInput | ElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Elements.
     */
    cursor?: ElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Elements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Elements.
     */
    skip?: number
    distinct?: ElementScalarFieldEnum | ElementScalarFieldEnum[]
  }

  /**
   * Element create
   */
  export type ElementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The data needed to create a Element.
     */
    data: XOR<ElementCreateInput, ElementUncheckedCreateInput>
  }

  /**
   * Element createMany
   */
  export type ElementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Elements.
     */
    data: ElementCreateManyInput | ElementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Element createManyAndReturn
   */
  export type ElementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * The data used to create many Elements.
     */
    data: ElementCreateManyInput | ElementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Element update
   */
  export type ElementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The data needed to update a Element.
     */
    data: XOR<ElementUpdateInput, ElementUncheckedUpdateInput>
    /**
     * Choose, which Element to update.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element updateMany
   */
  export type ElementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Elements.
     */
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyInput>
    /**
     * Filter which Elements to update
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to update.
     */
    limit?: number
  }

  /**
   * Element updateManyAndReturn
   */
  export type ElementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * The data used to update Elements.
     */
    data: XOR<ElementUpdateManyMutationInput, ElementUncheckedUpdateManyInput>
    /**
     * Filter which Elements to update
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to update.
     */
    limit?: number
  }

  /**
   * Element upsert
   */
  export type ElementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * The filter to search for the Element to update in case it exists.
     */
    where: ElementWhereUniqueInput
    /**
     * In case the Element found by the `where` argument doesn't exist, create a new Element with this data.
     */
    create: XOR<ElementCreateInput, ElementUncheckedCreateInput>
    /**
     * In case the Element was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ElementUpdateInput, ElementUncheckedUpdateInput>
  }

  /**
   * Element delete
   */
  export type ElementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
    /**
     * Filter which Element to delete.
     */
    where: ElementWhereUniqueInput
  }

  /**
   * Element deleteMany
   */
  export type ElementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Elements to delete
     */
    where?: ElementWhereInput
    /**
     * Limit how many Elements to delete.
     */
    limit?: number
  }

  /**
   * Element.mapElements
   */
  export type Element$mapElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElement
     */
    select?: MapElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElement
     */
    omit?: MapElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementInclude<ExtArgs> | null
    where?: MapElementWhereInput
    orderBy?: MapElementOrderByWithRelationInput | MapElementOrderByWithRelationInput[]
    cursor?: MapElementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MapElementScalarFieldEnum | MapElementScalarFieldEnum[]
  }

  /**
   * Element.spaceElements
   */
  export type Element$spaceElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceElement
     */
    select?: SpaceElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpaceElement
     */
    omit?: SpaceElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceElementInclude<ExtArgs> | null
    where?: SpaceElementWhereInput
    orderBy?: SpaceElementOrderByWithRelationInput | SpaceElementOrderByWithRelationInput[]
    cursor?: SpaceElementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpaceElementScalarFieldEnum | SpaceElementScalarFieldEnum[]
  }

  /**
   * Element without action
   */
  export type ElementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Element
     */
    select?: ElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Element
     */
    omit?: ElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ElementInclude<ExtArgs> | null
  }


  /**
   * Model Map
   */

  export type AggregateMap = {
    _count: MapCountAggregateOutputType | null
    _avg: MapAvgAggregateOutputType | null
    _sum: MapSumAggregateOutputType | null
    _min: MapMinAggregateOutputType | null
    _max: MapMaxAggregateOutputType | null
  }

  export type MapAvgAggregateOutputType = {
    id: number | null
    width: number | null
    height: number | null
  }

  export type MapSumAggregateOutputType = {
    id: number | null
    width: number | null
    height: number | null
  }

  export type MapMinAggregateOutputType = {
    id: number | null
    name: string | null
    width: number | null
    height: number | null
  }

  export type MapMaxAggregateOutputType = {
    id: number | null
    name: string | null
    width: number | null
    height: number | null
  }

  export type MapCountAggregateOutputType = {
    id: number
    name: number
    width: number
    height: number
    _all: number
  }


  export type MapAvgAggregateInputType = {
    id?: true
    width?: true
    height?: true
  }

  export type MapSumAggregateInputType = {
    id?: true
    width?: true
    height?: true
  }

  export type MapMinAggregateInputType = {
    id?: true
    name?: true
    width?: true
    height?: true
  }

  export type MapMaxAggregateInputType = {
    id?: true
    name?: true
    width?: true
    height?: true
  }

  export type MapCountAggregateInputType = {
    id?: true
    name?: true
    width?: true
    height?: true
    _all?: true
  }

  export type MapAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Map to aggregate.
     */
    where?: MapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Maps to fetch.
     */
    orderBy?: MapOrderByWithRelationInput | MapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Maps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Maps
    **/
    _count?: true | MapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MapAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MapSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MapMaxAggregateInputType
  }

  export type GetMapAggregateType<T extends MapAggregateArgs> = {
        [P in keyof T & keyof AggregateMap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMap[P]>
      : GetScalarType<T[P], AggregateMap[P]>
  }




  export type MapGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MapWhereInput
    orderBy?: MapOrderByWithAggregationInput | MapOrderByWithAggregationInput[]
    by: MapScalarFieldEnum[] | MapScalarFieldEnum
    having?: MapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MapCountAggregateInputType | true
    _avg?: MapAvgAggregateInputType
    _sum?: MapSumAggregateInputType
    _min?: MapMinAggregateInputType
    _max?: MapMaxAggregateInputType
  }

  export type MapGroupByOutputType = {
    id: number
    name: string
    width: number
    height: number
    _count: MapCountAggregateOutputType | null
    _avg: MapAvgAggregateOutputType | null
    _sum: MapSumAggregateOutputType | null
    _min: MapMinAggregateOutputType | null
    _max: MapMaxAggregateOutputType | null
  }

  type GetMapGroupByPayload<T extends MapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MapGroupByOutputType[P]>
            : GetScalarType<T[P], MapGroupByOutputType[P]>
        }
      >
    >


  export type MapSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
    mapElements?: boolean | Map$mapElementsArgs<ExtArgs>
    _count?: boolean | MapCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["map"]>

  export type MapSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
  }, ExtArgs["result"]["map"]>

  export type MapSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
  }, ExtArgs["result"]["map"]>

  export type MapSelectScalar = {
    id?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
  }

  export type MapOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "width" | "height", ExtArgs["result"]["map"]>
  export type MapInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mapElements?: boolean | Map$mapElementsArgs<ExtArgs>
    _count?: boolean | MapCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MapIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MapIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MapPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Map"
    objects: {
      mapElements: Prisma.$MapElementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      width: number
      height: number
    }, ExtArgs["result"]["map"]>
    composites: {}
  }

  type MapGetPayload<S extends boolean | null | undefined | MapDefaultArgs> = $Result.GetResult<Prisma.$MapPayload, S>

  type MapCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MapFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MapCountAggregateInputType | true
    }

  export interface MapDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Map'], meta: { name: 'Map' } }
    /**
     * Find zero or one Map that matches the filter.
     * @param {MapFindUniqueArgs} args - Arguments to find a Map
     * @example
     * // Get one Map
     * const map = await prisma.map.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MapFindUniqueArgs>(args: SelectSubset<T, MapFindUniqueArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Map that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MapFindUniqueOrThrowArgs} args - Arguments to find a Map
     * @example
     * // Get one Map
     * const map = await prisma.map.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MapFindUniqueOrThrowArgs>(args: SelectSubset<T, MapFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Map that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapFindFirstArgs} args - Arguments to find a Map
     * @example
     * // Get one Map
     * const map = await prisma.map.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MapFindFirstArgs>(args?: SelectSubset<T, MapFindFirstArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Map that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapFindFirstOrThrowArgs} args - Arguments to find a Map
     * @example
     * // Get one Map
     * const map = await prisma.map.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MapFindFirstOrThrowArgs>(args?: SelectSubset<T, MapFindFirstOrThrowArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Maps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Maps
     * const maps = await prisma.map.findMany()
     * 
     * // Get first 10 Maps
     * const maps = await prisma.map.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mapWithIdOnly = await prisma.map.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MapFindManyArgs>(args?: SelectSubset<T, MapFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Map.
     * @param {MapCreateArgs} args - Arguments to create a Map.
     * @example
     * // Create one Map
     * const Map = await prisma.map.create({
     *   data: {
     *     // ... data to create a Map
     *   }
     * })
     * 
     */
    create<T extends MapCreateArgs>(args: SelectSubset<T, MapCreateArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Maps.
     * @param {MapCreateManyArgs} args - Arguments to create many Maps.
     * @example
     * // Create many Maps
     * const map = await prisma.map.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MapCreateManyArgs>(args?: SelectSubset<T, MapCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Maps and returns the data saved in the database.
     * @param {MapCreateManyAndReturnArgs} args - Arguments to create many Maps.
     * @example
     * // Create many Maps
     * const map = await prisma.map.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Maps and only return the `id`
     * const mapWithIdOnly = await prisma.map.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MapCreateManyAndReturnArgs>(args?: SelectSubset<T, MapCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Map.
     * @param {MapDeleteArgs} args - Arguments to delete one Map.
     * @example
     * // Delete one Map
     * const Map = await prisma.map.delete({
     *   where: {
     *     // ... filter to delete one Map
     *   }
     * })
     * 
     */
    delete<T extends MapDeleteArgs>(args: SelectSubset<T, MapDeleteArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Map.
     * @param {MapUpdateArgs} args - Arguments to update one Map.
     * @example
     * // Update one Map
     * const map = await prisma.map.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MapUpdateArgs>(args: SelectSubset<T, MapUpdateArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Maps.
     * @param {MapDeleteManyArgs} args - Arguments to filter Maps to delete.
     * @example
     * // Delete a few Maps
     * const { count } = await prisma.map.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MapDeleteManyArgs>(args?: SelectSubset<T, MapDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Maps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Maps
     * const map = await prisma.map.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MapUpdateManyArgs>(args: SelectSubset<T, MapUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Maps and returns the data updated in the database.
     * @param {MapUpdateManyAndReturnArgs} args - Arguments to update many Maps.
     * @example
     * // Update many Maps
     * const map = await prisma.map.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Maps and only return the `id`
     * const mapWithIdOnly = await prisma.map.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MapUpdateManyAndReturnArgs>(args: SelectSubset<T, MapUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Map.
     * @param {MapUpsertArgs} args - Arguments to update or create a Map.
     * @example
     * // Update or create a Map
     * const map = await prisma.map.upsert({
     *   create: {
     *     // ... data to create a Map
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Map we want to update
     *   }
     * })
     */
    upsert<T extends MapUpsertArgs>(args: SelectSubset<T, MapUpsertArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Maps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapCountArgs} args - Arguments to filter Maps to count.
     * @example
     * // Count the number of Maps
     * const count = await prisma.map.count({
     *   where: {
     *     // ... the filter for the Maps we want to count
     *   }
     * })
    **/
    count<T extends MapCountArgs>(
      args?: Subset<T, MapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Map.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MapAggregateArgs>(args: Subset<T, MapAggregateArgs>): Prisma.PrismaPromise<GetMapAggregateType<T>>

    /**
     * Group by Map.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MapGroupByArgs['orderBy'] }
        : { orderBy?: MapGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Map model
   */
  readonly fields: MapFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Map.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MapClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mapElements<T extends Map$mapElementsArgs<ExtArgs> = {}>(args?: Subset<T, Map$mapElementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Map model
   */
  interface MapFieldRefs {
    readonly id: FieldRef<"Map", 'Int'>
    readonly name: FieldRef<"Map", 'String'>
    readonly width: FieldRef<"Map", 'Int'>
    readonly height: FieldRef<"Map", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Map findUnique
   */
  export type MapFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Map to fetch.
     */
    where: MapWhereUniqueInput
  }

  /**
   * Map findUniqueOrThrow
   */
  export type MapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Map to fetch.
     */
    where: MapWhereUniqueInput
  }

  /**
   * Map findFirst
   */
  export type MapFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Map to fetch.
     */
    where?: MapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Maps to fetch.
     */
    orderBy?: MapOrderByWithRelationInput | MapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Maps.
     */
    cursor?: MapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Maps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Maps.
     */
    distinct?: MapScalarFieldEnum | MapScalarFieldEnum[]
  }

  /**
   * Map findFirstOrThrow
   */
  export type MapFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Map to fetch.
     */
    where?: MapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Maps to fetch.
     */
    orderBy?: MapOrderByWithRelationInput | MapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Maps.
     */
    cursor?: MapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Maps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Maps.
     */
    distinct?: MapScalarFieldEnum | MapScalarFieldEnum[]
  }

  /**
   * Map findMany
   */
  export type MapFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter, which Maps to fetch.
     */
    where?: MapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Maps to fetch.
     */
    orderBy?: MapOrderByWithRelationInput | MapOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Maps.
     */
    cursor?: MapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Maps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Maps.
     */
    skip?: number
    distinct?: MapScalarFieldEnum | MapScalarFieldEnum[]
  }

  /**
   * Map create
   */
  export type MapCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * The data needed to create a Map.
     */
    data: XOR<MapCreateInput, MapUncheckedCreateInput>
  }

  /**
   * Map createMany
   */
  export type MapCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Maps.
     */
    data: MapCreateManyInput | MapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Map createManyAndReturn
   */
  export type MapCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * The data used to create many Maps.
     */
    data: MapCreateManyInput | MapCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Map update
   */
  export type MapUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * The data needed to update a Map.
     */
    data: XOR<MapUpdateInput, MapUncheckedUpdateInput>
    /**
     * Choose, which Map to update.
     */
    where: MapWhereUniqueInput
  }

  /**
   * Map updateMany
   */
  export type MapUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Maps.
     */
    data: XOR<MapUpdateManyMutationInput, MapUncheckedUpdateManyInput>
    /**
     * Filter which Maps to update
     */
    where?: MapWhereInput
    /**
     * Limit how many Maps to update.
     */
    limit?: number
  }

  /**
   * Map updateManyAndReturn
   */
  export type MapUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * The data used to update Maps.
     */
    data: XOR<MapUpdateManyMutationInput, MapUncheckedUpdateManyInput>
    /**
     * Filter which Maps to update
     */
    where?: MapWhereInput
    /**
     * Limit how many Maps to update.
     */
    limit?: number
  }

  /**
   * Map upsert
   */
  export type MapUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * The filter to search for the Map to update in case it exists.
     */
    where: MapWhereUniqueInput
    /**
     * In case the Map found by the `where` argument doesn't exist, create a new Map with this data.
     */
    create: XOR<MapCreateInput, MapUncheckedCreateInput>
    /**
     * In case the Map was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MapUpdateInput, MapUncheckedUpdateInput>
  }

  /**
   * Map delete
   */
  export type MapDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
    /**
     * Filter which Map to delete.
     */
    where: MapWhereUniqueInput
  }

  /**
   * Map deleteMany
   */
  export type MapDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Maps to delete
     */
    where?: MapWhereInput
    /**
     * Limit how many Maps to delete.
     */
    limit?: number
  }

  /**
   * Map.mapElements
   */
  export type Map$mapElementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElement
     */
    select?: MapElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElement
     */
    omit?: MapElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementInclude<ExtArgs> | null
    where?: MapElementWhereInput
    orderBy?: MapElementOrderByWithRelationInput | MapElementOrderByWithRelationInput[]
    cursor?: MapElementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MapElementScalarFieldEnum | MapElementScalarFieldEnum[]
  }

  /**
   * Map without action
   */
  export type MapDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Map
     */
    select?: MapSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Map
     */
    omit?: MapOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    avatarId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    avatarId: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    avatarId: number | null
    role: $Enums.UserRole | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    password: string | null
    avatarId: number | null
    role: $Enums.UserRole | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    avatarId: number
    role: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    avatarId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    avatarId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    avatarId?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    avatarId?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    avatarId?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    password: string
    avatarId: number | null
    role: $Enums.UserRole
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    avatarId?: boolean
    role?: boolean
    avatar?: boolean | User$avatarArgs<ExtArgs>
    spaces?: boolean | User$spacesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    avatarId?: boolean
    role?: boolean
    avatar?: boolean | User$avatarArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    avatarId?: boolean
    role?: boolean
    avatar?: boolean | User$avatarArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    avatarId?: boolean
    role?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "avatarId" | "role", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avatar?: boolean | User$avatarArgs<ExtArgs>
    spaces?: boolean | User$spacesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avatar?: boolean | User$avatarArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    avatar?: boolean | User$avatarArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      avatar: Prisma.$AvatarPayload<ExtArgs> | null
      spaces: Prisma.$SpacePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      password: string
      avatarId: number | null
      role: $Enums.UserRole
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    avatar<T extends User$avatarArgs<ExtArgs> = {}>(args?: Subset<T, User$avatarArgs<ExtArgs>>): Prisma__AvatarClient<$Result.GetResult<Prisma.$AvatarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    spaces<T extends User$spacesArgs<ExtArgs> = {}>(args?: Subset<T, User$spacesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly avatarId: FieldRef<"User", 'Int'>
    readonly role: FieldRef<"User", 'UserRole'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.avatar
   */
  export type User$avatarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Avatar
     */
    select?: AvatarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Avatar
     */
    omit?: AvatarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarInclude<ExtArgs> | null
    where?: AvatarWhereInput
  }

  /**
   * User.spaces
   */
  export type User$spacesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    where?: SpaceWhereInput
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    cursor?: SpaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Space
   */

  export type AggregateSpace = {
    _count: SpaceCountAggregateOutputType | null
    _avg: SpaceAvgAggregateOutputType | null
    _sum: SpaceSumAggregateOutputType | null
    _min: SpaceMinAggregateOutputType | null
    _max: SpaceMaxAggregateOutputType | null
  }

  export type SpaceAvgAggregateOutputType = {
    id: number | null
    width: number | null
    height: number | null
    ownerId: number | null
  }

  export type SpaceSumAggregateOutputType = {
    id: number | null
    width: number | null
    height: number | null
    ownerId: number | null
  }

  export type SpaceMinAggregateOutputType = {
    id: number | null
    name: string | null
    width: number | null
    height: number | null
    thumbnail: string | null
    ownerId: number | null
  }

  export type SpaceMaxAggregateOutputType = {
    id: number | null
    name: string | null
    width: number | null
    height: number | null
    thumbnail: string | null
    ownerId: number | null
  }

  export type SpaceCountAggregateOutputType = {
    id: number
    name: number
    width: number
    height: number
    thumbnail: number
    ownerId: number
    _all: number
  }


  export type SpaceAvgAggregateInputType = {
    id?: true
    width?: true
    height?: true
    ownerId?: true
  }

  export type SpaceSumAggregateInputType = {
    id?: true
    width?: true
    height?: true
    ownerId?: true
  }

  export type SpaceMinAggregateInputType = {
    id?: true
    name?: true
    width?: true
    height?: true
    thumbnail?: true
    ownerId?: true
  }

  export type SpaceMaxAggregateInputType = {
    id?: true
    name?: true
    width?: true
    height?: true
    thumbnail?: true
    ownerId?: true
  }

  export type SpaceCountAggregateInputType = {
    id?: true
    name?: true
    width?: true
    height?: true
    thumbnail?: true
    ownerId?: true
    _all?: true
  }

  export type SpaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Space to aggregate.
     */
    where?: SpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spaces to fetch.
     */
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Spaces
    **/
    _count?: true | SpaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpaceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpaceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpaceMaxAggregateInputType
  }

  export type GetSpaceAggregateType<T extends SpaceAggregateArgs> = {
        [P in keyof T & keyof AggregateSpace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpace[P]>
      : GetScalarType<T[P], AggregateSpace[P]>
  }




  export type SpaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpaceWhereInput
    orderBy?: SpaceOrderByWithAggregationInput | SpaceOrderByWithAggregationInput[]
    by: SpaceScalarFieldEnum[] | SpaceScalarFieldEnum
    having?: SpaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpaceCountAggregateInputType | true
    _avg?: SpaceAvgAggregateInputType
    _sum?: SpaceSumAggregateInputType
    _min?: SpaceMinAggregateInputType
    _max?: SpaceMaxAggregateInputType
  }

  export type SpaceGroupByOutputType = {
    id: number
    name: string
    width: number
    height: number
    thumbnail: string | null
    ownerId: number
    _count: SpaceCountAggregateOutputType | null
    _avg: SpaceAvgAggregateOutputType | null
    _sum: SpaceSumAggregateOutputType | null
    _min: SpaceMinAggregateOutputType | null
    _max: SpaceMaxAggregateOutputType | null
  }

  type GetSpaceGroupByPayload<T extends SpaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpaceGroupByOutputType[P]>
            : GetScalarType<T[P], SpaceGroupByOutputType[P]>
        }
      >
    >


  export type SpaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
    thumbnail?: boolean
    ownerId?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    elements?: boolean | Space$elementsArgs<ExtArgs>
    _count?: boolean | SpaceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["space"]>

  export type SpaceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
    thumbnail?: boolean
    ownerId?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["space"]>

  export type SpaceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
    thumbnail?: boolean
    ownerId?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["space"]>

  export type SpaceSelectScalar = {
    id?: boolean
    name?: boolean
    width?: boolean
    height?: boolean
    thumbnail?: boolean
    ownerId?: boolean
  }

  export type SpaceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "width" | "height" | "thumbnail" | "ownerId", ExtArgs["result"]["space"]>
  export type SpaceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    elements?: boolean | Space$elementsArgs<ExtArgs>
    _count?: boolean | SpaceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SpaceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SpaceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SpacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Space"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      elements: Prisma.$SpaceElementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      width: number
      height: number
      thumbnail: string | null
      ownerId: number
    }, ExtArgs["result"]["space"]>
    composites: {}
  }

  type SpaceGetPayload<S extends boolean | null | undefined | SpaceDefaultArgs> = $Result.GetResult<Prisma.$SpacePayload, S>

  type SpaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SpaceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpaceCountAggregateInputType | true
    }

  export interface SpaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Space'], meta: { name: 'Space' } }
    /**
     * Find zero or one Space that matches the filter.
     * @param {SpaceFindUniqueArgs} args - Arguments to find a Space
     * @example
     * // Get one Space
     * const space = await prisma.space.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpaceFindUniqueArgs>(args: SelectSubset<T, SpaceFindUniqueArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Space that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SpaceFindUniqueOrThrowArgs} args - Arguments to find a Space
     * @example
     * // Get one Space
     * const space = await prisma.space.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpaceFindUniqueOrThrowArgs>(args: SelectSubset<T, SpaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Space that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceFindFirstArgs} args - Arguments to find a Space
     * @example
     * // Get one Space
     * const space = await prisma.space.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpaceFindFirstArgs>(args?: SelectSubset<T, SpaceFindFirstArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Space that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceFindFirstOrThrowArgs} args - Arguments to find a Space
     * @example
     * // Get one Space
     * const space = await prisma.space.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpaceFindFirstOrThrowArgs>(args?: SelectSubset<T, SpaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Spaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Spaces
     * const spaces = await prisma.space.findMany()
     * 
     * // Get first 10 Spaces
     * const spaces = await prisma.space.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spaceWithIdOnly = await prisma.space.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpaceFindManyArgs>(args?: SelectSubset<T, SpaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Space.
     * @param {SpaceCreateArgs} args - Arguments to create a Space.
     * @example
     * // Create one Space
     * const Space = await prisma.space.create({
     *   data: {
     *     // ... data to create a Space
     *   }
     * })
     * 
     */
    create<T extends SpaceCreateArgs>(args: SelectSubset<T, SpaceCreateArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Spaces.
     * @param {SpaceCreateManyArgs} args - Arguments to create many Spaces.
     * @example
     * // Create many Spaces
     * const space = await prisma.space.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpaceCreateManyArgs>(args?: SelectSubset<T, SpaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Spaces and returns the data saved in the database.
     * @param {SpaceCreateManyAndReturnArgs} args - Arguments to create many Spaces.
     * @example
     * // Create many Spaces
     * const space = await prisma.space.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Spaces and only return the `id`
     * const spaceWithIdOnly = await prisma.space.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpaceCreateManyAndReturnArgs>(args?: SelectSubset<T, SpaceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Space.
     * @param {SpaceDeleteArgs} args - Arguments to delete one Space.
     * @example
     * // Delete one Space
     * const Space = await prisma.space.delete({
     *   where: {
     *     // ... filter to delete one Space
     *   }
     * })
     * 
     */
    delete<T extends SpaceDeleteArgs>(args: SelectSubset<T, SpaceDeleteArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Space.
     * @param {SpaceUpdateArgs} args - Arguments to update one Space.
     * @example
     * // Update one Space
     * const space = await prisma.space.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpaceUpdateArgs>(args: SelectSubset<T, SpaceUpdateArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Spaces.
     * @param {SpaceDeleteManyArgs} args - Arguments to filter Spaces to delete.
     * @example
     * // Delete a few Spaces
     * const { count } = await prisma.space.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpaceDeleteManyArgs>(args?: SelectSubset<T, SpaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Spaces
     * const space = await prisma.space.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpaceUpdateManyArgs>(args: SelectSubset<T, SpaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Spaces and returns the data updated in the database.
     * @param {SpaceUpdateManyAndReturnArgs} args - Arguments to update many Spaces.
     * @example
     * // Update many Spaces
     * const space = await prisma.space.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Spaces and only return the `id`
     * const spaceWithIdOnly = await prisma.space.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SpaceUpdateManyAndReturnArgs>(args: SelectSubset<T, SpaceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Space.
     * @param {SpaceUpsertArgs} args - Arguments to update or create a Space.
     * @example
     * // Update or create a Space
     * const space = await prisma.space.upsert({
     *   create: {
     *     // ... data to create a Space
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Space we want to update
     *   }
     * })
     */
    upsert<T extends SpaceUpsertArgs>(args: SelectSubset<T, SpaceUpsertArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Spaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceCountArgs} args - Arguments to filter Spaces to count.
     * @example
     * // Count the number of Spaces
     * const count = await prisma.space.count({
     *   where: {
     *     // ... the filter for the Spaces we want to count
     *   }
     * })
    **/
    count<T extends SpaceCountArgs>(
      args?: Subset<T, SpaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Space.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpaceAggregateArgs>(args: Subset<T, SpaceAggregateArgs>): Prisma.PrismaPromise<GetSpaceAggregateType<T>>

    /**
     * Group by Space.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpaceGroupByArgs['orderBy'] }
        : { orderBy?: SpaceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Space model
   */
  readonly fields: SpaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Space.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    elements<T extends Space$elementsArgs<ExtArgs> = {}>(args?: Subset<T, Space$elementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpaceElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Space model
   */
  interface SpaceFieldRefs {
    readonly id: FieldRef<"Space", 'Int'>
    readonly name: FieldRef<"Space", 'String'>
    readonly width: FieldRef<"Space", 'Int'>
    readonly height: FieldRef<"Space", 'Int'>
    readonly thumbnail: FieldRef<"Space", 'String'>
    readonly ownerId: FieldRef<"Space", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Space findUnique
   */
  export type SpaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Space to fetch.
     */
    where: SpaceWhereUniqueInput
  }

  /**
   * Space findUniqueOrThrow
   */
  export type SpaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Space to fetch.
     */
    where: SpaceWhereUniqueInput
  }

  /**
   * Space findFirst
   */
  export type SpaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Space to fetch.
     */
    where?: SpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spaces to fetch.
     */
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spaces.
     */
    cursor?: SpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spaces.
     */
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * Space findFirstOrThrow
   */
  export type SpaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Space to fetch.
     */
    where?: SpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spaces to fetch.
     */
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Spaces.
     */
    cursor?: SpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Spaces.
     */
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * Space findMany
   */
  export type SpaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter, which Spaces to fetch.
     */
    where?: SpaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Spaces to fetch.
     */
    orderBy?: SpaceOrderByWithRelationInput | SpaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Spaces.
     */
    cursor?: SpaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Spaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Spaces.
     */
    skip?: number
    distinct?: SpaceScalarFieldEnum | SpaceScalarFieldEnum[]
  }

  /**
   * Space create
   */
  export type SpaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * The data needed to create a Space.
     */
    data: XOR<SpaceCreateInput, SpaceUncheckedCreateInput>
  }

  /**
   * Space createMany
   */
  export type SpaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Spaces.
     */
    data: SpaceCreateManyInput | SpaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Space createManyAndReturn
   */
  export type SpaceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * The data used to create many Spaces.
     */
    data: SpaceCreateManyInput | SpaceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Space update
   */
  export type SpaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * The data needed to update a Space.
     */
    data: XOR<SpaceUpdateInput, SpaceUncheckedUpdateInput>
    /**
     * Choose, which Space to update.
     */
    where: SpaceWhereUniqueInput
  }

  /**
   * Space updateMany
   */
  export type SpaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Spaces.
     */
    data: XOR<SpaceUpdateManyMutationInput, SpaceUncheckedUpdateManyInput>
    /**
     * Filter which Spaces to update
     */
    where?: SpaceWhereInput
    /**
     * Limit how many Spaces to update.
     */
    limit?: number
  }

  /**
   * Space updateManyAndReturn
   */
  export type SpaceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * The data used to update Spaces.
     */
    data: XOR<SpaceUpdateManyMutationInput, SpaceUncheckedUpdateManyInput>
    /**
     * Filter which Spaces to update
     */
    where?: SpaceWhereInput
    /**
     * Limit how many Spaces to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Space upsert
   */
  export type SpaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * The filter to search for the Space to update in case it exists.
     */
    where: SpaceWhereUniqueInput
    /**
     * In case the Space found by the `where` argument doesn't exist, create a new Space with this data.
     */
    create: XOR<SpaceCreateInput, SpaceUncheckedCreateInput>
    /**
     * In case the Space was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpaceUpdateInput, SpaceUncheckedUpdateInput>
  }

  /**
   * Space delete
   */
  export type SpaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
    /**
     * Filter which Space to delete.
     */
    where: SpaceWhereUniqueInput
  }

  /**
   * Space deleteMany
   */
  export type SpaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Spaces to delete
     */
    where?: SpaceWhereInput
    /**
     * Limit how many Spaces to delete.
     */
    limit?: number
  }

  /**
   * Space.elements
   */
  export type Space$elementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceElement
     */
    select?: SpaceElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpaceElement
     */
    omit?: SpaceElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceElementInclude<ExtArgs> | null
    where?: SpaceElementWhereInput
    orderBy?: SpaceElementOrderByWithRelationInput | SpaceElementOrderByWithRelationInput[]
    cursor?: SpaceElementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpaceElementScalarFieldEnum | SpaceElementScalarFieldEnum[]
  }

  /**
   * Space without action
   */
  export type SpaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Space
     */
    select?: SpaceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Space
     */
    omit?: SpaceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceInclude<ExtArgs> | null
  }


  /**
   * Model MapElement
   */

  export type AggregateMapElement = {
    _count: MapElementCountAggregateOutputType | null
    _avg: MapElementAvgAggregateOutputType | null
    _sum: MapElementSumAggregateOutputType | null
    _min: MapElementMinAggregateOutputType | null
    _max: MapElementMaxAggregateOutputType | null
  }

  export type MapElementAvgAggregateOutputType = {
    id: number | null
    mapId: number | null
    elementId: number | null
    x: number | null
    y: number | null
  }

  export type MapElementSumAggregateOutputType = {
    id: number | null
    mapId: number | null
    elementId: number | null
    x: number | null
    y: number | null
  }

  export type MapElementMinAggregateOutputType = {
    id: number | null
    mapId: number | null
    elementId: number | null
    x: number | null
    y: number | null
  }

  export type MapElementMaxAggregateOutputType = {
    id: number | null
    mapId: number | null
    elementId: number | null
    x: number | null
    y: number | null
  }

  export type MapElementCountAggregateOutputType = {
    id: number
    mapId: number
    elementId: number
    x: number
    y: number
    _all: number
  }


  export type MapElementAvgAggregateInputType = {
    id?: true
    mapId?: true
    elementId?: true
    x?: true
    y?: true
  }

  export type MapElementSumAggregateInputType = {
    id?: true
    mapId?: true
    elementId?: true
    x?: true
    y?: true
  }

  export type MapElementMinAggregateInputType = {
    id?: true
    mapId?: true
    elementId?: true
    x?: true
    y?: true
  }

  export type MapElementMaxAggregateInputType = {
    id?: true
    mapId?: true
    elementId?: true
    x?: true
    y?: true
  }

  export type MapElementCountAggregateInputType = {
    id?: true
    mapId?: true
    elementId?: true
    x?: true
    y?: true
    _all?: true
  }

  export type MapElementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MapElement to aggregate.
     */
    where?: MapElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MapElements to fetch.
     */
    orderBy?: MapElementOrderByWithRelationInput | MapElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MapElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MapElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MapElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MapElements
    **/
    _count?: true | MapElementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MapElementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MapElementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MapElementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MapElementMaxAggregateInputType
  }

  export type GetMapElementAggregateType<T extends MapElementAggregateArgs> = {
        [P in keyof T & keyof AggregateMapElement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMapElement[P]>
      : GetScalarType<T[P], AggregateMapElement[P]>
  }




  export type MapElementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MapElementWhereInput
    orderBy?: MapElementOrderByWithAggregationInput | MapElementOrderByWithAggregationInput[]
    by: MapElementScalarFieldEnum[] | MapElementScalarFieldEnum
    having?: MapElementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MapElementCountAggregateInputType | true
    _avg?: MapElementAvgAggregateInputType
    _sum?: MapElementSumAggregateInputType
    _min?: MapElementMinAggregateInputType
    _max?: MapElementMaxAggregateInputType
  }

  export type MapElementGroupByOutputType = {
    id: number
    mapId: number
    elementId: number
    x: number
    y: number
    _count: MapElementCountAggregateOutputType | null
    _avg: MapElementAvgAggregateOutputType | null
    _sum: MapElementSumAggregateOutputType | null
    _min: MapElementMinAggregateOutputType | null
    _max: MapElementMaxAggregateOutputType | null
  }

  type GetMapElementGroupByPayload<T extends MapElementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MapElementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MapElementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MapElementGroupByOutputType[P]>
            : GetScalarType<T[P], MapElementGroupByOutputType[P]>
        }
      >
    >


  export type MapElementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mapId?: boolean
    elementId?: boolean
    x?: boolean
    y?: boolean
    map?: boolean | MapDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mapElement"]>

  export type MapElementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mapId?: boolean
    elementId?: boolean
    x?: boolean
    y?: boolean
    map?: boolean | MapDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mapElement"]>

  export type MapElementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mapId?: boolean
    elementId?: boolean
    x?: boolean
    y?: boolean
    map?: boolean | MapDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mapElement"]>

  export type MapElementSelectScalar = {
    id?: boolean
    mapId?: boolean
    elementId?: boolean
    x?: boolean
    y?: boolean
  }

  export type MapElementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mapId" | "elementId" | "x" | "y", ExtArgs["result"]["mapElement"]>
  export type MapElementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    map?: boolean | MapDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }
  export type MapElementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    map?: boolean | MapDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }
  export type MapElementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    map?: boolean | MapDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }

  export type $MapElementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MapElement"
    objects: {
      map: Prisma.$MapPayload<ExtArgs>
      element: Prisma.$ElementPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      mapId: number
      elementId: number
      x: number
      y: number
    }, ExtArgs["result"]["mapElement"]>
    composites: {}
  }

  type MapElementGetPayload<S extends boolean | null | undefined | MapElementDefaultArgs> = $Result.GetResult<Prisma.$MapElementPayload, S>

  type MapElementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MapElementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MapElementCountAggregateInputType | true
    }

  export interface MapElementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MapElement'], meta: { name: 'MapElement' } }
    /**
     * Find zero or one MapElement that matches the filter.
     * @param {MapElementFindUniqueArgs} args - Arguments to find a MapElement
     * @example
     * // Get one MapElement
     * const mapElement = await prisma.mapElement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MapElementFindUniqueArgs>(args: SelectSubset<T, MapElementFindUniqueArgs<ExtArgs>>): Prisma__MapElementClient<$Result.GetResult<Prisma.$MapElementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MapElement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MapElementFindUniqueOrThrowArgs} args - Arguments to find a MapElement
     * @example
     * // Get one MapElement
     * const mapElement = await prisma.mapElement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MapElementFindUniqueOrThrowArgs>(args: SelectSubset<T, MapElementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MapElementClient<$Result.GetResult<Prisma.$MapElementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MapElement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapElementFindFirstArgs} args - Arguments to find a MapElement
     * @example
     * // Get one MapElement
     * const mapElement = await prisma.mapElement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MapElementFindFirstArgs>(args?: SelectSubset<T, MapElementFindFirstArgs<ExtArgs>>): Prisma__MapElementClient<$Result.GetResult<Prisma.$MapElementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MapElement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapElementFindFirstOrThrowArgs} args - Arguments to find a MapElement
     * @example
     * // Get one MapElement
     * const mapElement = await prisma.mapElement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MapElementFindFirstOrThrowArgs>(args?: SelectSubset<T, MapElementFindFirstOrThrowArgs<ExtArgs>>): Prisma__MapElementClient<$Result.GetResult<Prisma.$MapElementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MapElements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapElementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MapElements
     * const mapElements = await prisma.mapElement.findMany()
     * 
     * // Get first 10 MapElements
     * const mapElements = await prisma.mapElement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mapElementWithIdOnly = await prisma.mapElement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MapElementFindManyArgs>(args?: SelectSubset<T, MapElementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MapElement.
     * @param {MapElementCreateArgs} args - Arguments to create a MapElement.
     * @example
     * // Create one MapElement
     * const MapElement = await prisma.mapElement.create({
     *   data: {
     *     // ... data to create a MapElement
     *   }
     * })
     * 
     */
    create<T extends MapElementCreateArgs>(args: SelectSubset<T, MapElementCreateArgs<ExtArgs>>): Prisma__MapElementClient<$Result.GetResult<Prisma.$MapElementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MapElements.
     * @param {MapElementCreateManyArgs} args - Arguments to create many MapElements.
     * @example
     * // Create many MapElements
     * const mapElement = await prisma.mapElement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MapElementCreateManyArgs>(args?: SelectSubset<T, MapElementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MapElements and returns the data saved in the database.
     * @param {MapElementCreateManyAndReturnArgs} args - Arguments to create many MapElements.
     * @example
     * // Create many MapElements
     * const mapElement = await prisma.mapElement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MapElements and only return the `id`
     * const mapElementWithIdOnly = await prisma.mapElement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MapElementCreateManyAndReturnArgs>(args?: SelectSubset<T, MapElementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapElementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MapElement.
     * @param {MapElementDeleteArgs} args - Arguments to delete one MapElement.
     * @example
     * // Delete one MapElement
     * const MapElement = await prisma.mapElement.delete({
     *   where: {
     *     // ... filter to delete one MapElement
     *   }
     * })
     * 
     */
    delete<T extends MapElementDeleteArgs>(args: SelectSubset<T, MapElementDeleteArgs<ExtArgs>>): Prisma__MapElementClient<$Result.GetResult<Prisma.$MapElementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MapElement.
     * @param {MapElementUpdateArgs} args - Arguments to update one MapElement.
     * @example
     * // Update one MapElement
     * const mapElement = await prisma.mapElement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MapElementUpdateArgs>(args: SelectSubset<T, MapElementUpdateArgs<ExtArgs>>): Prisma__MapElementClient<$Result.GetResult<Prisma.$MapElementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MapElements.
     * @param {MapElementDeleteManyArgs} args - Arguments to filter MapElements to delete.
     * @example
     * // Delete a few MapElements
     * const { count } = await prisma.mapElement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MapElementDeleteManyArgs>(args?: SelectSubset<T, MapElementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MapElements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapElementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MapElements
     * const mapElement = await prisma.mapElement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MapElementUpdateManyArgs>(args: SelectSubset<T, MapElementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MapElements and returns the data updated in the database.
     * @param {MapElementUpdateManyAndReturnArgs} args - Arguments to update many MapElements.
     * @example
     * // Update many MapElements
     * const mapElement = await prisma.mapElement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MapElements and only return the `id`
     * const mapElementWithIdOnly = await prisma.mapElement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MapElementUpdateManyAndReturnArgs>(args: SelectSubset<T, MapElementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapElementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MapElement.
     * @param {MapElementUpsertArgs} args - Arguments to update or create a MapElement.
     * @example
     * // Update or create a MapElement
     * const mapElement = await prisma.mapElement.upsert({
     *   create: {
     *     // ... data to create a MapElement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MapElement we want to update
     *   }
     * })
     */
    upsert<T extends MapElementUpsertArgs>(args: SelectSubset<T, MapElementUpsertArgs<ExtArgs>>): Prisma__MapElementClient<$Result.GetResult<Prisma.$MapElementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MapElements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapElementCountArgs} args - Arguments to filter MapElements to count.
     * @example
     * // Count the number of MapElements
     * const count = await prisma.mapElement.count({
     *   where: {
     *     // ... the filter for the MapElements we want to count
     *   }
     * })
    **/
    count<T extends MapElementCountArgs>(
      args?: Subset<T, MapElementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MapElementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MapElement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapElementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MapElementAggregateArgs>(args: Subset<T, MapElementAggregateArgs>): Prisma.PrismaPromise<GetMapElementAggregateType<T>>

    /**
     * Group by MapElement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapElementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MapElementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MapElementGroupByArgs['orderBy'] }
        : { orderBy?: MapElementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MapElementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMapElementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MapElement model
   */
  readonly fields: MapElementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MapElement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MapElementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    map<T extends MapDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MapDefaultArgs<ExtArgs>>): Prisma__MapClient<$Result.GetResult<Prisma.$MapPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    element<T extends ElementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ElementDefaultArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MapElement model
   */
  interface MapElementFieldRefs {
    readonly id: FieldRef<"MapElement", 'Int'>
    readonly mapId: FieldRef<"MapElement", 'Int'>
    readonly elementId: FieldRef<"MapElement", 'Int'>
    readonly x: FieldRef<"MapElement", 'Int'>
    readonly y: FieldRef<"MapElement", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MapElement findUnique
   */
  export type MapElementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElement
     */
    select?: MapElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElement
     */
    omit?: MapElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementInclude<ExtArgs> | null
    /**
     * Filter, which MapElement to fetch.
     */
    where: MapElementWhereUniqueInput
  }

  /**
   * MapElement findUniqueOrThrow
   */
  export type MapElementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElement
     */
    select?: MapElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElement
     */
    omit?: MapElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementInclude<ExtArgs> | null
    /**
     * Filter, which MapElement to fetch.
     */
    where: MapElementWhereUniqueInput
  }

  /**
   * MapElement findFirst
   */
  export type MapElementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElement
     */
    select?: MapElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElement
     */
    omit?: MapElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementInclude<ExtArgs> | null
    /**
     * Filter, which MapElement to fetch.
     */
    where?: MapElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MapElements to fetch.
     */
    orderBy?: MapElementOrderByWithRelationInput | MapElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MapElements.
     */
    cursor?: MapElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MapElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MapElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MapElements.
     */
    distinct?: MapElementScalarFieldEnum | MapElementScalarFieldEnum[]
  }

  /**
   * MapElement findFirstOrThrow
   */
  export type MapElementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElement
     */
    select?: MapElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElement
     */
    omit?: MapElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementInclude<ExtArgs> | null
    /**
     * Filter, which MapElement to fetch.
     */
    where?: MapElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MapElements to fetch.
     */
    orderBy?: MapElementOrderByWithRelationInput | MapElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MapElements.
     */
    cursor?: MapElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MapElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MapElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MapElements.
     */
    distinct?: MapElementScalarFieldEnum | MapElementScalarFieldEnum[]
  }

  /**
   * MapElement findMany
   */
  export type MapElementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElement
     */
    select?: MapElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElement
     */
    omit?: MapElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementInclude<ExtArgs> | null
    /**
     * Filter, which MapElements to fetch.
     */
    where?: MapElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MapElements to fetch.
     */
    orderBy?: MapElementOrderByWithRelationInput | MapElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MapElements.
     */
    cursor?: MapElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MapElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MapElements.
     */
    skip?: number
    distinct?: MapElementScalarFieldEnum | MapElementScalarFieldEnum[]
  }

  /**
   * MapElement create
   */
  export type MapElementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElement
     */
    select?: MapElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElement
     */
    omit?: MapElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementInclude<ExtArgs> | null
    /**
     * The data needed to create a MapElement.
     */
    data: XOR<MapElementCreateInput, MapElementUncheckedCreateInput>
  }

  /**
   * MapElement createMany
   */
  export type MapElementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MapElements.
     */
    data: MapElementCreateManyInput | MapElementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MapElement createManyAndReturn
   */
  export type MapElementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElement
     */
    select?: MapElementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MapElement
     */
    omit?: MapElementOmit<ExtArgs> | null
    /**
     * The data used to create many MapElements.
     */
    data: MapElementCreateManyInput | MapElementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MapElement update
   */
  export type MapElementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElement
     */
    select?: MapElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElement
     */
    omit?: MapElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementInclude<ExtArgs> | null
    /**
     * The data needed to update a MapElement.
     */
    data: XOR<MapElementUpdateInput, MapElementUncheckedUpdateInput>
    /**
     * Choose, which MapElement to update.
     */
    where: MapElementWhereUniqueInput
  }

  /**
   * MapElement updateMany
   */
  export type MapElementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MapElements.
     */
    data: XOR<MapElementUpdateManyMutationInput, MapElementUncheckedUpdateManyInput>
    /**
     * Filter which MapElements to update
     */
    where?: MapElementWhereInput
    /**
     * Limit how many MapElements to update.
     */
    limit?: number
  }

  /**
   * MapElement updateManyAndReturn
   */
  export type MapElementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElement
     */
    select?: MapElementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MapElement
     */
    omit?: MapElementOmit<ExtArgs> | null
    /**
     * The data used to update MapElements.
     */
    data: XOR<MapElementUpdateManyMutationInput, MapElementUncheckedUpdateManyInput>
    /**
     * Filter which MapElements to update
     */
    where?: MapElementWhereInput
    /**
     * Limit how many MapElements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MapElement upsert
   */
  export type MapElementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElement
     */
    select?: MapElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElement
     */
    omit?: MapElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementInclude<ExtArgs> | null
    /**
     * The filter to search for the MapElement to update in case it exists.
     */
    where: MapElementWhereUniqueInput
    /**
     * In case the MapElement found by the `where` argument doesn't exist, create a new MapElement with this data.
     */
    create: XOR<MapElementCreateInput, MapElementUncheckedCreateInput>
    /**
     * In case the MapElement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MapElementUpdateInput, MapElementUncheckedUpdateInput>
  }

  /**
   * MapElement delete
   */
  export type MapElementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElement
     */
    select?: MapElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElement
     */
    omit?: MapElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementInclude<ExtArgs> | null
    /**
     * Filter which MapElement to delete.
     */
    where: MapElementWhereUniqueInput
  }

  /**
   * MapElement deleteMany
   */
  export type MapElementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MapElements to delete
     */
    where?: MapElementWhereInput
    /**
     * Limit how many MapElements to delete.
     */
    limit?: number
  }

  /**
   * MapElement without action
   */
  export type MapElementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MapElement
     */
    select?: MapElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MapElement
     */
    omit?: MapElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MapElementInclude<ExtArgs> | null
  }


  /**
   * Model SpaceElement
   */

  export type AggregateSpaceElement = {
    _count: SpaceElementCountAggregateOutputType | null
    _avg: SpaceElementAvgAggregateOutputType | null
    _sum: SpaceElementSumAggregateOutputType | null
    _min: SpaceElementMinAggregateOutputType | null
    _max: SpaceElementMaxAggregateOutputType | null
  }

  export type SpaceElementAvgAggregateOutputType = {
    id: number | null
    spaceId: number | null
    elementId: number | null
    x: number | null
    y: number | null
  }

  export type SpaceElementSumAggregateOutputType = {
    id: number | null
    spaceId: number | null
    elementId: number | null
    x: number | null
    y: number | null
  }

  export type SpaceElementMinAggregateOutputType = {
    id: number | null
    spaceId: number | null
    elementId: number | null
    x: number | null
    y: number | null
  }

  export type SpaceElementMaxAggregateOutputType = {
    id: number | null
    spaceId: number | null
    elementId: number | null
    x: number | null
    y: number | null
  }

  export type SpaceElementCountAggregateOutputType = {
    id: number
    spaceId: number
    elementId: number
    x: number
    y: number
    _all: number
  }


  export type SpaceElementAvgAggregateInputType = {
    id?: true
    spaceId?: true
    elementId?: true
    x?: true
    y?: true
  }

  export type SpaceElementSumAggregateInputType = {
    id?: true
    spaceId?: true
    elementId?: true
    x?: true
    y?: true
  }

  export type SpaceElementMinAggregateInputType = {
    id?: true
    spaceId?: true
    elementId?: true
    x?: true
    y?: true
  }

  export type SpaceElementMaxAggregateInputType = {
    id?: true
    spaceId?: true
    elementId?: true
    x?: true
    y?: true
  }

  export type SpaceElementCountAggregateInputType = {
    id?: true
    spaceId?: true
    elementId?: true
    x?: true
    y?: true
    _all?: true
  }

  export type SpaceElementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SpaceElement to aggregate.
     */
    where?: SpaceElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpaceElements to fetch.
     */
    orderBy?: SpaceElementOrderByWithRelationInput | SpaceElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpaceElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpaceElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpaceElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SpaceElements
    **/
    _count?: true | SpaceElementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpaceElementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpaceElementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpaceElementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpaceElementMaxAggregateInputType
  }

  export type GetSpaceElementAggregateType<T extends SpaceElementAggregateArgs> = {
        [P in keyof T & keyof AggregateSpaceElement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpaceElement[P]>
      : GetScalarType<T[P], AggregateSpaceElement[P]>
  }




  export type SpaceElementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpaceElementWhereInput
    orderBy?: SpaceElementOrderByWithAggregationInput | SpaceElementOrderByWithAggregationInput[]
    by: SpaceElementScalarFieldEnum[] | SpaceElementScalarFieldEnum
    having?: SpaceElementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpaceElementCountAggregateInputType | true
    _avg?: SpaceElementAvgAggregateInputType
    _sum?: SpaceElementSumAggregateInputType
    _min?: SpaceElementMinAggregateInputType
    _max?: SpaceElementMaxAggregateInputType
  }

  export type SpaceElementGroupByOutputType = {
    id: number
    spaceId: number
    elementId: number
    x: number
    y: number
    _count: SpaceElementCountAggregateOutputType | null
    _avg: SpaceElementAvgAggregateOutputType | null
    _sum: SpaceElementSumAggregateOutputType | null
    _min: SpaceElementMinAggregateOutputType | null
    _max: SpaceElementMaxAggregateOutputType | null
  }

  type GetSpaceElementGroupByPayload<T extends SpaceElementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpaceElementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpaceElementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpaceElementGroupByOutputType[P]>
            : GetScalarType<T[P], SpaceElementGroupByOutputType[P]>
        }
      >
    >


  export type SpaceElementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    spaceId?: boolean
    elementId?: boolean
    x?: boolean
    y?: boolean
    space?: boolean | SpaceDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spaceElement"]>

  export type SpaceElementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    spaceId?: boolean
    elementId?: boolean
    x?: boolean
    y?: boolean
    space?: boolean | SpaceDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spaceElement"]>

  export type SpaceElementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    spaceId?: boolean
    elementId?: boolean
    x?: boolean
    y?: boolean
    space?: boolean | SpaceDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spaceElement"]>

  export type SpaceElementSelectScalar = {
    id?: boolean
    spaceId?: boolean
    elementId?: boolean
    x?: boolean
    y?: boolean
  }

  export type SpaceElementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "spaceId" | "elementId" | "x" | "y", ExtArgs["result"]["spaceElement"]>
  export type SpaceElementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    space?: boolean | SpaceDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }
  export type SpaceElementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    space?: boolean | SpaceDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }
  export type SpaceElementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    space?: boolean | SpaceDefaultArgs<ExtArgs>
    element?: boolean | ElementDefaultArgs<ExtArgs>
  }

  export type $SpaceElementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SpaceElement"
    objects: {
      space: Prisma.$SpacePayload<ExtArgs>
      element: Prisma.$ElementPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      spaceId: number
      elementId: number
      x: number
      y: number
    }, ExtArgs["result"]["spaceElement"]>
    composites: {}
  }

  type SpaceElementGetPayload<S extends boolean | null | undefined | SpaceElementDefaultArgs> = $Result.GetResult<Prisma.$SpaceElementPayload, S>

  type SpaceElementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SpaceElementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpaceElementCountAggregateInputType | true
    }

  export interface SpaceElementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SpaceElement'], meta: { name: 'SpaceElement' } }
    /**
     * Find zero or one SpaceElement that matches the filter.
     * @param {SpaceElementFindUniqueArgs} args - Arguments to find a SpaceElement
     * @example
     * // Get one SpaceElement
     * const spaceElement = await prisma.spaceElement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpaceElementFindUniqueArgs>(args: SelectSubset<T, SpaceElementFindUniqueArgs<ExtArgs>>): Prisma__SpaceElementClient<$Result.GetResult<Prisma.$SpaceElementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SpaceElement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SpaceElementFindUniqueOrThrowArgs} args - Arguments to find a SpaceElement
     * @example
     * // Get one SpaceElement
     * const spaceElement = await prisma.spaceElement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpaceElementFindUniqueOrThrowArgs>(args: SelectSubset<T, SpaceElementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpaceElementClient<$Result.GetResult<Prisma.$SpaceElementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SpaceElement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceElementFindFirstArgs} args - Arguments to find a SpaceElement
     * @example
     * // Get one SpaceElement
     * const spaceElement = await prisma.spaceElement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpaceElementFindFirstArgs>(args?: SelectSubset<T, SpaceElementFindFirstArgs<ExtArgs>>): Prisma__SpaceElementClient<$Result.GetResult<Prisma.$SpaceElementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SpaceElement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceElementFindFirstOrThrowArgs} args - Arguments to find a SpaceElement
     * @example
     * // Get one SpaceElement
     * const spaceElement = await prisma.spaceElement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpaceElementFindFirstOrThrowArgs>(args?: SelectSubset<T, SpaceElementFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpaceElementClient<$Result.GetResult<Prisma.$SpaceElementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SpaceElements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceElementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SpaceElements
     * const spaceElements = await prisma.spaceElement.findMany()
     * 
     * // Get first 10 SpaceElements
     * const spaceElements = await prisma.spaceElement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spaceElementWithIdOnly = await prisma.spaceElement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpaceElementFindManyArgs>(args?: SelectSubset<T, SpaceElementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpaceElementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SpaceElement.
     * @param {SpaceElementCreateArgs} args - Arguments to create a SpaceElement.
     * @example
     * // Create one SpaceElement
     * const SpaceElement = await prisma.spaceElement.create({
     *   data: {
     *     // ... data to create a SpaceElement
     *   }
     * })
     * 
     */
    create<T extends SpaceElementCreateArgs>(args: SelectSubset<T, SpaceElementCreateArgs<ExtArgs>>): Prisma__SpaceElementClient<$Result.GetResult<Prisma.$SpaceElementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SpaceElements.
     * @param {SpaceElementCreateManyArgs} args - Arguments to create many SpaceElements.
     * @example
     * // Create many SpaceElements
     * const spaceElement = await prisma.spaceElement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpaceElementCreateManyArgs>(args?: SelectSubset<T, SpaceElementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SpaceElements and returns the data saved in the database.
     * @param {SpaceElementCreateManyAndReturnArgs} args - Arguments to create many SpaceElements.
     * @example
     * // Create many SpaceElements
     * const spaceElement = await prisma.spaceElement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SpaceElements and only return the `id`
     * const spaceElementWithIdOnly = await prisma.spaceElement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpaceElementCreateManyAndReturnArgs>(args?: SelectSubset<T, SpaceElementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpaceElementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SpaceElement.
     * @param {SpaceElementDeleteArgs} args - Arguments to delete one SpaceElement.
     * @example
     * // Delete one SpaceElement
     * const SpaceElement = await prisma.spaceElement.delete({
     *   where: {
     *     // ... filter to delete one SpaceElement
     *   }
     * })
     * 
     */
    delete<T extends SpaceElementDeleteArgs>(args: SelectSubset<T, SpaceElementDeleteArgs<ExtArgs>>): Prisma__SpaceElementClient<$Result.GetResult<Prisma.$SpaceElementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SpaceElement.
     * @param {SpaceElementUpdateArgs} args - Arguments to update one SpaceElement.
     * @example
     * // Update one SpaceElement
     * const spaceElement = await prisma.spaceElement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpaceElementUpdateArgs>(args: SelectSubset<T, SpaceElementUpdateArgs<ExtArgs>>): Prisma__SpaceElementClient<$Result.GetResult<Prisma.$SpaceElementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SpaceElements.
     * @param {SpaceElementDeleteManyArgs} args - Arguments to filter SpaceElements to delete.
     * @example
     * // Delete a few SpaceElements
     * const { count } = await prisma.spaceElement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpaceElementDeleteManyArgs>(args?: SelectSubset<T, SpaceElementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SpaceElements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceElementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SpaceElements
     * const spaceElement = await prisma.spaceElement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpaceElementUpdateManyArgs>(args: SelectSubset<T, SpaceElementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SpaceElements and returns the data updated in the database.
     * @param {SpaceElementUpdateManyAndReturnArgs} args - Arguments to update many SpaceElements.
     * @example
     * // Update many SpaceElements
     * const spaceElement = await prisma.spaceElement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SpaceElements and only return the `id`
     * const spaceElementWithIdOnly = await prisma.spaceElement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SpaceElementUpdateManyAndReturnArgs>(args: SelectSubset<T, SpaceElementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpaceElementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SpaceElement.
     * @param {SpaceElementUpsertArgs} args - Arguments to update or create a SpaceElement.
     * @example
     * // Update or create a SpaceElement
     * const spaceElement = await prisma.spaceElement.upsert({
     *   create: {
     *     // ... data to create a SpaceElement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SpaceElement we want to update
     *   }
     * })
     */
    upsert<T extends SpaceElementUpsertArgs>(args: SelectSubset<T, SpaceElementUpsertArgs<ExtArgs>>): Prisma__SpaceElementClient<$Result.GetResult<Prisma.$SpaceElementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SpaceElements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceElementCountArgs} args - Arguments to filter SpaceElements to count.
     * @example
     * // Count the number of SpaceElements
     * const count = await prisma.spaceElement.count({
     *   where: {
     *     // ... the filter for the SpaceElements we want to count
     *   }
     * })
    **/
    count<T extends SpaceElementCountArgs>(
      args?: Subset<T, SpaceElementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpaceElementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SpaceElement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceElementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpaceElementAggregateArgs>(args: Subset<T, SpaceElementAggregateArgs>): Prisma.PrismaPromise<GetSpaceElementAggregateType<T>>

    /**
     * Group by SpaceElement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpaceElementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpaceElementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpaceElementGroupByArgs['orderBy'] }
        : { orderBy?: SpaceElementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpaceElementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpaceElementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SpaceElement model
   */
  readonly fields: SpaceElementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SpaceElement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpaceElementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    space<T extends SpaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SpaceDefaultArgs<ExtArgs>>): Prisma__SpaceClient<$Result.GetResult<Prisma.$SpacePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    element<T extends ElementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ElementDefaultArgs<ExtArgs>>): Prisma__ElementClient<$Result.GetResult<Prisma.$ElementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SpaceElement model
   */
  interface SpaceElementFieldRefs {
    readonly id: FieldRef<"SpaceElement", 'Int'>
    readonly spaceId: FieldRef<"SpaceElement", 'Int'>
    readonly elementId: FieldRef<"SpaceElement", 'Int'>
    readonly x: FieldRef<"SpaceElement", 'Int'>
    readonly y: FieldRef<"SpaceElement", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SpaceElement findUnique
   */
  export type SpaceElementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceElement
     */
    select?: SpaceElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpaceElement
     */
    omit?: SpaceElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceElementInclude<ExtArgs> | null
    /**
     * Filter, which SpaceElement to fetch.
     */
    where: SpaceElementWhereUniqueInput
  }

  /**
   * SpaceElement findUniqueOrThrow
   */
  export type SpaceElementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceElement
     */
    select?: SpaceElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpaceElement
     */
    omit?: SpaceElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceElementInclude<ExtArgs> | null
    /**
     * Filter, which SpaceElement to fetch.
     */
    where: SpaceElementWhereUniqueInput
  }

  /**
   * SpaceElement findFirst
   */
  export type SpaceElementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceElement
     */
    select?: SpaceElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpaceElement
     */
    omit?: SpaceElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceElementInclude<ExtArgs> | null
    /**
     * Filter, which SpaceElement to fetch.
     */
    where?: SpaceElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpaceElements to fetch.
     */
    orderBy?: SpaceElementOrderByWithRelationInput | SpaceElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SpaceElements.
     */
    cursor?: SpaceElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpaceElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpaceElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpaceElements.
     */
    distinct?: SpaceElementScalarFieldEnum | SpaceElementScalarFieldEnum[]
  }

  /**
   * SpaceElement findFirstOrThrow
   */
  export type SpaceElementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceElement
     */
    select?: SpaceElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpaceElement
     */
    omit?: SpaceElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceElementInclude<ExtArgs> | null
    /**
     * Filter, which SpaceElement to fetch.
     */
    where?: SpaceElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpaceElements to fetch.
     */
    orderBy?: SpaceElementOrderByWithRelationInput | SpaceElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SpaceElements.
     */
    cursor?: SpaceElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpaceElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpaceElements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpaceElements.
     */
    distinct?: SpaceElementScalarFieldEnum | SpaceElementScalarFieldEnum[]
  }

  /**
   * SpaceElement findMany
   */
  export type SpaceElementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceElement
     */
    select?: SpaceElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpaceElement
     */
    omit?: SpaceElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceElementInclude<ExtArgs> | null
    /**
     * Filter, which SpaceElements to fetch.
     */
    where?: SpaceElementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpaceElements to fetch.
     */
    orderBy?: SpaceElementOrderByWithRelationInput | SpaceElementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SpaceElements.
     */
    cursor?: SpaceElementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpaceElements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpaceElements.
     */
    skip?: number
    distinct?: SpaceElementScalarFieldEnum | SpaceElementScalarFieldEnum[]
  }

  /**
   * SpaceElement create
   */
  export type SpaceElementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceElement
     */
    select?: SpaceElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpaceElement
     */
    omit?: SpaceElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceElementInclude<ExtArgs> | null
    /**
     * The data needed to create a SpaceElement.
     */
    data: XOR<SpaceElementCreateInput, SpaceElementUncheckedCreateInput>
  }

  /**
   * SpaceElement createMany
   */
  export type SpaceElementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SpaceElements.
     */
    data: SpaceElementCreateManyInput | SpaceElementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SpaceElement createManyAndReturn
   */
  export type SpaceElementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceElement
     */
    select?: SpaceElementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SpaceElement
     */
    omit?: SpaceElementOmit<ExtArgs> | null
    /**
     * The data used to create many SpaceElements.
     */
    data: SpaceElementCreateManyInput | SpaceElementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceElementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SpaceElement update
   */
  export type SpaceElementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceElement
     */
    select?: SpaceElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpaceElement
     */
    omit?: SpaceElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceElementInclude<ExtArgs> | null
    /**
     * The data needed to update a SpaceElement.
     */
    data: XOR<SpaceElementUpdateInput, SpaceElementUncheckedUpdateInput>
    /**
     * Choose, which SpaceElement to update.
     */
    where: SpaceElementWhereUniqueInput
  }

  /**
   * SpaceElement updateMany
   */
  export type SpaceElementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SpaceElements.
     */
    data: XOR<SpaceElementUpdateManyMutationInput, SpaceElementUncheckedUpdateManyInput>
    /**
     * Filter which SpaceElements to update
     */
    where?: SpaceElementWhereInput
    /**
     * Limit how many SpaceElements to update.
     */
    limit?: number
  }

  /**
   * SpaceElement updateManyAndReturn
   */
  export type SpaceElementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceElement
     */
    select?: SpaceElementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SpaceElement
     */
    omit?: SpaceElementOmit<ExtArgs> | null
    /**
     * The data used to update SpaceElements.
     */
    data: XOR<SpaceElementUpdateManyMutationInput, SpaceElementUncheckedUpdateManyInput>
    /**
     * Filter which SpaceElements to update
     */
    where?: SpaceElementWhereInput
    /**
     * Limit how many SpaceElements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceElementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SpaceElement upsert
   */
  export type SpaceElementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceElement
     */
    select?: SpaceElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpaceElement
     */
    omit?: SpaceElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceElementInclude<ExtArgs> | null
    /**
     * The filter to search for the SpaceElement to update in case it exists.
     */
    where: SpaceElementWhereUniqueInput
    /**
     * In case the SpaceElement found by the `where` argument doesn't exist, create a new SpaceElement with this data.
     */
    create: XOR<SpaceElementCreateInput, SpaceElementUncheckedCreateInput>
    /**
     * In case the SpaceElement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpaceElementUpdateInput, SpaceElementUncheckedUpdateInput>
  }

  /**
   * SpaceElement delete
   */
  export type SpaceElementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceElement
     */
    select?: SpaceElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpaceElement
     */
    omit?: SpaceElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceElementInclude<ExtArgs> | null
    /**
     * Filter which SpaceElement to delete.
     */
    where: SpaceElementWhereUniqueInput
  }

  /**
   * SpaceElement deleteMany
   */
  export type SpaceElementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SpaceElements to delete
     */
    where?: SpaceElementWhereInput
    /**
     * Limit how many SpaceElements to delete.
     */
    limit?: number
  }

  /**
   * SpaceElement without action
   */
  export type SpaceElementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpaceElement
     */
    select?: SpaceElementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpaceElement
     */
    omit?: SpaceElementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpaceElementInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AvatarScalarFieldEnum: {
    id: 'id',
    imageUrl: 'imageUrl',
    name: 'name'
  };

  export type AvatarScalarFieldEnum = (typeof AvatarScalarFieldEnum)[keyof typeof AvatarScalarFieldEnum]


  export const ElementScalarFieldEnum: {
    id: 'id',
    width: 'width',
    height: 'height',
    imageUrl: 'imageUrl',
    isStatic: 'isStatic'
  };

  export type ElementScalarFieldEnum = (typeof ElementScalarFieldEnum)[keyof typeof ElementScalarFieldEnum]


  export const MapScalarFieldEnum: {
    id: 'id',
    name: 'name',
    width: 'width',
    height: 'height'
  };

  export type MapScalarFieldEnum = (typeof MapScalarFieldEnum)[keyof typeof MapScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    avatarId: 'avatarId',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SpaceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    width: 'width',
    height: 'height',
    thumbnail: 'thumbnail',
    ownerId: 'ownerId'
  };

  export type SpaceScalarFieldEnum = (typeof SpaceScalarFieldEnum)[keyof typeof SpaceScalarFieldEnum]


  export const MapElementScalarFieldEnum: {
    id: 'id',
    mapId: 'mapId',
    elementId: 'elementId',
    x: 'x',
    y: 'y'
  };

  export type MapElementScalarFieldEnum = (typeof MapElementScalarFieldEnum)[keyof typeof MapElementScalarFieldEnum]


  export const SpaceElementScalarFieldEnum: {
    id: 'id',
    spaceId: 'spaceId',
    elementId: 'elementId',
    x: 'x',
    y: 'y'
  };

  export type SpaceElementScalarFieldEnum = (typeof SpaceElementScalarFieldEnum)[keyof typeof SpaceElementScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type AvatarWhereInput = {
    AND?: AvatarWhereInput | AvatarWhereInput[]
    OR?: AvatarWhereInput[]
    NOT?: AvatarWhereInput | AvatarWhereInput[]
    id?: IntFilter<"Avatar"> | number
    imageUrl?: StringFilter<"Avatar"> | string
    name?: StringFilter<"Avatar"> | string
    users?: UserListRelationFilter
  }

  export type AvatarOrderByWithRelationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    name?: SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type AvatarWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AvatarWhereInput | AvatarWhereInput[]
    OR?: AvatarWhereInput[]
    NOT?: AvatarWhereInput | AvatarWhereInput[]
    imageUrl?: StringFilter<"Avatar"> | string
    name?: StringFilter<"Avatar"> | string
    users?: UserListRelationFilter
  }, "id">

  export type AvatarOrderByWithAggregationInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    name?: SortOrder
    _count?: AvatarCountOrderByAggregateInput
    _avg?: AvatarAvgOrderByAggregateInput
    _max?: AvatarMaxOrderByAggregateInput
    _min?: AvatarMinOrderByAggregateInput
    _sum?: AvatarSumOrderByAggregateInput
  }

  export type AvatarScalarWhereWithAggregatesInput = {
    AND?: AvatarScalarWhereWithAggregatesInput | AvatarScalarWhereWithAggregatesInput[]
    OR?: AvatarScalarWhereWithAggregatesInput[]
    NOT?: AvatarScalarWhereWithAggregatesInput | AvatarScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Avatar"> | number
    imageUrl?: StringWithAggregatesFilter<"Avatar"> | string
    name?: StringWithAggregatesFilter<"Avatar"> | string
  }

  export type ElementWhereInput = {
    AND?: ElementWhereInput | ElementWhereInput[]
    OR?: ElementWhereInput[]
    NOT?: ElementWhereInput | ElementWhereInput[]
    id?: IntFilter<"Element"> | number
    width?: IntFilter<"Element"> | number
    height?: IntFilter<"Element"> | number
    imageUrl?: StringFilter<"Element"> | string
    isStatic?: BoolFilter<"Element"> | boolean
    mapElements?: MapElementListRelationFilter
    spaceElements?: SpaceElementListRelationFilter
  }

  export type ElementOrderByWithRelationInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    imageUrl?: SortOrder
    isStatic?: SortOrder
    mapElements?: MapElementOrderByRelationAggregateInput
    spaceElements?: SpaceElementOrderByRelationAggregateInput
  }

  export type ElementWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ElementWhereInput | ElementWhereInput[]
    OR?: ElementWhereInput[]
    NOT?: ElementWhereInput | ElementWhereInput[]
    width?: IntFilter<"Element"> | number
    height?: IntFilter<"Element"> | number
    imageUrl?: StringFilter<"Element"> | string
    isStatic?: BoolFilter<"Element"> | boolean
    mapElements?: MapElementListRelationFilter
    spaceElements?: SpaceElementListRelationFilter
  }, "id">

  export type ElementOrderByWithAggregationInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    imageUrl?: SortOrder
    isStatic?: SortOrder
    _count?: ElementCountOrderByAggregateInput
    _avg?: ElementAvgOrderByAggregateInput
    _max?: ElementMaxOrderByAggregateInput
    _min?: ElementMinOrderByAggregateInput
    _sum?: ElementSumOrderByAggregateInput
  }

  export type ElementScalarWhereWithAggregatesInput = {
    AND?: ElementScalarWhereWithAggregatesInput | ElementScalarWhereWithAggregatesInput[]
    OR?: ElementScalarWhereWithAggregatesInput[]
    NOT?: ElementScalarWhereWithAggregatesInput | ElementScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Element"> | number
    width?: IntWithAggregatesFilter<"Element"> | number
    height?: IntWithAggregatesFilter<"Element"> | number
    imageUrl?: StringWithAggregatesFilter<"Element"> | string
    isStatic?: BoolWithAggregatesFilter<"Element"> | boolean
  }

  export type MapWhereInput = {
    AND?: MapWhereInput | MapWhereInput[]
    OR?: MapWhereInput[]
    NOT?: MapWhereInput | MapWhereInput[]
    id?: IntFilter<"Map"> | number
    name?: StringFilter<"Map"> | string
    width?: IntFilter<"Map"> | number
    height?: IntFilter<"Map"> | number
    mapElements?: MapElementListRelationFilter
  }

  export type MapOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    mapElements?: MapElementOrderByRelationAggregateInput
  }

  export type MapWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MapWhereInput | MapWhereInput[]
    OR?: MapWhereInput[]
    NOT?: MapWhereInput | MapWhereInput[]
    name?: StringFilter<"Map"> | string
    width?: IntFilter<"Map"> | number
    height?: IntFilter<"Map"> | number
    mapElements?: MapElementListRelationFilter
  }, "id">

  export type MapOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    _count?: MapCountOrderByAggregateInput
    _avg?: MapAvgOrderByAggregateInput
    _max?: MapMaxOrderByAggregateInput
    _min?: MapMinOrderByAggregateInput
    _sum?: MapSumOrderByAggregateInput
  }

  export type MapScalarWhereWithAggregatesInput = {
    AND?: MapScalarWhereWithAggregatesInput | MapScalarWhereWithAggregatesInput[]
    OR?: MapScalarWhereWithAggregatesInput[]
    NOT?: MapScalarWhereWithAggregatesInput | MapScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Map"> | number
    name?: StringWithAggregatesFilter<"Map"> | string
    width?: IntWithAggregatesFilter<"Map"> | number
    height?: IntWithAggregatesFilter<"Map"> | number
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatarId?: IntNullableFilter<"User"> | number | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    avatar?: XOR<AvatarNullableScalarRelationFilter, AvatarWhereInput> | null
    spaces?: SpaceListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    avatarId?: SortOrderInput | SortOrder
    role?: SortOrder
    avatar?: AvatarOrderByWithRelationInput
    spaces?: SpaceOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    avatarId?: IntNullableFilter<"User"> | number | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    avatar?: XOR<AvatarNullableScalarRelationFilter, AvatarWhereInput> | null
    spaces?: SpaceListRelationFilter
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    avatarId?: SortOrderInput | SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    avatarId?: IntNullableWithAggregatesFilter<"User"> | number | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
  }

  export type SpaceWhereInput = {
    AND?: SpaceWhereInput | SpaceWhereInput[]
    OR?: SpaceWhereInput[]
    NOT?: SpaceWhereInput | SpaceWhereInput[]
    id?: IntFilter<"Space"> | number
    name?: StringFilter<"Space"> | string
    width?: IntFilter<"Space"> | number
    height?: IntFilter<"Space"> | number
    thumbnail?: StringNullableFilter<"Space"> | string | null
    ownerId?: IntFilter<"Space"> | number
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    elements?: SpaceElementListRelationFilter
  }

  export type SpaceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    owner?: UserOrderByWithRelationInput
    elements?: SpaceElementOrderByRelationAggregateInput
  }

  export type SpaceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SpaceWhereInput | SpaceWhereInput[]
    OR?: SpaceWhereInput[]
    NOT?: SpaceWhereInput | SpaceWhereInput[]
    name?: StringFilter<"Space"> | string
    width?: IntFilter<"Space"> | number
    height?: IntFilter<"Space"> | number
    thumbnail?: StringNullableFilter<"Space"> | string | null
    ownerId?: IntFilter<"Space"> | number
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    elements?: SpaceElementListRelationFilter
  }, "id">

  export type SpaceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    _count?: SpaceCountOrderByAggregateInput
    _avg?: SpaceAvgOrderByAggregateInput
    _max?: SpaceMaxOrderByAggregateInput
    _min?: SpaceMinOrderByAggregateInput
    _sum?: SpaceSumOrderByAggregateInput
  }

  export type SpaceScalarWhereWithAggregatesInput = {
    AND?: SpaceScalarWhereWithAggregatesInput | SpaceScalarWhereWithAggregatesInput[]
    OR?: SpaceScalarWhereWithAggregatesInput[]
    NOT?: SpaceScalarWhereWithAggregatesInput | SpaceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Space"> | number
    name?: StringWithAggregatesFilter<"Space"> | string
    width?: IntWithAggregatesFilter<"Space"> | number
    height?: IntWithAggregatesFilter<"Space"> | number
    thumbnail?: StringNullableWithAggregatesFilter<"Space"> | string | null
    ownerId?: IntWithAggregatesFilter<"Space"> | number
  }

  export type MapElementWhereInput = {
    AND?: MapElementWhereInput | MapElementWhereInput[]
    OR?: MapElementWhereInput[]
    NOT?: MapElementWhereInput | MapElementWhereInput[]
    id?: IntFilter<"MapElement"> | number
    mapId?: IntFilter<"MapElement"> | number
    elementId?: IntFilter<"MapElement"> | number
    x?: IntFilter<"MapElement"> | number
    y?: IntFilter<"MapElement"> | number
    map?: XOR<MapScalarRelationFilter, MapWhereInput>
    element?: XOR<ElementScalarRelationFilter, ElementWhereInput>
  }

  export type MapElementOrderByWithRelationInput = {
    id?: SortOrder
    mapId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
    map?: MapOrderByWithRelationInput
    element?: ElementOrderByWithRelationInput
  }

  export type MapElementWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MapElementWhereInput | MapElementWhereInput[]
    OR?: MapElementWhereInput[]
    NOT?: MapElementWhereInput | MapElementWhereInput[]
    mapId?: IntFilter<"MapElement"> | number
    elementId?: IntFilter<"MapElement"> | number
    x?: IntFilter<"MapElement"> | number
    y?: IntFilter<"MapElement"> | number
    map?: XOR<MapScalarRelationFilter, MapWhereInput>
    element?: XOR<ElementScalarRelationFilter, ElementWhereInput>
  }, "id">

  export type MapElementOrderByWithAggregationInput = {
    id?: SortOrder
    mapId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
    _count?: MapElementCountOrderByAggregateInput
    _avg?: MapElementAvgOrderByAggregateInput
    _max?: MapElementMaxOrderByAggregateInput
    _min?: MapElementMinOrderByAggregateInput
    _sum?: MapElementSumOrderByAggregateInput
  }

  export type MapElementScalarWhereWithAggregatesInput = {
    AND?: MapElementScalarWhereWithAggregatesInput | MapElementScalarWhereWithAggregatesInput[]
    OR?: MapElementScalarWhereWithAggregatesInput[]
    NOT?: MapElementScalarWhereWithAggregatesInput | MapElementScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MapElement"> | number
    mapId?: IntWithAggregatesFilter<"MapElement"> | number
    elementId?: IntWithAggregatesFilter<"MapElement"> | number
    x?: IntWithAggregatesFilter<"MapElement"> | number
    y?: IntWithAggregatesFilter<"MapElement"> | number
  }

  export type SpaceElementWhereInput = {
    AND?: SpaceElementWhereInput | SpaceElementWhereInput[]
    OR?: SpaceElementWhereInput[]
    NOT?: SpaceElementWhereInput | SpaceElementWhereInput[]
    id?: IntFilter<"SpaceElement"> | number
    spaceId?: IntFilter<"SpaceElement"> | number
    elementId?: IntFilter<"SpaceElement"> | number
    x?: IntFilter<"SpaceElement"> | number
    y?: IntFilter<"SpaceElement"> | number
    space?: XOR<SpaceScalarRelationFilter, SpaceWhereInput>
    element?: XOR<ElementScalarRelationFilter, ElementWhereInput>
  }

  export type SpaceElementOrderByWithRelationInput = {
    id?: SortOrder
    spaceId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
    space?: SpaceOrderByWithRelationInput
    element?: ElementOrderByWithRelationInput
  }

  export type SpaceElementWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SpaceElementWhereInput | SpaceElementWhereInput[]
    OR?: SpaceElementWhereInput[]
    NOT?: SpaceElementWhereInput | SpaceElementWhereInput[]
    spaceId?: IntFilter<"SpaceElement"> | number
    elementId?: IntFilter<"SpaceElement"> | number
    x?: IntFilter<"SpaceElement"> | number
    y?: IntFilter<"SpaceElement"> | number
    space?: XOR<SpaceScalarRelationFilter, SpaceWhereInput>
    element?: XOR<ElementScalarRelationFilter, ElementWhereInput>
  }, "id">

  export type SpaceElementOrderByWithAggregationInput = {
    id?: SortOrder
    spaceId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
    _count?: SpaceElementCountOrderByAggregateInput
    _avg?: SpaceElementAvgOrderByAggregateInput
    _max?: SpaceElementMaxOrderByAggregateInput
    _min?: SpaceElementMinOrderByAggregateInput
    _sum?: SpaceElementSumOrderByAggregateInput
  }

  export type SpaceElementScalarWhereWithAggregatesInput = {
    AND?: SpaceElementScalarWhereWithAggregatesInput | SpaceElementScalarWhereWithAggregatesInput[]
    OR?: SpaceElementScalarWhereWithAggregatesInput[]
    NOT?: SpaceElementScalarWhereWithAggregatesInput | SpaceElementScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SpaceElement"> | number
    spaceId?: IntWithAggregatesFilter<"SpaceElement"> | number
    elementId?: IntWithAggregatesFilter<"SpaceElement"> | number
    x?: IntWithAggregatesFilter<"SpaceElement"> | number
    y?: IntWithAggregatesFilter<"SpaceElement"> | number
  }

  export type AvatarCreateInput = {
    imageUrl: string
    name: string
    users?: UserCreateNestedManyWithoutAvatarInput
  }

  export type AvatarUncheckedCreateInput = {
    id?: number
    imageUrl: string
    name: string
    users?: UserUncheckedCreateNestedManyWithoutAvatarInput
  }

  export type AvatarUpdateInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateManyWithoutAvatarNestedInput
  }

  export type AvatarUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    users?: UserUncheckedUpdateManyWithoutAvatarNestedInput
  }

  export type AvatarCreateManyInput = {
    id?: number
    imageUrl: string
    name: string
  }

  export type AvatarUpdateManyMutationInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AvatarUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type ElementCreateInput = {
    width: number
    height: number
    imageUrl: string
    isStatic?: boolean
    mapElements?: MapElementCreateNestedManyWithoutElementInput
    spaceElements?: SpaceElementCreateNestedManyWithoutElementInput
  }

  export type ElementUncheckedCreateInput = {
    id?: number
    width: number
    height: number
    imageUrl: string
    isStatic?: boolean
    mapElements?: MapElementUncheckedCreateNestedManyWithoutElementInput
    spaceElements?: SpaceElementUncheckedCreateNestedManyWithoutElementInput
  }

  export type ElementUpdateInput = {
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isStatic?: BoolFieldUpdateOperationsInput | boolean
    mapElements?: MapElementUpdateManyWithoutElementNestedInput
    spaceElements?: SpaceElementUpdateManyWithoutElementNestedInput
  }

  export type ElementUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isStatic?: BoolFieldUpdateOperationsInput | boolean
    mapElements?: MapElementUncheckedUpdateManyWithoutElementNestedInput
    spaceElements?: SpaceElementUncheckedUpdateManyWithoutElementNestedInput
  }

  export type ElementCreateManyInput = {
    id?: number
    width: number
    height: number
    imageUrl: string
    isStatic?: boolean
  }

  export type ElementUpdateManyMutationInput = {
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isStatic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ElementUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isStatic?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MapCreateInput = {
    name: string
    width: number
    height: number
    mapElements?: MapElementCreateNestedManyWithoutMapInput
  }

  export type MapUncheckedCreateInput = {
    id?: number
    name: string
    width: number
    height: number
    mapElements?: MapElementUncheckedCreateNestedManyWithoutMapInput
  }

  export type MapUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    mapElements?: MapElementUpdateManyWithoutMapNestedInput
  }

  export type MapUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    mapElements?: MapElementUncheckedUpdateManyWithoutMapNestedInput
  }

  export type MapCreateManyInput = {
    id?: number
    name: string
    width: number
    height: number
  }

  export type MapUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
  }

  export type MapUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateInput = {
    username: string
    password: string
    role?: $Enums.UserRole
    avatar?: AvatarCreateNestedOneWithoutUsersInput
    spaces?: SpaceCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    password: string
    avatarId?: number | null
    role?: $Enums.UserRole
    spaces?: SpaceUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    avatar?: AvatarUpdateOneWithoutUsersNestedInput
    spaces?: SpaceUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarId?: NullableIntFieldUpdateOperationsInput | number | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    spaces?: SpaceUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    password: string
    avatarId?: number | null
    role?: $Enums.UserRole
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarId?: NullableIntFieldUpdateOperationsInput | number | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type SpaceCreateInput = {
    name: string
    width: number
    height: number
    thumbnail?: string | null
    owner: UserCreateNestedOneWithoutSpacesInput
    elements?: SpaceElementCreateNestedManyWithoutSpaceInput
  }

  export type SpaceUncheckedCreateInput = {
    id?: number
    name: string
    width: number
    height: number
    thumbnail?: string | null
    ownerId: number
    elements?: SpaceElementUncheckedCreateNestedManyWithoutSpaceInput
  }

  export type SpaceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: UserUpdateOneRequiredWithoutSpacesNestedInput
    elements?: SpaceElementUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: IntFieldUpdateOperationsInput | number
    elements?: SpaceElementUncheckedUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceCreateManyInput = {
    id?: number
    name: string
    width: number
    height: number
    thumbnail?: string | null
    ownerId: number
  }

  export type SpaceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SpaceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: IntFieldUpdateOperationsInput | number
  }

  export type MapElementCreateInput = {
    x: number
    y: number
    map: MapCreateNestedOneWithoutMapElementsInput
    element: ElementCreateNestedOneWithoutMapElementsInput
  }

  export type MapElementUncheckedCreateInput = {
    id?: number
    mapId: number
    elementId: number
    x: number
    y: number
  }

  export type MapElementUpdateInput = {
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    map?: MapUpdateOneRequiredWithoutMapElementsNestedInput
    element?: ElementUpdateOneRequiredWithoutMapElementsNestedInput
  }

  export type MapElementUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    mapId?: IntFieldUpdateOperationsInput | number
    elementId?: IntFieldUpdateOperationsInput | number
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type MapElementCreateManyInput = {
    id?: number
    mapId: number
    elementId: number
    x: number
    y: number
  }

  export type MapElementUpdateManyMutationInput = {
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type MapElementUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    mapId?: IntFieldUpdateOperationsInput | number
    elementId?: IntFieldUpdateOperationsInput | number
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type SpaceElementCreateInput = {
    x: number
    y: number
    space: SpaceCreateNestedOneWithoutElementsInput
    element: ElementCreateNestedOneWithoutSpaceElementsInput
  }

  export type SpaceElementUncheckedCreateInput = {
    id?: number
    spaceId: number
    elementId: number
    x: number
    y: number
  }

  export type SpaceElementUpdateInput = {
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    space?: SpaceUpdateOneRequiredWithoutElementsNestedInput
    element?: ElementUpdateOneRequiredWithoutSpaceElementsNestedInput
  }

  export type SpaceElementUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    spaceId?: IntFieldUpdateOperationsInput | number
    elementId?: IntFieldUpdateOperationsInput | number
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type SpaceElementCreateManyInput = {
    id?: number
    spaceId: number
    elementId: number
    x: number
    y: number
  }

  export type SpaceElementUpdateManyMutationInput = {
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type SpaceElementUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    spaceId?: IntFieldUpdateOperationsInput | number
    elementId?: IntFieldUpdateOperationsInput | number
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AvatarCountOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    name?: SortOrder
  }

  export type AvatarAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AvatarMaxOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    name?: SortOrder
  }

  export type AvatarMinOrderByAggregateInput = {
    id?: SortOrder
    imageUrl?: SortOrder
    name?: SortOrder
  }

  export type AvatarSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type MapElementListRelationFilter = {
    every?: MapElementWhereInput
    some?: MapElementWhereInput
    none?: MapElementWhereInput
  }

  export type SpaceElementListRelationFilter = {
    every?: SpaceElementWhereInput
    some?: SpaceElementWhereInput
    none?: SpaceElementWhereInput
  }

  export type MapElementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SpaceElementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ElementCountOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    imageUrl?: SortOrder
    isStatic?: SortOrder
  }

  export type ElementAvgOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type ElementMaxOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    imageUrl?: SortOrder
    isStatic?: SortOrder
  }

  export type ElementMinOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    imageUrl?: SortOrder
    isStatic?: SortOrder
  }

  export type ElementSumOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MapCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type MapAvgOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type MapMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type MapMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type MapSumOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type AvatarNullableScalarRelationFilter = {
    is?: AvatarWhereInput | null
    isNot?: AvatarWhereInput | null
  }

  export type SpaceListRelationFilter = {
    every?: SpaceWhereInput
    some?: SpaceWhereInput
    none?: SpaceWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SpaceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    avatarId?: SortOrder
    role?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    avatarId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    avatarId?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    avatarId?: SortOrder
    role?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    avatarId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SpaceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    thumbnail?: SortOrder
    ownerId?: SortOrder
  }

  export type SpaceAvgOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    ownerId?: SortOrder
  }

  export type SpaceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    thumbnail?: SortOrder
    ownerId?: SortOrder
  }

  export type SpaceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    width?: SortOrder
    height?: SortOrder
    thumbnail?: SortOrder
    ownerId?: SortOrder
  }

  export type SpaceSumOrderByAggregateInput = {
    id?: SortOrder
    width?: SortOrder
    height?: SortOrder
    ownerId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type MapScalarRelationFilter = {
    is?: MapWhereInput
    isNot?: MapWhereInput
  }

  export type ElementScalarRelationFilter = {
    is?: ElementWhereInput
    isNot?: ElementWhereInput
  }

  export type MapElementCountOrderByAggregateInput = {
    id?: SortOrder
    mapId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type MapElementAvgOrderByAggregateInput = {
    id?: SortOrder
    mapId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type MapElementMaxOrderByAggregateInput = {
    id?: SortOrder
    mapId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type MapElementMinOrderByAggregateInput = {
    id?: SortOrder
    mapId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type MapElementSumOrderByAggregateInput = {
    id?: SortOrder
    mapId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type SpaceScalarRelationFilter = {
    is?: SpaceWhereInput
    isNot?: SpaceWhereInput
  }

  export type SpaceElementCountOrderByAggregateInput = {
    id?: SortOrder
    spaceId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type SpaceElementAvgOrderByAggregateInput = {
    id?: SortOrder
    spaceId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type SpaceElementMaxOrderByAggregateInput = {
    id?: SortOrder
    spaceId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type SpaceElementMinOrderByAggregateInput = {
    id?: SortOrder
    spaceId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type SpaceElementSumOrderByAggregateInput = {
    id?: SortOrder
    spaceId?: SortOrder
    elementId?: SortOrder
    x?: SortOrder
    y?: SortOrder
  }

  export type UserCreateNestedManyWithoutAvatarInput = {
    create?: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput> | UserCreateWithoutAvatarInput[] | UserUncheckedCreateWithoutAvatarInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAvatarInput | UserCreateOrConnectWithoutAvatarInput[]
    createMany?: UserCreateManyAvatarInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutAvatarInput = {
    create?: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput> | UserCreateWithoutAvatarInput[] | UserUncheckedCreateWithoutAvatarInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAvatarInput | UserCreateOrConnectWithoutAvatarInput[]
    createMany?: UserCreateManyAvatarInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type UserUpdateManyWithoutAvatarNestedInput = {
    create?: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput> | UserCreateWithoutAvatarInput[] | UserUncheckedCreateWithoutAvatarInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAvatarInput | UserCreateOrConnectWithoutAvatarInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutAvatarInput | UserUpsertWithWhereUniqueWithoutAvatarInput[]
    createMany?: UserCreateManyAvatarInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutAvatarInput | UserUpdateWithWhereUniqueWithoutAvatarInput[]
    updateMany?: UserUpdateManyWithWhereWithoutAvatarInput | UserUpdateManyWithWhereWithoutAvatarInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUncheckedUpdateManyWithoutAvatarNestedInput = {
    create?: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput> | UserCreateWithoutAvatarInput[] | UserUncheckedCreateWithoutAvatarInput[]
    connectOrCreate?: UserCreateOrConnectWithoutAvatarInput | UserCreateOrConnectWithoutAvatarInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutAvatarInput | UserUpsertWithWhereUniqueWithoutAvatarInput[]
    createMany?: UserCreateManyAvatarInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutAvatarInput | UserUpdateWithWhereUniqueWithoutAvatarInput[]
    updateMany?: UserUpdateManyWithWhereWithoutAvatarInput | UserUpdateManyWithWhereWithoutAvatarInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type MapElementCreateNestedManyWithoutElementInput = {
    create?: XOR<MapElementCreateWithoutElementInput, MapElementUncheckedCreateWithoutElementInput> | MapElementCreateWithoutElementInput[] | MapElementUncheckedCreateWithoutElementInput[]
    connectOrCreate?: MapElementCreateOrConnectWithoutElementInput | MapElementCreateOrConnectWithoutElementInput[]
    createMany?: MapElementCreateManyElementInputEnvelope
    connect?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
  }

  export type SpaceElementCreateNestedManyWithoutElementInput = {
    create?: XOR<SpaceElementCreateWithoutElementInput, SpaceElementUncheckedCreateWithoutElementInput> | SpaceElementCreateWithoutElementInput[] | SpaceElementUncheckedCreateWithoutElementInput[]
    connectOrCreate?: SpaceElementCreateOrConnectWithoutElementInput | SpaceElementCreateOrConnectWithoutElementInput[]
    createMany?: SpaceElementCreateManyElementInputEnvelope
    connect?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
  }

  export type MapElementUncheckedCreateNestedManyWithoutElementInput = {
    create?: XOR<MapElementCreateWithoutElementInput, MapElementUncheckedCreateWithoutElementInput> | MapElementCreateWithoutElementInput[] | MapElementUncheckedCreateWithoutElementInput[]
    connectOrCreate?: MapElementCreateOrConnectWithoutElementInput | MapElementCreateOrConnectWithoutElementInput[]
    createMany?: MapElementCreateManyElementInputEnvelope
    connect?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
  }

  export type SpaceElementUncheckedCreateNestedManyWithoutElementInput = {
    create?: XOR<SpaceElementCreateWithoutElementInput, SpaceElementUncheckedCreateWithoutElementInput> | SpaceElementCreateWithoutElementInput[] | SpaceElementUncheckedCreateWithoutElementInput[]
    connectOrCreate?: SpaceElementCreateOrConnectWithoutElementInput | SpaceElementCreateOrConnectWithoutElementInput[]
    createMany?: SpaceElementCreateManyElementInputEnvelope
    connect?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type MapElementUpdateManyWithoutElementNestedInput = {
    create?: XOR<MapElementCreateWithoutElementInput, MapElementUncheckedCreateWithoutElementInput> | MapElementCreateWithoutElementInput[] | MapElementUncheckedCreateWithoutElementInput[]
    connectOrCreate?: MapElementCreateOrConnectWithoutElementInput | MapElementCreateOrConnectWithoutElementInput[]
    upsert?: MapElementUpsertWithWhereUniqueWithoutElementInput | MapElementUpsertWithWhereUniqueWithoutElementInput[]
    createMany?: MapElementCreateManyElementInputEnvelope
    set?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    disconnect?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    delete?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    connect?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    update?: MapElementUpdateWithWhereUniqueWithoutElementInput | MapElementUpdateWithWhereUniqueWithoutElementInput[]
    updateMany?: MapElementUpdateManyWithWhereWithoutElementInput | MapElementUpdateManyWithWhereWithoutElementInput[]
    deleteMany?: MapElementScalarWhereInput | MapElementScalarWhereInput[]
  }

  export type SpaceElementUpdateManyWithoutElementNestedInput = {
    create?: XOR<SpaceElementCreateWithoutElementInput, SpaceElementUncheckedCreateWithoutElementInput> | SpaceElementCreateWithoutElementInput[] | SpaceElementUncheckedCreateWithoutElementInput[]
    connectOrCreate?: SpaceElementCreateOrConnectWithoutElementInput | SpaceElementCreateOrConnectWithoutElementInput[]
    upsert?: SpaceElementUpsertWithWhereUniqueWithoutElementInput | SpaceElementUpsertWithWhereUniqueWithoutElementInput[]
    createMany?: SpaceElementCreateManyElementInputEnvelope
    set?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    disconnect?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    delete?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    connect?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    update?: SpaceElementUpdateWithWhereUniqueWithoutElementInput | SpaceElementUpdateWithWhereUniqueWithoutElementInput[]
    updateMany?: SpaceElementUpdateManyWithWhereWithoutElementInput | SpaceElementUpdateManyWithWhereWithoutElementInput[]
    deleteMany?: SpaceElementScalarWhereInput | SpaceElementScalarWhereInput[]
  }

  export type MapElementUncheckedUpdateManyWithoutElementNestedInput = {
    create?: XOR<MapElementCreateWithoutElementInput, MapElementUncheckedCreateWithoutElementInput> | MapElementCreateWithoutElementInput[] | MapElementUncheckedCreateWithoutElementInput[]
    connectOrCreate?: MapElementCreateOrConnectWithoutElementInput | MapElementCreateOrConnectWithoutElementInput[]
    upsert?: MapElementUpsertWithWhereUniqueWithoutElementInput | MapElementUpsertWithWhereUniqueWithoutElementInput[]
    createMany?: MapElementCreateManyElementInputEnvelope
    set?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    disconnect?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    delete?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    connect?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    update?: MapElementUpdateWithWhereUniqueWithoutElementInput | MapElementUpdateWithWhereUniqueWithoutElementInput[]
    updateMany?: MapElementUpdateManyWithWhereWithoutElementInput | MapElementUpdateManyWithWhereWithoutElementInput[]
    deleteMany?: MapElementScalarWhereInput | MapElementScalarWhereInput[]
  }

  export type SpaceElementUncheckedUpdateManyWithoutElementNestedInput = {
    create?: XOR<SpaceElementCreateWithoutElementInput, SpaceElementUncheckedCreateWithoutElementInput> | SpaceElementCreateWithoutElementInput[] | SpaceElementUncheckedCreateWithoutElementInput[]
    connectOrCreate?: SpaceElementCreateOrConnectWithoutElementInput | SpaceElementCreateOrConnectWithoutElementInput[]
    upsert?: SpaceElementUpsertWithWhereUniqueWithoutElementInput | SpaceElementUpsertWithWhereUniqueWithoutElementInput[]
    createMany?: SpaceElementCreateManyElementInputEnvelope
    set?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    disconnect?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    delete?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    connect?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    update?: SpaceElementUpdateWithWhereUniqueWithoutElementInput | SpaceElementUpdateWithWhereUniqueWithoutElementInput[]
    updateMany?: SpaceElementUpdateManyWithWhereWithoutElementInput | SpaceElementUpdateManyWithWhereWithoutElementInput[]
    deleteMany?: SpaceElementScalarWhereInput | SpaceElementScalarWhereInput[]
  }

  export type MapElementCreateNestedManyWithoutMapInput = {
    create?: XOR<MapElementCreateWithoutMapInput, MapElementUncheckedCreateWithoutMapInput> | MapElementCreateWithoutMapInput[] | MapElementUncheckedCreateWithoutMapInput[]
    connectOrCreate?: MapElementCreateOrConnectWithoutMapInput | MapElementCreateOrConnectWithoutMapInput[]
    createMany?: MapElementCreateManyMapInputEnvelope
    connect?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
  }

  export type MapElementUncheckedCreateNestedManyWithoutMapInput = {
    create?: XOR<MapElementCreateWithoutMapInput, MapElementUncheckedCreateWithoutMapInput> | MapElementCreateWithoutMapInput[] | MapElementUncheckedCreateWithoutMapInput[]
    connectOrCreate?: MapElementCreateOrConnectWithoutMapInput | MapElementCreateOrConnectWithoutMapInput[]
    createMany?: MapElementCreateManyMapInputEnvelope
    connect?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
  }

  export type MapElementUpdateManyWithoutMapNestedInput = {
    create?: XOR<MapElementCreateWithoutMapInput, MapElementUncheckedCreateWithoutMapInput> | MapElementCreateWithoutMapInput[] | MapElementUncheckedCreateWithoutMapInput[]
    connectOrCreate?: MapElementCreateOrConnectWithoutMapInput | MapElementCreateOrConnectWithoutMapInput[]
    upsert?: MapElementUpsertWithWhereUniqueWithoutMapInput | MapElementUpsertWithWhereUniqueWithoutMapInput[]
    createMany?: MapElementCreateManyMapInputEnvelope
    set?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    disconnect?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    delete?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    connect?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    update?: MapElementUpdateWithWhereUniqueWithoutMapInput | MapElementUpdateWithWhereUniqueWithoutMapInput[]
    updateMany?: MapElementUpdateManyWithWhereWithoutMapInput | MapElementUpdateManyWithWhereWithoutMapInput[]
    deleteMany?: MapElementScalarWhereInput | MapElementScalarWhereInput[]
  }

  export type MapElementUncheckedUpdateManyWithoutMapNestedInput = {
    create?: XOR<MapElementCreateWithoutMapInput, MapElementUncheckedCreateWithoutMapInput> | MapElementCreateWithoutMapInput[] | MapElementUncheckedCreateWithoutMapInput[]
    connectOrCreate?: MapElementCreateOrConnectWithoutMapInput | MapElementCreateOrConnectWithoutMapInput[]
    upsert?: MapElementUpsertWithWhereUniqueWithoutMapInput | MapElementUpsertWithWhereUniqueWithoutMapInput[]
    createMany?: MapElementCreateManyMapInputEnvelope
    set?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    disconnect?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    delete?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    connect?: MapElementWhereUniqueInput | MapElementWhereUniqueInput[]
    update?: MapElementUpdateWithWhereUniqueWithoutMapInput | MapElementUpdateWithWhereUniqueWithoutMapInput[]
    updateMany?: MapElementUpdateManyWithWhereWithoutMapInput | MapElementUpdateManyWithWhereWithoutMapInput[]
    deleteMany?: MapElementScalarWhereInput | MapElementScalarWhereInput[]
  }

  export type AvatarCreateNestedOneWithoutUsersInput = {
    create?: XOR<AvatarCreateWithoutUsersInput, AvatarUncheckedCreateWithoutUsersInput>
    connectOrCreate?: AvatarCreateOrConnectWithoutUsersInput
    connect?: AvatarWhereUniqueInput
  }

  export type SpaceCreateNestedManyWithoutOwnerInput = {
    create?: XOR<SpaceCreateWithoutOwnerInput, SpaceUncheckedCreateWithoutOwnerInput> | SpaceCreateWithoutOwnerInput[] | SpaceUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutOwnerInput | SpaceCreateOrConnectWithoutOwnerInput[]
    createMany?: SpaceCreateManyOwnerInputEnvelope
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
  }

  export type SpaceUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<SpaceCreateWithoutOwnerInput, SpaceUncheckedCreateWithoutOwnerInput> | SpaceCreateWithoutOwnerInput[] | SpaceUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutOwnerInput | SpaceCreateOrConnectWithoutOwnerInput[]
    createMany?: SpaceCreateManyOwnerInputEnvelope
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type AvatarUpdateOneWithoutUsersNestedInput = {
    create?: XOR<AvatarCreateWithoutUsersInput, AvatarUncheckedCreateWithoutUsersInput>
    connectOrCreate?: AvatarCreateOrConnectWithoutUsersInput
    upsert?: AvatarUpsertWithoutUsersInput
    disconnect?: AvatarWhereInput | boolean
    delete?: AvatarWhereInput | boolean
    connect?: AvatarWhereUniqueInput
    update?: XOR<XOR<AvatarUpdateToOneWithWhereWithoutUsersInput, AvatarUpdateWithoutUsersInput>, AvatarUncheckedUpdateWithoutUsersInput>
  }

  export type SpaceUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<SpaceCreateWithoutOwnerInput, SpaceUncheckedCreateWithoutOwnerInput> | SpaceCreateWithoutOwnerInput[] | SpaceUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutOwnerInput | SpaceCreateOrConnectWithoutOwnerInput[]
    upsert?: SpaceUpsertWithWhereUniqueWithoutOwnerInput | SpaceUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: SpaceCreateManyOwnerInputEnvelope
    set?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    disconnect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    delete?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    update?: SpaceUpdateWithWhereUniqueWithoutOwnerInput | SpaceUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: SpaceUpdateManyWithWhereWithoutOwnerInput | SpaceUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SpaceUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<SpaceCreateWithoutOwnerInput, SpaceUncheckedCreateWithoutOwnerInput> | SpaceCreateWithoutOwnerInput[] | SpaceUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: SpaceCreateOrConnectWithoutOwnerInput | SpaceCreateOrConnectWithoutOwnerInput[]
    upsert?: SpaceUpsertWithWhereUniqueWithoutOwnerInput | SpaceUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: SpaceCreateManyOwnerInputEnvelope
    set?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    disconnect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    delete?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    connect?: SpaceWhereUniqueInput | SpaceWhereUniqueInput[]
    update?: SpaceUpdateWithWhereUniqueWithoutOwnerInput | SpaceUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: SpaceUpdateManyWithWhereWithoutOwnerInput | SpaceUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSpacesInput = {
    create?: XOR<UserCreateWithoutSpacesInput, UserUncheckedCreateWithoutSpacesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSpacesInput
    connect?: UserWhereUniqueInput
  }

  export type SpaceElementCreateNestedManyWithoutSpaceInput = {
    create?: XOR<SpaceElementCreateWithoutSpaceInput, SpaceElementUncheckedCreateWithoutSpaceInput> | SpaceElementCreateWithoutSpaceInput[] | SpaceElementUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: SpaceElementCreateOrConnectWithoutSpaceInput | SpaceElementCreateOrConnectWithoutSpaceInput[]
    createMany?: SpaceElementCreateManySpaceInputEnvelope
    connect?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
  }

  export type SpaceElementUncheckedCreateNestedManyWithoutSpaceInput = {
    create?: XOR<SpaceElementCreateWithoutSpaceInput, SpaceElementUncheckedCreateWithoutSpaceInput> | SpaceElementCreateWithoutSpaceInput[] | SpaceElementUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: SpaceElementCreateOrConnectWithoutSpaceInput | SpaceElementCreateOrConnectWithoutSpaceInput[]
    createMany?: SpaceElementCreateManySpaceInputEnvelope
    connect?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutSpacesNestedInput = {
    create?: XOR<UserCreateWithoutSpacesInput, UserUncheckedCreateWithoutSpacesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSpacesInput
    upsert?: UserUpsertWithoutSpacesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSpacesInput, UserUpdateWithoutSpacesInput>, UserUncheckedUpdateWithoutSpacesInput>
  }

  export type SpaceElementUpdateManyWithoutSpaceNestedInput = {
    create?: XOR<SpaceElementCreateWithoutSpaceInput, SpaceElementUncheckedCreateWithoutSpaceInput> | SpaceElementCreateWithoutSpaceInput[] | SpaceElementUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: SpaceElementCreateOrConnectWithoutSpaceInput | SpaceElementCreateOrConnectWithoutSpaceInput[]
    upsert?: SpaceElementUpsertWithWhereUniqueWithoutSpaceInput | SpaceElementUpsertWithWhereUniqueWithoutSpaceInput[]
    createMany?: SpaceElementCreateManySpaceInputEnvelope
    set?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    disconnect?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    delete?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    connect?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    update?: SpaceElementUpdateWithWhereUniqueWithoutSpaceInput | SpaceElementUpdateWithWhereUniqueWithoutSpaceInput[]
    updateMany?: SpaceElementUpdateManyWithWhereWithoutSpaceInput | SpaceElementUpdateManyWithWhereWithoutSpaceInput[]
    deleteMany?: SpaceElementScalarWhereInput | SpaceElementScalarWhereInput[]
  }

  export type SpaceElementUncheckedUpdateManyWithoutSpaceNestedInput = {
    create?: XOR<SpaceElementCreateWithoutSpaceInput, SpaceElementUncheckedCreateWithoutSpaceInput> | SpaceElementCreateWithoutSpaceInput[] | SpaceElementUncheckedCreateWithoutSpaceInput[]
    connectOrCreate?: SpaceElementCreateOrConnectWithoutSpaceInput | SpaceElementCreateOrConnectWithoutSpaceInput[]
    upsert?: SpaceElementUpsertWithWhereUniqueWithoutSpaceInput | SpaceElementUpsertWithWhereUniqueWithoutSpaceInput[]
    createMany?: SpaceElementCreateManySpaceInputEnvelope
    set?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    disconnect?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    delete?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    connect?: SpaceElementWhereUniqueInput | SpaceElementWhereUniqueInput[]
    update?: SpaceElementUpdateWithWhereUniqueWithoutSpaceInput | SpaceElementUpdateWithWhereUniqueWithoutSpaceInput[]
    updateMany?: SpaceElementUpdateManyWithWhereWithoutSpaceInput | SpaceElementUpdateManyWithWhereWithoutSpaceInput[]
    deleteMany?: SpaceElementScalarWhereInput | SpaceElementScalarWhereInput[]
  }

  export type MapCreateNestedOneWithoutMapElementsInput = {
    create?: XOR<MapCreateWithoutMapElementsInput, MapUncheckedCreateWithoutMapElementsInput>
    connectOrCreate?: MapCreateOrConnectWithoutMapElementsInput
    connect?: MapWhereUniqueInput
  }

  export type ElementCreateNestedOneWithoutMapElementsInput = {
    create?: XOR<ElementCreateWithoutMapElementsInput, ElementUncheckedCreateWithoutMapElementsInput>
    connectOrCreate?: ElementCreateOrConnectWithoutMapElementsInput
    connect?: ElementWhereUniqueInput
  }

  export type MapUpdateOneRequiredWithoutMapElementsNestedInput = {
    create?: XOR<MapCreateWithoutMapElementsInput, MapUncheckedCreateWithoutMapElementsInput>
    connectOrCreate?: MapCreateOrConnectWithoutMapElementsInput
    upsert?: MapUpsertWithoutMapElementsInput
    connect?: MapWhereUniqueInput
    update?: XOR<XOR<MapUpdateToOneWithWhereWithoutMapElementsInput, MapUpdateWithoutMapElementsInput>, MapUncheckedUpdateWithoutMapElementsInput>
  }

  export type ElementUpdateOneRequiredWithoutMapElementsNestedInput = {
    create?: XOR<ElementCreateWithoutMapElementsInput, ElementUncheckedCreateWithoutMapElementsInput>
    connectOrCreate?: ElementCreateOrConnectWithoutMapElementsInput
    upsert?: ElementUpsertWithoutMapElementsInput
    connect?: ElementWhereUniqueInput
    update?: XOR<XOR<ElementUpdateToOneWithWhereWithoutMapElementsInput, ElementUpdateWithoutMapElementsInput>, ElementUncheckedUpdateWithoutMapElementsInput>
  }

  export type SpaceCreateNestedOneWithoutElementsInput = {
    create?: XOR<SpaceCreateWithoutElementsInput, SpaceUncheckedCreateWithoutElementsInput>
    connectOrCreate?: SpaceCreateOrConnectWithoutElementsInput
    connect?: SpaceWhereUniqueInput
  }

  export type ElementCreateNestedOneWithoutSpaceElementsInput = {
    create?: XOR<ElementCreateWithoutSpaceElementsInput, ElementUncheckedCreateWithoutSpaceElementsInput>
    connectOrCreate?: ElementCreateOrConnectWithoutSpaceElementsInput
    connect?: ElementWhereUniqueInput
  }

  export type SpaceUpdateOneRequiredWithoutElementsNestedInput = {
    create?: XOR<SpaceCreateWithoutElementsInput, SpaceUncheckedCreateWithoutElementsInput>
    connectOrCreate?: SpaceCreateOrConnectWithoutElementsInput
    upsert?: SpaceUpsertWithoutElementsInput
    connect?: SpaceWhereUniqueInput
    update?: XOR<XOR<SpaceUpdateToOneWithWhereWithoutElementsInput, SpaceUpdateWithoutElementsInput>, SpaceUncheckedUpdateWithoutElementsInput>
  }

  export type ElementUpdateOneRequiredWithoutSpaceElementsNestedInput = {
    create?: XOR<ElementCreateWithoutSpaceElementsInput, ElementUncheckedCreateWithoutSpaceElementsInput>
    connectOrCreate?: ElementCreateOrConnectWithoutSpaceElementsInput
    upsert?: ElementUpsertWithoutSpaceElementsInput
    connect?: ElementWhereUniqueInput
    update?: XOR<XOR<ElementUpdateToOneWithWhereWithoutSpaceElementsInput, ElementUpdateWithoutSpaceElementsInput>, ElementUncheckedUpdateWithoutSpaceElementsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutAvatarInput = {
    username: string
    password: string
    role?: $Enums.UserRole
    spaces?: SpaceCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutAvatarInput = {
    id?: number
    username: string
    password: string
    role?: $Enums.UserRole
    spaces?: SpaceUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutAvatarInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput>
  }

  export type UserCreateManyAvatarInputEnvelope = {
    data: UserCreateManyAvatarInput | UserCreateManyAvatarInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutAvatarInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutAvatarInput, UserUncheckedUpdateWithoutAvatarInput>
    create: XOR<UserCreateWithoutAvatarInput, UserUncheckedCreateWithoutAvatarInput>
  }

  export type UserUpdateWithWhereUniqueWithoutAvatarInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutAvatarInput, UserUncheckedUpdateWithoutAvatarInput>
  }

  export type UserUpdateManyWithWhereWithoutAvatarInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutAvatarInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    avatarId?: IntNullableFilter<"User"> | number | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
  }

  export type MapElementCreateWithoutElementInput = {
    x: number
    y: number
    map: MapCreateNestedOneWithoutMapElementsInput
  }

  export type MapElementUncheckedCreateWithoutElementInput = {
    id?: number
    mapId: number
    x: number
    y: number
  }

  export type MapElementCreateOrConnectWithoutElementInput = {
    where: MapElementWhereUniqueInput
    create: XOR<MapElementCreateWithoutElementInput, MapElementUncheckedCreateWithoutElementInput>
  }

  export type MapElementCreateManyElementInputEnvelope = {
    data: MapElementCreateManyElementInput | MapElementCreateManyElementInput[]
    skipDuplicates?: boolean
  }

  export type SpaceElementCreateWithoutElementInput = {
    x: number
    y: number
    space: SpaceCreateNestedOneWithoutElementsInput
  }

  export type SpaceElementUncheckedCreateWithoutElementInput = {
    id?: number
    spaceId: number
    x: number
    y: number
  }

  export type SpaceElementCreateOrConnectWithoutElementInput = {
    where: SpaceElementWhereUniqueInput
    create: XOR<SpaceElementCreateWithoutElementInput, SpaceElementUncheckedCreateWithoutElementInput>
  }

  export type SpaceElementCreateManyElementInputEnvelope = {
    data: SpaceElementCreateManyElementInput | SpaceElementCreateManyElementInput[]
    skipDuplicates?: boolean
  }

  export type MapElementUpsertWithWhereUniqueWithoutElementInput = {
    where: MapElementWhereUniqueInput
    update: XOR<MapElementUpdateWithoutElementInput, MapElementUncheckedUpdateWithoutElementInput>
    create: XOR<MapElementCreateWithoutElementInput, MapElementUncheckedCreateWithoutElementInput>
  }

  export type MapElementUpdateWithWhereUniqueWithoutElementInput = {
    where: MapElementWhereUniqueInput
    data: XOR<MapElementUpdateWithoutElementInput, MapElementUncheckedUpdateWithoutElementInput>
  }

  export type MapElementUpdateManyWithWhereWithoutElementInput = {
    where: MapElementScalarWhereInput
    data: XOR<MapElementUpdateManyMutationInput, MapElementUncheckedUpdateManyWithoutElementInput>
  }

  export type MapElementScalarWhereInput = {
    AND?: MapElementScalarWhereInput | MapElementScalarWhereInput[]
    OR?: MapElementScalarWhereInput[]
    NOT?: MapElementScalarWhereInput | MapElementScalarWhereInput[]
    id?: IntFilter<"MapElement"> | number
    mapId?: IntFilter<"MapElement"> | number
    elementId?: IntFilter<"MapElement"> | number
    x?: IntFilter<"MapElement"> | number
    y?: IntFilter<"MapElement"> | number
  }

  export type SpaceElementUpsertWithWhereUniqueWithoutElementInput = {
    where: SpaceElementWhereUniqueInput
    update: XOR<SpaceElementUpdateWithoutElementInput, SpaceElementUncheckedUpdateWithoutElementInput>
    create: XOR<SpaceElementCreateWithoutElementInput, SpaceElementUncheckedCreateWithoutElementInput>
  }

  export type SpaceElementUpdateWithWhereUniqueWithoutElementInput = {
    where: SpaceElementWhereUniqueInput
    data: XOR<SpaceElementUpdateWithoutElementInput, SpaceElementUncheckedUpdateWithoutElementInput>
  }

  export type SpaceElementUpdateManyWithWhereWithoutElementInput = {
    where: SpaceElementScalarWhereInput
    data: XOR<SpaceElementUpdateManyMutationInput, SpaceElementUncheckedUpdateManyWithoutElementInput>
  }

  export type SpaceElementScalarWhereInput = {
    AND?: SpaceElementScalarWhereInput | SpaceElementScalarWhereInput[]
    OR?: SpaceElementScalarWhereInput[]
    NOT?: SpaceElementScalarWhereInput | SpaceElementScalarWhereInput[]
    id?: IntFilter<"SpaceElement"> | number
    spaceId?: IntFilter<"SpaceElement"> | number
    elementId?: IntFilter<"SpaceElement"> | number
    x?: IntFilter<"SpaceElement"> | number
    y?: IntFilter<"SpaceElement"> | number
  }

  export type MapElementCreateWithoutMapInput = {
    x: number
    y: number
    element: ElementCreateNestedOneWithoutMapElementsInput
  }

  export type MapElementUncheckedCreateWithoutMapInput = {
    id?: number
    elementId: number
    x: number
    y: number
  }

  export type MapElementCreateOrConnectWithoutMapInput = {
    where: MapElementWhereUniqueInput
    create: XOR<MapElementCreateWithoutMapInput, MapElementUncheckedCreateWithoutMapInput>
  }

  export type MapElementCreateManyMapInputEnvelope = {
    data: MapElementCreateManyMapInput | MapElementCreateManyMapInput[]
    skipDuplicates?: boolean
  }

  export type MapElementUpsertWithWhereUniqueWithoutMapInput = {
    where: MapElementWhereUniqueInput
    update: XOR<MapElementUpdateWithoutMapInput, MapElementUncheckedUpdateWithoutMapInput>
    create: XOR<MapElementCreateWithoutMapInput, MapElementUncheckedCreateWithoutMapInput>
  }

  export type MapElementUpdateWithWhereUniqueWithoutMapInput = {
    where: MapElementWhereUniqueInput
    data: XOR<MapElementUpdateWithoutMapInput, MapElementUncheckedUpdateWithoutMapInput>
  }

  export type MapElementUpdateManyWithWhereWithoutMapInput = {
    where: MapElementScalarWhereInput
    data: XOR<MapElementUpdateManyMutationInput, MapElementUncheckedUpdateManyWithoutMapInput>
  }

  export type AvatarCreateWithoutUsersInput = {
    imageUrl: string
    name: string
  }

  export type AvatarUncheckedCreateWithoutUsersInput = {
    id?: number
    imageUrl: string
    name: string
  }

  export type AvatarCreateOrConnectWithoutUsersInput = {
    where: AvatarWhereUniqueInput
    create: XOR<AvatarCreateWithoutUsersInput, AvatarUncheckedCreateWithoutUsersInput>
  }

  export type SpaceCreateWithoutOwnerInput = {
    name: string
    width: number
    height: number
    thumbnail?: string | null
    elements?: SpaceElementCreateNestedManyWithoutSpaceInput
  }

  export type SpaceUncheckedCreateWithoutOwnerInput = {
    id?: number
    name: string
    width: number
    height: number
    thumbnail?: string | null
    elements?: SpaceElementUncheckedCreateNestedManyWithoutSpaceInput
  }

  export type SpaceCreateOrConnectWithoutOwnerInput = {
    where: SpaceWhereUniqueInput
    create: XOR<SpaceCreateWithoutOwnerInput, SpaceUncheckedCreateWithoutOwnerInput>
  }

  export type SpaceCreateManyOwnerInputEnvelope = {
    data: SpaceCreateManyOwnerInput | SpaceCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type AvatarUpsertWithoutUsersInput = {
    update: XOR<AvatarUpdateWithoutUsersInput, AvatarUncheckedUpdateWithoutUsersInput>
    create: XOR<AvatarCreateWithoutUsersInput, AvatarUncheckedCreateWithoutUsersInput>
    where?: AvatarWhereInput
  }

  export type AvatarUpdateToOneWithWhereWithoutUsersInput = {
    where?: AvatarWhereInput
    data: XOR<AvatarUpdateWithoutUsersInput, AvatarUncheckedUpdateWithoutUsersInput>
  }

  export type AvatarUpdateWithoutUsersInput = {
    imageUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AvatarUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SpaceUpsertWithWhereUniqueWithoutOwnerInput = {
    where: SpaceWhereUniqueInput
    update: XOR<SpaceUpdateWithoutOwnerInput, SpaceUncheckedUpdateWithoutOwnerInput>
    create: XOR<SpaceCreateWithoutOwnerInput, SpaceUncheckedCreateWithoutOwnerInput>
  }

  export type SpaceUpdateWithWhereUniqueWithoutOwnerInput = {
    where: SpaceWhereUniqueInput
    data: XOR<SpaceUpdateWithoutOwnerInput, SpaceUncheckedUpdateWithoutOwnerInput>
  }

  export type SpaceUpdateManyWithWhereWithoutOwnerInput = {
    where: SpaceScalarWhereInput
    data: XOR<SpaceUpdateManyMutationInput, SpaceUncheckedUpdateManyWithoutOwnerInput>
  }

  export type SpaceScalarWhereInput = {
    AND?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
    OR?: SpaceScalarWhereInput[]
    NOT?: SpaceScalarWhereInput | SpaceScalarWhereInput[]
    id?: IntFilter<"Space"> | number
    name?: StringFilter<"Space"> | string
    width?: IntFilter<"Space"> | number
    height?: IntFilter<"Space"> | number
    thumbnail?: StringNullableFilter<"Space"> | string | null
    ownerId?: IntFilter<"Space"> | number
  }

  export type UserCreateWithoutSpacesInput = {
    username: string
    password: string
    role?: $Enums.UserRole
    avatar?: AvatarCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutSpacesInput = {
    id?: number
    username: string
    password: string
    avatarId?: number | null
    role?: $Enums.UserRole
  }

  export type UserCreateOrConnectWithoutSpacesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSpacesInput, UserUncheckedCreateWithoutSpacesInput>
  }

  export type SpaceElementCreateWithoutSpaceInput = {
    x: number
    y: number
    element: ElementCreateNestedOneWithoutSpaceElementsInput
  }

  export type SpaceElementUncheckedCreateWithoutSpaceInput = {
    id?: number
    elementId: number
    x: number
    y: number
  }

  export type SpaceElementCreateOrConnectWithoutSpaceInput = {
    where: SpaceElementWhereUniqueInput
    create: XOR<SpaceElementCreateWithoutSpaceInput, SpaceElementUncheckedCreateWithoutSpaceInput>
  }

  export type SpaceElementCreateManySpaceInputEnvelope = {
    data: SpaceElementCreateManySpaceInput | SpaceElementCreateManySpaceInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSpacesInput = {
    update: XOR<UserUpdateWithoutSpacesInput, UserUncheckedUpdateWithoutSpacesInput>
    create: XOR<UserCreateWithoutSpacesInput, UserUncheckedCreateWithoutSpacesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSpacesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSpacesInput, UserUncheckedUpdateWithoutSpacesInput>
  }

  export type UserUpdateWithoutSpacesInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    avatar?: AvatarUpdateOneWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutSpacesInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    avatarId?: NullableIntFieldUpdateOperationsInput | number | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type SpaceElementUpsertWithWhereUniqueWithoutSpaceInput = {
    where: SpaceElementWhereUniqueInput
    update: XOR<SpaceElementUpdateWithoutSpaceInput, SpaceElementUncheckedUpdateWithoutSpaceInput>
    create: XOR<SpaceElementCreateWithoutSpaceInput, SpaceElementUncheckedCreateWithoutSpaceInput>
  }

  export type SpaceElementUpdateWithWhereUniqueWithoutSpaceInput = {
    where: SpaceElementWhereUniqueInput
    data: XOR<SpaceElementUpdateWithoutSpaceInput, SpaceElementUncheckedUpdateWithoutSpaceInput>
  }

  export type SpaceElementUpdateManyWithWhereWithoutSpaceInput = {
    where: SpaceElementScalarWhereInput
    data: XOR<SpaceElementUpdateManyMutationInput, SpaceElementUncheckedUpdateManyWithoutSpaceInput>
  }

  export type MapCreateWithoutMapElementsInput = {
    name: string
    width: number
    height: number
  }

  export type MapUncheckedCreateWithoutMapElementsInput = {
    id?: number
    name: string
    width: number
    height: number
  }

  export type MapCreateOrConnectWithoutMapElementsInput = {
    where: MapWhereUniqueInput
    create: XOR<MapCreateWithoutMapElementsInput, MapUncheckedCreateWithoutMapElementsInput>
  }

  export type ElementCreateWithoutMapElementsInput = {
    width: number
    height: number
    imageUrl: string
    isStatic?: boolean
    spaceElements?: SpaceElementCreateNestedManyWithoutElementInput
  }

  export type ElementUncheckedCreateWithoutMapElementsInput = {
    id?: number
    width: number
    height: number
    imageUrl: string
    isStatic?: boolean
    spaceElements?: SpaceElementUncheckedCreateNestedManyWithoutElementInput
  }

  export type ElementCreateOrConnectWithoutMapElementsInput = {
    where: ElementWhereUniqueInput
    create: XOR<ElementCreateWithoutMapElementsInput, ElementUncheckedCreateWithoutMapElementsInput>
  }

  export type MapUpsertWithoutMapElementsInput = {
    update: XOR<MapUpdateWithoutMapElementsInput, MapUncheckedUpdateWithoutMapElementsInput>
    create: XOR<MapCreateWithoutMapElementsInput, MapUncheckedCreateWithoutMapElementsInput>
    where?: MapWhereInput
  }

  export type MapUpdateToOneWithWhereWithoutMapElementsInput = {
    where?: MapWhereInput
    data: XOR<MapUpdateWithoutMapElementsInput, MapUncheckedUpdateWithoutMapElementsInput>
  }

  export type MapUpdateWithoutMapElementsInput = {
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
  }

  export type MapUncheckedUpdateWithoutMapElementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
  }

  export type ElementUpsertWithoutMapElementsInput = {
    update: XOR<ElementUpdateWithoutMapElementsInput, ElementUncheckedUpdateWithoutMapElementsInput>
    create: XOR<ElementCreateWithoutMapElementsInput, ElementUncheckedCreateWithoutMapElementsInput>
    where?: ElementWhereInput
  }

  export type ElementUpdateToOneWithWhereWithoutMapElementsInput = {
    where?: ElementWhereInput
    data: XOR<ElementUpdateWithoutMapElementsInput, ElementUncheckedUpdateWithoutMapElementsInput>
  }

  export type ElementUpdateWithoutMapElementsInput = {
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isStatic?: BoolFieldUpdateOperationsInput | boolean
    spaceElements?: SpaceElementUpdateManyWithoutElementNestedInput
  }

  export type ElementUncheckedUpdateWithoutMapElementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isStatic?: BoolFieldUpdateOperationsInput | boolean
    spaceElements?: SpaceElementUncheckedUpdateManyWithoutElementNestedInput
  }

  export type SpaceCreateWithoutElementsInput = {
    name: string
    width: number
    height: number
    thumbnail?: string | null
    owner: UserCreateNestedOneWithoutSpacesInput
  }

  export type SpaceUncheckedCreateWithoutElementsInput = {
    id?: number
    name: string
    width: number
    height: number
    thumbnail?: string | null
    ownerId: number
  }

  export type SpaceCreateOrConnectWithoutElementsInput = {
    where: SpaceWhereUniqueInput
    create: XOR<SpaceCreateWithoutElementsInput, SpaceUncheckedCreateWithoutElementsInput>
  }

  export type ElementCreateWithoutSpaceElementsInput = {
    width: number
    height: number
    imageUrl: string
    isStatic?: boolean
    mapElements?: MapElementCreateNestedManyWithoutElementInput
  }

  export type ElementUncheckedCreateWithoutSpaceElementsInput = {
    id?: number
    width: number
    height: number
    imageUrl: string
    isStatic?: boolean
    mapElements?: MapElementUncheckedCreateNestedManyWithoutElementInput
  }

  export type ElementCreateOrConnectWithoutSpaceElementsInput = {
    where: ElementWhereUniqueInput
    create: XOR<ElementCreateWithoutSpaceElementsInput, ElementUncheckedCreateWithoutSpaceElementsInput>
  }

  export type SpaceUpsertWithoutElementsInput = {
    update: XOR<SpaceUpdateWithoutElementsInput, SpaceUncheckedUpdateWithoutElementsInput>
    create: XOR<SpaceCreateWithoutElementsInput, SpaceUncheckedCreateWithoutElementsInput>
    where?: SpaceWhereInput
  }

  export type SpaceUpdateToOneWithWhereWithoutElementsInput = {
    where?: SpaceWhereInput
    data: XOR<SpaceUpdateWithoutElementsInput, SpaceUncheckedUpdateWithoutElementsInput>
  }

  export type SpaceUpdateWithoutElementsInput = {
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: UserUpdateOneRequiredWithoutSpacesNestedInput
  }

  export type SpaceUncheckedUpdateWithoutElementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: IntFieldUpdateOperationsInput | number
  }

  export type ElementUpsertWithoutSpaceElementsInput = {
    update: XOR<ElementUpdateWithoutSpaceElementsInput, ElementUncheckedUpdateWithoutSpaceElementsInput>
    create: XOR<ElementCreateWithoutSpaceElementsInput, ElementUncheckedCreateWithoutSpaceElementsInput>
    where?: ElementWhereInput
  }

  export type ElementUpdateToOneWithWhereWithoutSpaceElementsInput = {
    where?: ElementWhereInput
    data: XOR<ElementUpdateWithoutSpaceElementsInput, ElementUncheckedUpdateWithoutSpaceElementsInput>
  }

  export type ElementUpdateWithoutSpaceElementsInput = {
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isStatic?: BoolFieldUpdateOperationsInput | boolean
    mapElements?: MapElementUpdateManyWithoutElementNestedInput
  }

  export type ElementUncheckedUpdateWithoutSpaceElementsInput = {
    id?: IntFieldUpdateOperationsInput | number
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    imageUrl?: StringFieldUpdateOperationsInput | string
    isStatic?: BoolFieldUpdateOperationsInput | boolean
    mapElements?: MapElementUncheckedUpdateManyWithoutElementNestedInput
  }

  export type UserCreateManyAvatarInput = {
    id?: number
    username: string
    password: string
    role?: $Enums.UserRole
  }

  export type UserUpdateWithoutAvatarInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    spaces?: SpaceUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutAvatarInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    spaces?: SpaceUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateManyWithoutAvatarInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type MapElementCreateManyElementInput = {
    id?: number
    mapId: number
    x: number
    y: number
  }

  export type SpaceElementCreateManyElementInput = {
    id?: number
    spaceId: number
    x: number
    y: number
  }

  export type MapElementUpdateWithoutElementInput = {
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    map?: MapUpdateOneRequiredWithoutMapElementsNestedInput
  }

  export type MapElementUncheckedUpdateWithoutElementInput = {
    id?: IntFieldUpdateOperationsInput | number
    mapId?: IntFieldUpdateOperationsInput | number
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type MapElementUncheckedUpdateManyWithoutElementInput = {
    id?: IntFieldUpdateOperationsInput | number
    mapId?: IntFieldUpdateOperationsInput | number
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type SpaceElementUpdateWithoutElementInput = {
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    space?: SpaceUpdateOneRequiredWithoutElementsNestedInput
  }

  export type SpaceElementUncheckedUpdateWithoutElementInput = {
    id?: IntFieldUpdateOperationsInput | number
    spaceId?: IntFieldUpdateOperationsInput | number
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type SpaceElementUncheckedUpdateManyWithoutElementInput = {
    id?: IntFieldUpdateOperationsInput | number
    spaceId?: IntFieldUpdateOperationsInput | number
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type MapElementCreateManyMapInput = {
    id?: number
    elementId: number
    x: number
    y: number
  }

  export type MapElementUpdateWithoutMapInput = {
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    element?: ElementUpdateOneRequiredWithoutMapElementsNestedInput
  }

  export type MapElementUncheckedUpdateWithoutMapInput = {
    id?: IntFieldUpdateOperationsInput | number
    elementId?: IntFieldUpdateOperationsInput | number
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type MapElementUncheckedUpdateManyWithoutMapInput = {
    id?: IntFieldUpdateOperationsInput | number
    elementId?: IntFieldUpdateOperationsInput | number
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type SpaceCreateManyOwnerInput = {
    id?: number
    name: string
    width: number
    height: number
    thumbnail?: string | null
  }

  export type SpaceUpdateWithoutOwnerInput = {
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    elements?: SpaceElementUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    elements?: SpaceElementUncheckedUpdateManyWithoutSpaceNestedInput
  }

  export type SpaceUncheckedUpdateManyWithoutOwnerInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SpaceElementCreateManySpaceInput = {
    id?: number
    elementId: number
    x: number
    y: number
  }

  export type SpaceElementUpdateWithoutSpaceInput = {
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
    element?: ElementUpdateOneRequiredWithoutSpaceElementsNestedInput
  }

  export type SpaceElementUncheckedUpdateWithoutSpaceInput = {
    id?: IntFieldUpdateOperationsInput | number
    elementId?: IntFieldUpdateOperationsInput | number
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }

  export type SpaceElementUncheckedUpdateManyWithoutSpaceInput = {
    id?: IntFieldUpdateOperationsInput | number
    elementId?: IntFieldUpdateOperationsInput | number
    x?: IntFieldUpdateOperationsInput | number
    y?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}