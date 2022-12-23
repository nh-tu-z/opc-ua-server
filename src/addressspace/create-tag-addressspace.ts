import { 
    AddressSpace,
    UAObjectType,
    Variant,
    DataType,
    randomGuid
} from 'node-opcua';
import { UAVariable } from '../db/schema/opc-schema';

export const createTagAddressSpace = async (addressSpace: AddressSpace): Promise<void> => {
    const namespace = addressSpace?.getOwnNamespace();
    const diIdx = addressSpace?.getNamespaceIndex('http://opcfoundation.org/UA/DI/');

    const dev = namespace.addObject({
        browseName: 'DEV',
        organizedBy: addressSpace.rootFolder.objects,
        eventSourceOf: addressSpace.rootFolder.objects.server
    });

    const uavariables = await UAVariable.find({});
    console.log('tuhngo', uavariables);
    uavariables.forEach((uav) => {
        namespace.addVariable({
            componentOf: dev,
            browseName: uav.browseName as string,
            dataType: "Double",
            value: {
                get: function () {
                    return new Variant({dataType: DataType.Double, value: randomGuid() });
                }
            }
        })
    });
}