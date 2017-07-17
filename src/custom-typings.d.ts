/**
 * In Typescript version 2+, we can use wildcard character in module names.
 * This "*" allows for matching all unknown modules in the system,
 * which can be used as a way to suppress all missing module errors
 */

// wildcard rule for html file imports, e.g. templates
declare module '*.html' {
  const html: string;
  export = html;
}

// wildcard rule for json file imports
declare module '*.json' {
  const json: string;
  export = json;
}
