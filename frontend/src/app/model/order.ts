import { Room } from "./room";
import { User } from "./user";
import { Unit } from "./unit";

export class Order {

    orderId?: number;
    room?: Room;
    user?: User;
    pageNumber?: number;
    dateStart?: string;
    dateEnd?: string;
    typeRoom?: Unit;
    bedNumber?: string;
    personNumber?: string;
    totalAmount?: number;

}