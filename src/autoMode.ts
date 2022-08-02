/**
 * Copyright 2022 Céline Souchet
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 *
 * This project is a fork of the original just-good-cookies project of Francesco Mugnai.
 */
import JGC from './justgoodcookies';
import { getCookie, saveCookie } from './cookies';
import { checkTailwindPrefix } from './utilities';
import { generateIframeDivs } from './placeholders';

/**
 * Enable Auto Mode
 */
export function autoMode(arrToActivate?: any): void {
  const objKeys = Object.keys(JGC.autoCategories);
  const arrService = [];
  if (arrToActivate) {
    for (const [k, v] of Object.entries(JGC.autoCategories)) {
      if (!arrToActivate.includes(v[1])) {
        const scripts = document.querySelectorAll('iframe,script,link');
        for (const element of scripts) {
          if (!element.getAttribute('data-jgc-tag')) {
            const src = (element as any).src || (element.tagName == 'LINK' ? element.getAttribute('href') : undefined);
            if (src && src.includes(k)) {
              if (element.tagName == 'IFRAME') generateIframeDivs(element);
              removeElements(element);
            } else {
              element.classList.remove(checkTailwindPrefix('hidden'));
            }
          }
        }
      } else {
        const removeStyle = document.querySelectorAll('[data-jgc-remove-style]');
        if (removeStyle) {
          for (let i = 0; i < removeStyle.length; i++) {
            const element = removeStyle[i];
            if (element.getAttribute('data-jgc-remove-style') == k) element.remove();
          }
        }
      }
    }
  } else {
    setTimeout(() => {
      let checkedElement: any = undefined;
      document.querySelectorAll('iframe,script,link').forEach(element => {
        const src = (element as any).src || (element.tagName == 'LINK' ? element.getAttribute('href') : undefined);
        if (src) {
          if (!element.getAttribute('data-jgc-tag')) {
            element.classList.remove(checkTailwindPrefix('hidden'));
            if (
              objKeys.some(v => {
                if (src && src.includes(v)) {
                  arrService.push(JGC.autoCategories[v]);
                  checkedElement = v;
                  return src.includes(v);
                }
              })
            ) {
              const checkIfNecessary = Object.values(JGC.autoCategories[checkedElement]);
              if (checkIfNecessary[1] != 'necessary') {
                if (element.tagName == 'IFRAME') generateIframeDivs(element);
                removeElements(element);
              }
            }
          }
        }
      });
      generatePreferenceStorage();
    }, 1);
  }
}

/**
 * Check active cookies in AutoMode
 */
export function checkCookiesAutoMode(): void {
  if (JGC.auto) {
    const checkPreferences = getCookie('JgcPreferences');
    const trueArr = [];
    for (const [k, v] of Object.entries(checkPreferences.preferences)) if (v) trueArr.push(k);
    for (let i = 0; i < trueArr.length; i++) {
      const element = trueArr[i];
    }
    autoMode(trueArr);
  }
}

/**
 * Generate the storage for "JgcPreferences"
 */
export function generatePreferenceStorage(): void {
  const checkPreferences = getCookie('JgcPreferences');
  if (checkPreferences == null) {
    const preferences = {};
    for (const [k, v] of Object.entries(JGC.getCustomCookies)) k == 'necessary' ? (preferences[k] = true) : (preferences[k] = false);
    const saveObj = { preferences };
    saveCookie(saveObj);
  }
}

/**
 * Remove elements and siblings from DOM in AutoMode.
 */
export function removeElements(element: any): void {
  const nextSibling = element.nextSibling;
  // Need a quick timeout
  setTimeout(() => {
    element.parentNode.removeChild(element);
    element.remove();
    if (nextSibling && nextSibling.tagName == 'IFRAME') nextSibling.remove();
  }, 1);
}
