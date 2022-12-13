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

interface ITag {
    DeviceId : ObjectId,
    TagName : String,
    DataType : String,
    Scale : String,
    Description : String,
    CreatedAt : Date,
    UpdatedAt : Date,
    RW : Number
}

interface IRawData {
    DeviceId : ObjectId,
    TagId : ObjectId,
    TagName : String,
    Value : String,
    UnixTimeStamp : Number,
    TimeStamp : Date,
    CreatedAt : Date
}