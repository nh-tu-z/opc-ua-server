import { OPCUAServerOptions } from 'node-opcua';
import { ProductName, BuildNumber } from '../constants/const';

// entry point - https://node-opcua.github.io/api_doc/2.32.0/interfaces/node_opcua.opcuaserveroptions.html#allowanonymous 
let serverOptions = {
    // tells if the server default endpoints should allow anonymous connection.
    allowAnonymous: true, // default

    // the TCP port to listen to
    port: 4334, 

    // resource Path is a string added at the end of the url such as "/UA/Server"
    resourcePath: "/UA/MyLittleServer",

    // 
    buildInfo : {
        productName: ProductName,
        buildNumber: BuildNumber,
        buildDate: new Date(2014,5,2)
    }

    // the server certificate full path filename. The certificate should be in PEM format
    // certificateFile: string

    // the default secure token life time in ms
    // defaultSecureTokenLifetime: number

    // the maximum number of simultaneous sessions allowed
    // maxAllowedSessionNumber: number

    // the maximum number authorized simultaneous connections per endpoint
    // maxConnectionsPerEndpoint: number

    // this certificate manager will be used by the server to access and store certificates from the connecting clients
    // serverCertificateManager: OPCUACertificateManager
}

export { serverOptions };