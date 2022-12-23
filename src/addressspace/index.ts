import {
    OPCUAServer
} from 'node-opcua';

import { green } from '../utils/log';
import { createTagAddressSpace } from './create-tag-addressspace';

export const createAddressSpace = async (server: OPCUAServer, db: any): Promise<void> => {
  const addressSpace = server.engine.addressSpace;
  addressSpace
    ? await Promise.all([createTagAddressSpace(addressSpace, db)])
      .then(() => {
        green(' creating addressspace done! ', `[AddressSpace]`);
      })
      .catch((error) => {
        throw new Error(` creating addressspace failed: ${error} `);
      })
    : () => {
        throw new Error(' addressSpace not found! the server has no \'addressSpace\' ');
      };
};