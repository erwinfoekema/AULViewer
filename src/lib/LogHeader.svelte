<script lang="ts">
  export let availableFiles: string[] = [];
  export let selectedFile: string;
  export let searchTerm: string;

  // Emit updates
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function handleFileChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    dispatch("searchChange", (event.target as HTMLInputElement).value);
  }

  function handleSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    dispatch("searchChange", (event.target as HTMLInputElement).value);
  }
</script>

<div class="header-bar">
  <label>
    Bestand:
    <select on:change={handleFileChange} bind:value={selectedFile}>
      {#each availableFiles as file}
        <option value={file}>{file}</option>
      {/each}
    </select>
  </label>

  <label>
    Filter:
    <input
      type="text"
      placeholder="Type om te filteren..."
      value={searchTerm}
      on:input={handleSearchChange}
    />
  </label>
</div>

<style>
  .header-bar {
    position: sticky;
    top: 0;
    background: white;
    display: flex;
    gap: 1em;
    align-items: center;
    padding: 0.5em 1em;
    border-bottom: 1px solid #ccc;
    z-index: 10;
  }

  .header-bar label {
    font-weight: bold;
    font-size: 0.9em;
  }

  .header-bar select,
  .header-bar input {
    margin-left: 0.5em;
    padding: 0.25em;
    font-size: 1em;
  }
</style>
