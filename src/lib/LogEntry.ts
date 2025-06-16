// src/lib/LogEntry.ts

export class LogEntry {
  date: string;
  time: string;
  hostname: string;
  process: string;
  pid: string;
  message: string;

  constructor(data: Record<string, any>) {
    this.date = data.date || "onbekend";
    this.time = data.time || "onbekend";
    this.hostname = data.hostname || "–";
    this.process = data.process || "onbekend";
    this.pid = String(data.pid ?? data.PID ?? "?");
    this.message = data.message ?? data.data ?? "(geen bericht)";
  }

  get datetime(): string {
    return `${this.date} ${this.time}`;
  }
}