import { Component, OnInit } from '@angular/core';
import { ActivityLog, LogService } from '../services/log-service.service';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: ActivityLog[] = [];

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.logService.getLogs().subscribe((logs) => {
      this.logs = logs;
    });
  }
}