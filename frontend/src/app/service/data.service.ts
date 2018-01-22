import { Injectable, OnInit } from "@angular/core";

@Injectable()
export class DataService {

    /*
           fetch new date
     */
    fetchDate(): string {
        let result: string;
        let dateNow = new Date();
        let dateNumber = dateNow.getDate() > 9 ? dateNow.getDate() : '0' + dateNow.getDate();
        let year = dateNow.getFullYear();
        let month = dateNow.getMonth() + 1;
        let newMonth = (month < 10) ? '0' + month : month;
        result = year + '-' + newMonth + '-' + dateNumber;
        return result;
    }

    getSequenceNumber(lastNumber: number): number[] {
        let sequenceNumber: number[] = [];
        for (let i: number = 0; i < lastNumber; i++) {
            sequenceNumber[i] = i + 1;
        }
        return sequenceNumber;
    }




}