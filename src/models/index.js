// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, PaymentIntent } = initSchema(schema);

export {
  User,
  PaymentIntent
};