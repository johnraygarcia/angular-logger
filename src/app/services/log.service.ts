import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Log } from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text:null, date:null});
  selectedLog = this.logSource.asObservable();

  private clearStateSource = new BehaviorSubject<boolean>(false);
  stateClear = this.clearStateSource.asObservable();

  constructor() {

    this.logs = [
      {
        id: "1",
        text: "Generated components",
        date: new Date('12/12/2017 12:54:12')
      },
      {
        id: "2",
        text: "Generated Service",
        date: new Date('12/12/2017 10:54:12')
      },
      {
        id: "3",
        text: "Added bootstrap",
        date: new Date('12/12/2017 13:54:12')
      }
    ];
  }

  getLogs(): Observable<Log[]> {
    if(localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a,b) => {
      return b.date = a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    this.persistLocalStorage();
  }

  updateLog(log: Log) {
    //this.logs.unshift(log);
    for(let i = 0; i<this.logs.length;i++) {
      if(log.id == this.logs[i].id) {
        this.logs[i].text = log.text;
      }
    }

    this.persistLocalStorage();
  }

  removeLog(log: Log) {
    console.log();
    for(let i = 0; i<this.logs.length;i++) {
      if(log.id == this.logs[i].id) {
        this.logs.splice(i, 1);
      }
    }

    this.persistLocalStorage();
  }

  clearState() {
    this.clearStateSource.next(true);
  }

  persistLocalStorage() {
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
}
