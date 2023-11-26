/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/ban-ts-comment */

export const getObjectPaths = (obj: Record<string, unknown>, parentKey: string = ''): string[] => {
  let paths: string[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentPath = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // @ts-ignore
        const nestedPaths = getObjectPaths(obj[key], currentPath);
        paths = paths.concat(nestedPaths);
      } else {
        const fullPath = currentPath + '.' + obj[key];
        paths.push(fullPath);
      }
    }
  }

  return paths;
};