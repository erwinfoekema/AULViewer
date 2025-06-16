<script lang="ts">
  export let availableFiles: string[] = [];
  export let selectedFile: string;
  export let searchTerm: string;

  // Emit updates
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

<div class="header-bar">
  <label>
    Bestand:
    <select bind:value={selectedFile} on:change={(e) => dispatch("fileChange", (e.target as HTMLSelectElement).value)}>
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
      bind:value={searchTerm}
      on:input={(e) =>
        dispatch("searchChange", (e.target as HTMLInputElement).value)}
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
