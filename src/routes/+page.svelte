<script lang="ts">
    import "../app.css";
    import { onMount } from "svelte";
    import { LogEntry } from "$lib/LogEntry";
    import { init3d } from "$lib/init3d";
    import LogComponent from "$lib/LogComponent.svelte";
    import LogHeader from "$lib/LogHeader.svelte";

    let availableFiles = [
        "20250903_1450.json",
        "20250903_1451.json",
        "20250903_1452.json",
    ];

    let selectedFile = availableFiles[0];
    let logs: LogEntry[] = [];
    let searchTerm = "";

    let screenIsOn = false;

    function handleLogClick(log: LogEntry) {
        if (log.message.includes("Screen On")) {
            screenIsOn = true;
        } else if (log.message.includes("Screen Off")) {
            screenIsOn = false;
        }
    }
    async function loadFile(file: string) {
        try {
            const res = await fetch(`/aul/${file}?t=${Date.now()}`);
            const data = await res.json();
            logs = data.map((entry: any) => new LogEntry(entry));
        } catch (e) {
            console.error("Fout bij laden bestand:", e);
            logs = [];
        }
    }

    $: filteredLogs = logs.filter((log) =>
        log.message.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    onMount(() => {
        loadFile(selectedFile);
        const container = document.getElementById("three-container");
        if (container) init3d(container);
    });
</script>

<div class="page">
    <div id="log-viewer">
        <LogHeader
            {availableFiles}
            {selectedFile}
            {searchTerm}
            on:fileChange={(e) => (selectedFile = e.detail)}
            on:searchChange={(e) => (searchTerm = e.detail)}
        />
        {#if filteredLogs.length === 0}
            <p><i>Geen resultaten voor: "{searchTerm}"</i></p>
        {:else}
            {#each filteredLogs as log}
                <LogComponent
                    {log}
                    {searchTerm}
                    on:logClicked={(e) => handleLogClick(e.detail)}
                />

            
            {/each}
        {/if}
    </div>
    <div id="three-container"></div>
</div>

<style>
    .page {
        display: flex;
        height: 100vh;
        overflow: hidden;
    }

    #log-viewer {
        width: 45%;
        overflow-y: scroll;
        padding: 1em;
        background: #fff;
        border-right: 1px solid #ddd;
    }

    #three-container {
        flex-grow: 1;
        background-color: #f0f0f0;
    }
    pre {
        background-color: #f9f9f9;
        padding: 1em;
        border-radius: 6px;
        overflow-x: auto;
        font-family: monospace;
        font-size: 0.9em;
        line-height: 1.4;
        white-space: pre-wrap;
    }

    code {
        color: #222;
    }

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
