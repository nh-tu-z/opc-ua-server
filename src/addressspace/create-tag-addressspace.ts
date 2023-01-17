import { 
    AddressSpace,
    UAObjectType,
    Variant,
    DataType
} from 'node-opcua';
import { UAVariableModel } from '../db/schema/opc-schema';

export const createTagAddressSpace = async (addressSpace: AddressSpace): Promise<void> => {
    const namespace = addressSpace?.getOwnNamespace();
    const diIdx = addressSpace?.getNamespaceIndex('http://opcfoundation.org/UA/DI/');

    const dev = namespace.addObject({
        browseName: 'DEV',
        organizedBy: addressSpace.rootFolder.objects,
        eventSourceOf: addressSpace.rootFolder.objects.server
    });

    const uavariables = await UAVariableModel.find({});
    //console.log('tuhngo', uavariables);
    uavariables.forEach((uav) => {
        namespace.addVariable({
            componentOf: dev,
            browseName: uav.browseName as string,
            dataType: "Double",
            value: {
                timestamped_get: async function () {
                    let dataoutput;
                    UAVariableModel.find({}, null, function (err, uavariables) {
                        dataoutput = uavariables
                        //console.log('inside data', uavariables)
                        return new Variant({dataType: DataType.Double, value: 1 });
                    })
                    //console.log(dataoutput)
                    return new Variant({dataType: DataType.Double, value: 1 })
                }
            }
        })
    });
}