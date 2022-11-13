import pluralize from 'pluralize';
import { debounce, isObject, isEmpty, truncate } from 'lodash';
import { detect } from 'detect-browser';

const qs = require('query-string');

export const formatCurrency = n => {
  const formatter = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  });

  return formatter.format(parseFloat(n));
};

export function fullname(first, middle, last) {
  return `${first} ${middle || ''} ${last}`;
}

export const dateToTimestamp = date => new Date(date).getTime() / 1000 || 0;

export const pluralizeIfNecessary = (word, n) => {
  if (n === 1) return word;
  return pluralize(word);
};

export function redirectWithSearch(searchText) {
  window.location.href = `/books?q=${searchText}`;
}

export const createDebouncedStore = key => ({
  get: () => {
    let result = null;
    try {
      result = JSON.parse(localStorage.getItem(key));
    } catch (err) {
      console.log(err);
    }

    return result;
  },

  set: debounce(value => {
    let toStore = value;
    if (isObject(value)) {
      toStore = JSON.stringify(toStore);
    }
    localStorage.setItem(key, toStore);
  }, 500),

  clear: () => {
    localStorage.removeItem(key);
  },
});

export const createRecommendationHitsStore = () => ({
  get: () => {
    let result = null;
    try {
      result = JSON.parse(localStorage.getItem(`rec_hits`)) || {};
    } catch (err) {
      result = {};
    }
    return result;
  },

  add: (recId, recHitId, bookId) => {
    let existingHits = null;
    try {
      existingHits = JSON.parse(localStorage.getItem(`rec_hits`)) || {};
    } catch (err) {
      existingHits = {};
    }
    if (existingHits[recId] && existingHits[recId].recHitId) {
      return;
    }
    localStorage.setItem(
      `rec_hits`,
      JSON.stringify(
        Object.assign(existingHits, { [recId]: { recHitId, bookId } }),
      ),
    );
  },

  remove: value => {
    let existingHits = null;
    try {
      existingHits = JSON.parse(localStorage.getItem(`rec_hits`)) || {};
    } catch (err) {
      existingHits = {};
    }
    delete existingHits[value];
    localStorage.setItem(
      `rec_hits`,
      JSON.stringify(Object.assign(existingHits)),
    );
  },
});

export function calculateTips(tips) {
  return Object.values(tips).reduce((sum, tip) => {
    const price = parseFloat(tip || 0);
    return sum + price;
  }, 0);
}

export function calculateSubtotal(cart) {
  return Object.values(cart).reduce((sum, book) => {
    const price = parseFloat(book.price);
    const tip = !isEmpty(book.tips) ? calculateTips(book.tips) : 0;
    return sum + price + tip;
  }, 0);
}

export function formatePercentageToDecimal(percentageValue) {
  return parseFloat(Math.round(percentageValue * 100) / 100).toFixed(0);
}

export function priceToCents(money) {
  return Math.floor(parseFloat(money) * 100);
}

export function pointsToCents(points) {
  return Math.floor(points / 10);
}

export function formatContractPercent(value) {
  return `${Math.floor(value / 100)}%`;
}

export function rewardsPointsToCAD(points) {
  const result = points / 1000;
  return result.toFixed(2);
}

export function CADtoRewardsPoints(points) {
  const result = points * 1000;
  return result;
}

export function tableStableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function tableDescOrder(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getTableSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => tableDescOrder(a, b, orderBy)
    : (a, b) => -tableDescOrder(a, b, orderBy);
}
export function generateFallbackAvatar(name) {
  return `https://ui-avatars.com/api/?name=${name}`;
}

export function isValidUrl(url) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(url);
}

export function isValidEmail(email) {
  const regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  if (!email || email.length > 256) {
    return false;
  }

  const resultValid = regex.test(email);
  if (!resultValid) {
    return false;
  }

  const parts = email.split('@');
  if (parts[0].length > 64) {
    return false;
  }
  const domainParts = parts[1].split('.');
  if (
    domainParts.some(part => {
      return part.length > 64;
    })
  ) {
    return false;
  }

  return true;
}

export function prefixHttpIfNotPresent(url) {
  if (!url.includes('://')) {
    return `http://${url}`;
  }
  return url;
}

export async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

export function calculateReportsAmount(payouts) {
  let result = 0;
  for (let i = 0; i < payouts.length; i++) {
    result += parseFloat(payouts[i].amount);
  }
  return result;
}

export function isEmptyValues(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
}

export const stringToUrl = str => {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export function findCategory(categories, parent, child) {
  if (child && categories) {
    const parentCategory = categories.find(p => p.url === parent);
    return parentCategory.subCategories.find(c => c.url === child);
  }
  if (parent && categories) {
    return categories.find(category => category.url === parent);
  }
  return null;
}

export function checkImage(imageSrc) {
  const img = new Image();
  img.src = imageSrc;
  const noImage = img.onerror;
  return noImage;
}

// size options: 250, 600
export function getResizedImage(url, size) {
  if (url) {
    const cleanUrl = url.split(`?`)[0];
    const ext = cleanUrl.substr(cleanUrl.lastIndexOf('.') + 1);
    return cleanUrl.replace(`.${ext}`, `_${size}.${ext}`);
  }

  return ``;
}

// size options: 250, 600
export function getResizedImageWithCheck(url, size) {
  if (url) {
    const urlParts = url.split(`?`);
    const cleanUrl = urlParts[0];
    const ext = cleanUrl.substr(cleanUrl.lastIndexOf('.') + 1);
    let resizedImageUrl = cleanUrl.replace(`.${ext}`, `_${size}.${ext}`);

    if (checkImage(resizedImageUrl)) {
      return resizedImageUrl;
    }

    if (urlParts.length > 1) {
      resizedImageUrl = resizedImageUrl + '?' + urlParts[1];

      if (checkImage(resizedImageUrl)) {
        return resizedImageUrl;
      }
    }

    return url;
  }

  return ``;
}

export const setQueryStringWithoutPageReload = qsValue => {
  const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${qsValue}`;

  window.history.pushState({ path: newUrl }, '', newUrl);
};

export const setQueryStringValue = (
  key,
  value,
  queryString = window.location.search,
) => {
  const values = qs.parse(queryString);
  const newQsValue = qs.stringify({ ...values, [key]: value });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export const getQueryStringValue = (
  key,
  queryString = window.location.search,
) => {
  const values = qs.parse(queryString);
  return values[key];
};
export function containTextToLength(text, len) {
  // Max length, don't cut in the middle of a word
  return truncate(text, {
    length: len, // maximum 30 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

export function isSupportedBrowser() {
  const browser = detect();
  return (
    browser &&
    (browser.name === 'chrome' ||
      browser.name === 'safari' ||
      browser.name === 'ios' ||
      browser.name === 'ios-webview')
  );
}

export function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
