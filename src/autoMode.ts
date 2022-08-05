/**
 * Copyright 2022 Céline Souchet
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 *
 * This project is a fork of the original just-good-cookies project of Francesco Mugnai.
 */
import JGC from './justgoodcookies';
import type { Preferences } from './cookies';
import { getCookie, getCookiePreferences, saveCookie } from './cookies';
import { checkTailwindPrefixes } from './utilities';
import { generateIframeDivs } from './placeholders';

/**
 * Enable Auto Mode
 */
export function autoMode(arrToActivate?: string[]): void {
  const arrService = [];
  const IFramesScriptsLinks = document.querySelectorAll<HTMLIFrameElement | HTMLScriptElement | HTMLLinkElement>('iframe,script,link');

  if (arrToActivate) {
    Object.entries(JGC.autoCategories).forEach(([k, v]) => {
      if (!arrToActivate.includes(v[1])) {
        IFramesScriptsLinks.forEach(element => {
          if (!element.getAttribute('data-jgc-tag')) {
            const src = element instanceof HTMLLinkElement ? element.getAttribute('href') : element.src;
            if (src && src.includes(k)) {
              if (element instanceof HTMLIFrameElement) {
                generateIframeDivs(element);
              }
              removeElements(element);
            } else {
              element.classList.remove(checkTailwindPrefixes('hidden'));
            }
          }
        });
      } else {
        document.querySelectorAll('[data-jgc-remove-style]')?.forEach(element => {
          if (element.getAttribute('data-jgc-remove-style') == k) {
            element.remove();
          }
        });
      }
    });
  } else {
    setTimeout(() => {
      let checkedElement: string;
      IFramesScriptsLinks.forEach(element => {
        const src = element instanceof HTMLLinkElement ? element.getAttribute('href') : element.src;
        if (src && !element.getAttribute('data-jgc-tag')) {
          element.classList.remove(checkTailwindPrefixes('hidden'));
          if (
            Object.keys(JGC.autoCategories).some(key => {
              if (src?.includes(key)) {
                arrService.push(JGC.autoCategories[key]);
                checkedElement = key;
                return src.includes(key);
              }
            })
          ) {
            if (Object.values(JGC.autoCategories[checkedElement])[1] != 'necessary') {
              if (element instanceof HTMLIFrameElement) {
                generateIframeDivs(element);
              }
              removeElements(element);
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
    const trueArr = Object.entries(getCookiePreferences('JgcPreferences'))
      .map(([key, value]) => {
        if (value) {
          return key;
        }
      })
      .filter(x => x);
    autoMode(trueArr);
  }
}

/**
 * Generate the storage for "JgcPreferences"
 */
export function generatePreferenceStorage(): void {
  if (!getCookie('JgcPreferences')) {
    const preferences: Preferences = { necessary: undefined };
    Object.keys(JGC.getCustomCookies).forEach(key => (preferences[key] = key === 'necessary'));
    saveCookie({ preferences });
  }
}

/**
 * Remove elements and siblings from DOM in AutoMode.
 */
export function removeElements(element: HTMLElement): void {
  const nextSibling = element.nextSibling;

  // Need a quick timeout
  setTimeout(() => {
    element.parentNode.removeChild(element);
    element.remove();
    if (nextSibling instanceof HTMLIFrameElement) {
      nextSibling.remove();
    }
  }, 1);
}
