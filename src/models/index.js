// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TradicionEnum = {
  "ISESE": "ISESE",
  "AFROCUBANA": "AFROCUBANA"
};

const IniciacionEnum = {
  "OLORISA": "OLORISA",
  "IFA": "IFA"
};

const { ContenidoClases, Clases, ModulosCursos, Cursos, User } = initSchema(schema);

export {
  ContenidoClases,
  Clases,
  ModulosCursos,
  Cursos,
  User,
  TradicionEnum,
  IniciacionEnum
};