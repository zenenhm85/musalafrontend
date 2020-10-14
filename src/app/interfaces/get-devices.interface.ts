import {Device} from '../models/device';

export interface GetDevices{
    total: number;
    devices:Device[];
}
