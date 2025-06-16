<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { LogEntry } from "$lib/LogEntry";
    import { tryParseJSON, prettyPrintJSON, highlight } from "$lib/log-utils";

    export let log: LogEntry;
    export let searchTerm: string;

    const dispatch = createEventDispatcher();

    function handleClick() {
        if (log.message.includes("Received: Screen  On")) {
            dispatch("logClicked", { log, screenOn: true });
        } else if (log.message.includes("Received: Screen  Off")) {
            dispatch("logClicked", { log, screenOn: false });
        } else {
            dispatch("logClicked", { log });
        }
    }
</script>

<div
    class="log"
    role="button"
    tabindex="0"
    on:click={handleClick}
    on:keydown={(e) => (e.key === "Enter" || e.key === " ") && handleClick()}
>
    <div>
        <span class="datetime">{log.datetime}</span> –
        <span class="process">{log.process}[{log.pid}]</span>:
    </div>

    {#if tryParseJSON(log.message)}
        {@const parsed = tryParseJSON(log.message)}
        <div class="message">
            <pre><code>{@html prettyPrintJSON(parsed)}</code></pre>
        </div>
    {:else}
        <div class="message">
            {@html highlight(log.message, searchTerm)}
        </div>
    {/if}
</div>

<style>
    .log {
        cursor: pointer;
        padding: 0.5em;
        border-bottom: 1px solid #eee;
        transition: background 0.2s;
    }

    .log:hover,
    .log:focus {
        background: #f5f5f5;
        outline: none;
    }

    .process {
        font-weight: bold;
    }

    .datetime {
        color: #555;
    }

    .message {
        margin-left: 1em;
    }

    pre {
        background-color: #f9f9f9;
        padding: 1em;
        border-radius: 6px;
        overflow-x: auto;
        font-size: 0.9em;
        line-height: 1.4;
        white-space: pre-wrap;
    }
</style>
