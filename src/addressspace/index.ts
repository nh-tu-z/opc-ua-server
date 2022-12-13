import {
    OPCUAServer
} from 'node-opcua';

import { green } from '../utils/log';

  export const createAddressSpace = async (server: OPCUAServer): Promise<void> => {
    const addressSpace = server.engine.addressSpace;
    // addressSpace
    //   ? await Promise.all([
    //     createOwnServerAddressspaceLogic(addressSpace),
    //     createMyMachineLogic(addressSpace),
    //     createShowCaseMachineToolLogic(addressSpace),
    //     createSampleImmLogic(addressSpace)
    //   ])
    //     .then(() => {
    //       green(' creating addressspace done! ');
    //     })
    //     .catch((error) => {
    //       throw new Error(` creating addressspace failed: ${error} `);
    //     })
    //   : () => {
    //       throw new Error(' addressSpace not found! the server has no \'addressSpace\' ');
    //     };
  };