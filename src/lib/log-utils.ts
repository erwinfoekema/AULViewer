export function tryParseJSON(input: string): any | null {
    try {
        const trimmed = input.trim();
        if (
            (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
            (trimmed.startsWith("[") && trimmed.endsWith("]"))
        ) {
            const result = JSON.parse(trimmed);
            if (typeof result === "string") {
                return JSON.parse(result);
            }
            return result;
        }
        return null;
    } catch {
        return null;
    }
}

export function highlight(text: string, term: string): string {
    if (!term) return text;
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
}

export function prettyPrintJSON(input: any): string {
    const json = JSON.stringify(input, null, 2);

    return json
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/  /g, "&nbsp;&nbsp;") // inspringing
        .replace(/\n/g, "<br>"); // line breaks
}
