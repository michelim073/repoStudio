import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum TradicionEnum {
  ISESE = "ISESE",
  AFROCUBANA = "AFROCUBANA"
}

export enum IniciacionEnum {
  OLORISA = "OLORISA",
  IFA = "IFA"
}



type EagerContenidoClases = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContenidoClases, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text?: string | null;
  readonly image?: string | null;
  readonly audio?: string | null;
  readonly video?: string | null;
  readonly youtube?: string | null;
  readonly clasesID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyContenidoClases = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ContenidoClases, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly text?: string | null;
  readonly image?: string | null;
  readonly audio?: string | null;
  readonly video?: string | null;
  readonly youtube?: string | null;
  readonly clasesID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ContenidoClases = LazyLoading extends LazyLoadingDisabled ? EagerContenidoClases : LazyContenidoClases

export declare const ContenidoClases: (new (init: ModelInit<ContenidoClases>) => ContenidoClases) & {
  copyOf(source: ContenidoClases, mutator: (draft: MutableModel<ContenidoClases>) => MutableModel<ContenidoClases> | void): ContenidoClases;
}

type EagerClases = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Clases, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly index?: number | null;
  readonly titulo?: string | null;
  readonly status?: string | null;
  readonly fechaPublicacion?: string | null;
  readonly ContenidoClases?: (ContenidoClases | null)[] | null;
  readonly moduloscursosID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyClases = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Clases, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly index?: number | null;
  readonly titulo?: string | null;
  readonly status?: string | null;
  readonly fechaPublicacion?: string | null;
  readonly ContenidoClases: AsyncCollection<ContenidoClases>;
  readonly moduloscursosID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Clases = LazyLoading extends LazyLoadingDisabled ? EagerClases : LazyClases

export declare const Clases: (new (init: ModelInit<Clases>) => Clases) & {
  copyOf(source: Clases, mutator: (draft: MutableModel<Clases>) => MutableModel<Clases> | void): Clases;
}

type EagerModulosCursos = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ModulosCursos, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly index?: number | null;
  readonly nombre?: string | null;
  readonly descripcion?: string | null;
  readonly costoModulo?: number | null;
  readonly cursosID: string;
  readonly Clases?: (Clases | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyModulosCursos = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ModulosCursos, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly index?: number | null;
  readonly nombre?: string | null;
  readonly descripcion?: string | null;
  readonly costoModulo?: number | null;
  readonly cursosID: string;
  readonly Clases: AsyncCollection<Clases>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ModulosCursos = LazyLoading extends LazyLoadingDisabled ? EagerModulosCursos : LazyModulosCursos

export declare const ModulosCursos: (new (init: ModelInit<ModulosCursos>) => ModulosCursos) & {
  copyOf(source: ModulosCursos, mutator: (draft: MutableModel<ModulosCursos>) => MutableModel<ModulosCursos> | void): ModulosCursos;
}

type EagerCursos = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Cursos, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly index?: number | null;
  readonly nombre?: string | null;
  readonly descripcion?: string | null;
  readonly imageCover?: string | null;
  readonly categoria?: string | null;
  readonly tradicion?: TradicionEnum | keyof typeof TradicionEnum | null;
  readonly ModulosCurso?: (ModulosCursos | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCursos = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Cursos, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly index?: number | null;
  readonly nombre?: string | null;
  readonly descripcion?: string | null;
  readonly imageCover?: string | null;
  readonly categoria?: string | null;
  readonly tradicion?: TradicionEnum | keyof typeof TradicionEnum | null;
  readonly ModulosCurso: AsyncCollection<ModulosCursos>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Cursos = LazyLoading extends LazyLoadingDisabled ? EagerCursos : LazyCursos

export declare const Cursos: (new (init: ModelInit<Cursos>) => Cursos) & {
  copyOf(source: Cursos, mutator: (draft: MutableModel<Cursos>) => MutableModel<Cursos> | void): Cursos;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly roleUser?: string | null;
  readonly imageUser?: string | null;
  readonly iniciacion?: IniciacionEnum | keyof typeof IniciacionEnum | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly roleUser?: string | null;
  readonly imageUser?: string | null;
  readonly iniciacion?: IniciacionEnum | keyof typeof IniciacionEnum | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}