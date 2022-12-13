import {
    OPCUAServer,
    ServerState,
    coerceLocalizedText,
    OPCUAServerEndPoint
  } from 'node-opcua';
  
  import { green, yellow, red, greenBright } from './utils/log';
  import { serverOptions } from './config/server-config';
  //import { createAddressSpace } from './addressspace';
  
  const server = new OPCUAServer(serverOptions)
    .on('serverRegistered', () => {
      green(' serverRegistered! ');
    })
    .on('serverUnregistered', () => {
      red(' serverUnregistered! ');
    })
    .on('serverRegistrationRenewed', () => {
      green(' serverRegistrationRenewed! ');
    })
    .on('serverRegistrationPending', () => {
      yellow(' serverRegistrationPending! ');
    })
    .on('connectionRefused', (socketData: any, endpoint: OPCUAServerEndPoint) => {
      red(' connectionRefused!');
    })
    .on('openSecureChannelFailure', (socketData: any, channelData: any, endpoint: OPCUAServerEndPoint) => {
      red(' openSecureChannelFailure!');
    });
  
  const shutDown = (): void => {
    if (server.engine.serverStatus.state === ServerState.Shutdown) {
      yellow(` Server shutdown already requested... shutdown will happen in ${server.engine.serverStatus.secondsTillShutdown} second`);
      return;
    }
    yellow('Received server interruption from user ');
    yellow('shutting down ...');
    const reason = coerceLocalizedText('Shutdown by administrator');
    reason ? server.engine.serverStatus.shutdownReason = reason : null;
    server.shutdown(10000, () => {
      yellow(' shutting down completed ');
      yellow(' done ');
      process.exit(0);
    });
  };
  
  const startUp = async (server: OPCUAServer): Promise<void> => {
    await server.start();
    green(' server started and ready on: ');
    green(` |--> ${server.getEndpointUrl()} `);
    //green(` AlternateHostnames: ${config.alternateHostname} `);
    green(' CTRL+C to stop ');
    process.on('SIGINT', shutDown);
    process.on('SIGTERM', shutDown);
  };
  
  (async () => {
    try {
      greenBright(' starting server... ');
      await server.initialize();
      //await createAddressSpace(server);
      server.engine.addressSpace?.installAlarmsAndConditionsService();
      await startUp(server);
    } catch (error) {
      red(` error: ${error}`);
      process.exit(-1);
    }
  })();
  