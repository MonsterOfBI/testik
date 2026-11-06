// Minimal, safe markdown -> HTML for our own content (headings, lists, bold/italic, links, tables).
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function inline(s: string) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/\[([^\]]+)\]\(((?:\/(?!\/)|#|mailto:)[^)\s]*)\)/g, '<a href="$2">$1</a>');
}

export function md(src: string | undefined): string {
  if (!src) return "";
  const lines = src.replace(/\r/g, "").split("\n");
  const out: string[] = [];
  let list: "ul" | "ol" | null = null;
  let para: string[] = [];
  let table: string[][] | null = null;
  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(" "))}</p>`);
    para = [];
  };
  const flushList = () => {
    if (list) out.push(`</${list}>`);
    list = null;
  };
  const flushTable = () => {
    if (!table) return;
    const rows = table.filter((r) => !r.every((c) => /^:?-{2,}:?$/.test(c.trim())));
    const [head, ...body] = rows;
    out.push(
      `<table><thead><tr>${head.map((c) => `<th>${inline(c.trim())}</th>`).join("")}</tr></thead><tbody>${body
        .map((r) => `<tr>${r.map((c) => `<td>${inline(c.trim())}</td>`).join("")}</tr>`)
        .join("")}</tbody></table>`,
    );
    table = null;
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^\s*\|.*\|\s*$/.test(line)) {
      flushPara();
      flushList();
      const cells = line.trim().slice(1, -1).split("|");
      (table ??= []).push(cells);
      continue;
    } else flushTable();
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flushPara();
      flushList();
      const lvl = Math.min(4, Math.max(3, h[1].length + 1));
      const anchor = h[2].match(/^(.*?)\s*\{#([\w-]+)\}$/);
      out.push(anchor ? `<h${lvl} id="${anchor[2]}">${inline(anchor[1])}</h${lvl}>` : `<h${lvl}>${inline(h[2])}</h${lvl}>`);
      continue;
    }
    const ul = line.match(/^\s*[-*•]\s+(.*)$/);
    const ol = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (ul || ol) {
      flushPara();
      const kind = ul ? "ul" : "ol";
      if (list !== kind) {
        flushList();
        out.push(`<${kind}>`);
        list = kind;
      }
      out.push(`<li>${inline((ul ?? ol)![1])}</li>`);
      continue;
    }
    flushList();
    para.push(line.trim());
  }
  flushPara();
  flushList();
  flushTable();
  return out.join("");
}
