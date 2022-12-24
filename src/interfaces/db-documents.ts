import { ObjectId, Date } from 'mongoose';

interface IGroup {
    GroupId : ObjectId,
    GroupName : String,
    Description : String,
    State : Number,
    CreatedAt: Date,
    UpdatedAt : Date
}

interface IDevice {
    DeviceId : ObjectId,
    GroupId : ObjectId,
    DeviceName : String,
    Description : String,
    State : Number,
    CreatedAt: Date,
    UpdatedAt : Date
}

interface IDeviceStatus {
    DeviceId : ObjectId,
    Status : Number,
    CreatedAt : Date,
    UpdatedAt : Date
}

export interface ITag {
    deviceId : ObjectId,
    tagName : String,
    dataType : String,
    scale : String,
    description : String,
    createdAt : Date,
    updatedAt : Date,
    rW : Number
}

export interface IRawData {
    deviceId : ObjectId,
    tagId : ObjectId,
    tagName : String,
    value : String,
    unixTimeStamp : Number,
    timeStamp : Date,
    createdAt : Date
}

interface IUAObject {
    UAObjectId : ObjectId,
    BrowseName : String,
    DataType : String,
}

export interface IUAVariable {
    browseName : String,
    componentOf : Number,
    description : String,
    dataType : Number
}