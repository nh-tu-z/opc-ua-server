import { 
    AddressSpace,
    UAObjectType
} from 'node-opcua'

export const createTagAddressSpace = async (addressSpace: AddressSpace, db: any): Promise<void> => {
    const namespace = addressSpace?.getOwnNamespace()
    const diIdx = addressSpace?.getNamespaceIndex('http://opcfoundation.org/UA/DI/')

    //const softwareType = addressSpace?.findNode(`ns=${diIdx};i=15106`) as UAObjectType

    console.log('ROOT FOLDER', addressSpace.rootFolder.objects)
    const dev = namespace.addObject({
        browseName: 'DEV',
        organizedBy: addressSpace.rootFolder.objects,
        eventSourceOf: addressSpace.rootFolder.objects.server
    })
}