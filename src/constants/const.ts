const ProductName = 'MockOPCUA';

const BuildNumber = 'xxxx';

export {
    ProductName,
    BuildNumber
};

export const schemaName = {
    uaVariable: 'UAVariable',
    tag: 'Tag',
    rawData: 'RawData',
    group: 'Group',
    device: 'Device'
};

export enum mqttProtocols {
    mqtt = 'mqtt',
    mqtts = 'mqtts',
    ws = 'ws',
    wss = 'wss',
};