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

const { MessagesClase, ChatRoomClases, ContenidoClases, Clases, ModulosCursos, Cursos, User, ChatRoomClasesUser } = initSchema(schema);

export {
  MessagesClase,
  ChatRoomClases,
  ContenidoClases,
  Clases,
  ModulosCursos,
  Cursos,
  User,
  ChatRoomClasesUser,
  TradicionEnum,
  IniciacionEnum
};