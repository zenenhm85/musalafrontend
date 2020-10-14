import {Gateway} from '../models/gateway';

export interface GetGateways {
    total: number;
    gateways:Gateway[] 
}
