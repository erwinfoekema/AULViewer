// src/lib/LogEntry.ts

export class LogEntry {
  date: string;
  time: string;
  hostname: string;
  process: string;
  pid: string;
  message: string;

  constructor(data: {
    date: string;
    time: string;
    hostname: string;
    process: string;
    pid: string;
    message: string;
  }) {
    this.date = data.date;
    this.time = data.time;
    this.hostname = data.hostname;
    this.process = data.process;
    this.pid = data.pid;
    this.message = data.message;
  }

  get datetime(): string {
    return `${this.date} ${this.time}`;
  }
}