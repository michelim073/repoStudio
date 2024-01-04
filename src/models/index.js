// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TypeSuscripcion = {
  "PAGO": "PAGO",
  "INVITADO": "INVITADO",
  "PENDIENTE": "PENDIENTE"
};

const TradicionEnum = {
  "ISESE": "ISESE",
  "AFROCUBANA": "AFROCUBANA"
};

const IniciacionEnum = {
  "OLORISA": "OLORISA",
  "IFA": "IFA"
};

const { Suscripciones, MessagesClase, ChatRoomClases, ContenidoClases, Clases, ModulosCursos, Cursos, User, ChatRoomClasesUser } = initSchema(schema);

export {
  Suscripciones,
  MessagesClase,
  ChatRoomClases,
  ContenidoClases,
  Clases,
  ModulosCursos,
  Cursos,
  User,
  ChatRoomClasesUser,
  TypeSuscripcion,
  TradicionEnum,
  IniciacionEnum
};