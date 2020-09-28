export const { assign, entries, values, keys } = Object;

export const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    //eslint-disable-next-line
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '');

export const isArray = (a: any) => !!a && a.constructor === Array;
export const isObject = (a: any) => !!a && a.constructor === Object;

export const isEmpty = (entry: any) => {
  if (isArray(entry)) {
    return entry.length > 0;
  }
  if (isObject(entry)) {
    return entries(entry).length > 0;
  }
};
