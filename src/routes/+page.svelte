<script lang="ts">
  import { onMount } from 'svelte';

  // LogEntry class
  class LogEntry {
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

  let availableFiles = ['20250903_1450.json', '20250903_1451.json', '20250903_1452.json'];
  let selectedFile: string = '';
  let logs: LogEntry[] = [];
  let searchTerm = '';

  async function loadFile() {
    if (!selectedFile) return;
    const res = await fetch(`/aul/${selectedFile}`);
    const data = await res.json();
    logs = data.map((entry: any) => new LogEntry(entry));
  }

  function highlight(text: string, term: string): string {
    if (!term) return text;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
    }

  onMount(() => {
    selectedFile = availableFiles[0];
    loadFile();
  });

  // Gefilterde logregels op basis van zoekterm
  $: filteredLogs = logs.filter(log =>
    log.message.toLowerCase().includes(searchTerm.toLowerCase())
  );
</script>



<!-- Bestand kiezen -->
<h2>Selecteer logbestand</h2>
<select bind:value={selectedFile} on:change={loadFile}>
  {#each availableFiles as file}
    <option value={file}>{file}</option>
  {/each}
</select>

<!-- Zoekfilter -->
<h2>Filter op message</h2>
<input type="text" placeholder="Type om te filteren..." bind:value={searchTerm} />

<!-- Logweergave -->
<h2>Logregels</h2>
{#if filteredLogs.length === 0}
  <p><i>Geen resultaten voor: "{searchTerm}"</i></p>
{:else}
  {#each filteredLogs as log}
    <div class="log">
      <div><span class="datetime">{log.datetime}</span> – <span class="process">{log.process}[{log.pid}]</span>:</div>
      <div class="message">
    {@html highlight(log.message, searchTerm)}
    </div>
    </div>
  {/each}
{/if}

<style>
  .log {
    font-family: monospace;
    border-bottom: 1px solid #ddd;
    padding: 0.5em;
  }
  mark {
    background-color: yellow;
    font-weight: bold;
  }

  .process {
    font-weight: bold;
  }

  .message {
    margin-left: 1em;
  }

  input[type="text"] {
    margin: 1em 0;
    padding: 0.5em;
    width: 100%;
    max-width: 500px;
    font-size: 1em;
  }
</style>