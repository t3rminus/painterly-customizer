/*
 * Note that all these functions may be run on both client and server
 */

/**
 * Gets the user's current locale, if available
 * @param {string} def The default/fallback URL
 * @returns {string} A string representing the current language
 */
export const getLocale = (def = 'en-US') => {
  if (typeof window === 'undefined') {
    return def;
  } else {
    return window?.navigator?.language || def;
  }
};

/**
 * Escapes a string for regular expression use
 * See: https://stackoverflow.com/a/9310752
 * @param {string} text The string to escape
 * @returns A version safe to use in regular expressions
 */
function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

/**
 * Gets the parts of a locale-specific decimal format
 * @returns {object} An object with decimal (e.g. period or comma) and group properties (space, comma, or period)
 */
const numFormatParts = () => {
  const orgNum = 1000.1;
  const parts = Intl.NumberFormat().formatToParts(orgNum);
  return {
    decimal: parts.find((p) => p.type === 'decimal')?.value || '.',
    group: parts.find((p) => p.type === 'group')?.value || null,
  };
};

/**
 * Parses a float value according to the user's locale
 * @param {string|number} val The number to interpret
 * @returns number A decimal representation of that number according to the user's locale
 */
export const parseLocaleFloat = (val) => {
  const str = `${val}`;
  const numParts = numFormatParts();
  const pattern = new RegExp(
    `^([^${escapeRegExp(numParts.decimal)}]*)(${escapeRegExp(
      numParts.decimal
    )}(.*))?$`
  );
  const parts = pattern.exec(str);
  const whole = `${parts[1] || 0}`.replace(/[^0-9]+/g, '');
  const decimal = `${parts[3] || 0}`.replace(/[^0-9]+/g, '');
  return parseInt(whole) + parseFloat(`0.${decimal}`) || 0;
};

/**
 * Formats a numeric value into a currency
 * @param {Number} amount The number value to format
 * @param {Bool} showDollar Whether to prepend the dollar sign (default: true)
 * @param {Bool} showCents Whether to show cents (default: false)
 * @returns A string in currency format
 */
export const formatCurrency = (
  amount,
  showDollar = true,
  showCents = false
) => {
  const currencyFormatter = new Intl.NumberFormat(getLocale(), {
    style: 'currency',
    currency: 'CAD',
    currencyDisplay: 'narrowSymbol',
  });
  let result = currencyFormatter.format(amount);
  result = showDollar ? result : result.replace(/\$/g, '');
  result = showCents ? result : result.replace(/\.[0-9]+$/, '');
  return result;
};

export const formatDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return date.toLocaleString(getLocale(), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatTime = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return date.toLocaleString(getLocale(), {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export const formatDateTime = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return date.toLocaleString(getLocale(), {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export const avatarInitials = (name) =>
  `${name}`
    .split(/\s+/g)
    .filter(Boolean)
    .map((s) => s[0])
    .slice(-2)
    .join('')
    .toUpperCase();

/**
 * Serializes a sort object for URL
 * @param {Object} obj Key-value map in the format { "fieldname": "ASC", "fieldtwo": "DESC" }
 * @returns String in the format fieldname|ASC,fieldtwo|DESC
 */
export const serializeSort = (obj) =>
  Object.keys(obj)
    .map((key) => obj[key] === 'DESC' ? `-${key}` : key)
    .join('|');

/**
 * Un-serializes a sort object from URL
 * @param String strj String in the format fieldname|ASC,fieldtwo|DESC
 * @returns Key-value map in the format { "fieldname": "ASC", "fieldtwo": "DESC" }
 */
export const unserializeSort = (str) =>
  str && str.length
    ? str
        .split('|')
        .filter(Boolean)
        .reduce((out, s) => {
          if (/^-/.test(s)) {
            out[s.replace(/^-/,'')] = 'DESC';
          } else {
            out[s] = 'ASC';
          }
          return out;
        }, {})
    : {};

export const dangerouslyStripHTML = (str) => {
  if (!str) {
    return '';
  }

  return `${str}`
    .replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, '')
    .replace(/\s+/, ' ')
    .replace(/\n/g, '');
};

export const excerpt = (html, size = 16, moreChar = '…') => {
  const words = dangerouslyStripHTML(html).split(/\s+/);
  if (words.length > size) {
    let excerpt = words.slice(0, size).join(' ');
    excerpt = excerpt.replace(/[^a-z]+$/i, moreChar);
    return excerpt;
  } else {
    return words.join(' ');
  }
};

export const fetchJSON = async (...args) => {
  const response = await fetch(...args);
  if (response.ok) {
    return response.json();
  }
  throw new Error(`FetchJSON Error ${response.status} ${response.statusText}`);
};

export const triggerDownload = async (uri, name) => {
  const response = await fetch(uri);
  if (response.ok) {
    const data = await response.blob();
    const dataURL = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.download = name;
    link.href = dataURL;
    link.click();
  }
};

export const filterObj = (obj, keys) =>
  keys.reduce(
    (result, key) => {
      if (obj[key] !== undefined) {
        result[key] = obj[key];
      }
      return result;
    },
    {}
  );


export const repeat = (length, fn) => Array.from({ length }, (_v, k) => fn(k));

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const defaultChrs = 'ABCDEFGHJKLMNPQRTUVWXYZabcdefghjklmnpqrtuvwxyz2346789!@#$%?=';
export const generateRandomStr = (length = 12, chrs) => repeat(length, () => pick(chrs || defaultChrs)).join('');

export const clamp = (num, min, max) => Math.max(min, Math.min(max, num));
