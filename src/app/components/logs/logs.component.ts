import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: {
    id: string,
    text: string,
    date: any
  }[];

  selectedLog: Log;

  constructor(private logService: LogService) { }

  ngOnInit() {

    this.logService.stateClear.subscribe( clear => {
      if(clear) {
        this.selectedLog = { id: null, text: null, date: null}
      }
    });
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
    });
  }

  onSelect(log: Log) {
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  removeLog(log:Log) {

    if(confirm("Are you sure?")) {
      this.logService.removeLog(log);
    }
  }

}
