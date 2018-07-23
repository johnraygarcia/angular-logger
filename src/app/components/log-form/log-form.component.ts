import { Component, OnInit } from '@angular/core';

import { LogService } from '../../services/log.service';
import { Log } from '../../models/Log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  selectedLog: Log;
  constructor(private logService : LogService) { }
  isNew: boolean;
  ngOnInit() {
    // subscribe to the selected log observable
    this.logService.selectedLog.subscribe(log => {
      if(log.id) {
        this.selectedLog = log;
        this.isNew = false;
      } else {
        this.isNew = true;
        this.selectedLog = {
          id: null,
          text: null,
          date: null
        }
      }
    })
  }

  clearLog() {
    this.selectedLog = {
      id: null,
      text: null,
      date: null
    }
    this.isNew = true;

    this.logService.clearState();
  }

  onSubmit() {

    console.log(this.selectedLog.text + ", isNew:" + this.isNew);
    if(!this.selectedLog.text) return;

    this.selectedLog.date = new Date();
    
    if(this.isNew) {
      const newLog = {
        id: this.generateGuid(),
        text: this.selectedLog.text,
        date: new Date()
      }
      this.logService.addLog(newLog);
      this.clearLog();
    } else {
      this.logService.updateLog(this.selectedLog);
      
      this.clearLog();
    }
  }

  generateGuid() {
    var result, i, j;
    result = '';
    for(j=0; j<32; j++) {
      if( j == 8 || j == 12|| j == 16|| j == 20) 
        result = result + '-';
      i = Math.floor(Math.random()*16).toString(16).toUpperCase();
      result = result + i;
    }
    return result;
  }
}
