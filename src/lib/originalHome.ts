import fs from "node:fs";
import path from "node:path";

const originalPath = path.resolve(process.cwd(), "public/original/index.html");

let cache: string | null = null;

function normalizePaths(html: string) {
  return html
    .replace(/(^|["'(,\s])https?:\/\/www\.ipackbynewstep\.com/gi, "$1")
    .replace(/(^|["'(,\s])\/\/www\.ipackbynewstep\.com/gi, "$1")
    .replace(/(^|["'(,\s])\/?wp-content\//g, "$1/original/wp-content/")
    .replace(/(^|["'(,\s])\/?wp-includes\//g, "$1/original/wp-includes/");
}

function getHtml() {
  if (!cache) {
    cache = normalizePaths(fs.readFileSync(originalPath, "utf-8"));
  }
  return cache;
}

function matchOrEmpty(pattern: RegExp) {
  const m = getHtml().match(pattern);
  return m ? m[1] : "";
}

export function getHtmlAttrs() {
  return matchOrEmpty(/<html([^>]*)>/is).trim();
}

export function getBodyAttrs() {
  return matchOrEmpty(/<body([^>]*)>/is).trim();
}

export function getHeadContent() {
  const head = matchOrEmpty(/<head[^>]*>([\s\S]*?)<\/head>/is);
  const tags =
    head.match(
      /<meta\b[^>]*>|<title\b[^>]*>[\s\S]*?<\/title>|<link\b[^>]*>|<style\b[^>]*>[\s\S]*?<\/style>/gi,
    ) ?? [];
  return tags.join("\n");
}

export function getHeaderHtml() {
  return matchOrEmpty(/<body[^>]*>[\s\S]*?(<header\b[\s\S]*?<\/header>)/is);
}

export function getFooterHtml() {
  return matchOrEmpty(/<body[^>]*>[\s\S]*?(<footer\b[\s\S]*?<\/footer>)/is);
}

export function getMainHtml() {
  const body = matchOrEmpty(/<body[^>]*>([\s\S]*?)<\/body>/is);
  const header = getHeaderHtml();
  const footer = getFooterHtml();
  return body.replace(header, "").replace(footer, "");
}