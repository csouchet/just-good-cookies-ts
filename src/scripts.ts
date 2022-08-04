/**
 * Copyright 2022 Céline Souchet
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 *
 * This project is a fork of the original just-good-cookies project of Francesco Mugnai.
 */
import { getCookie, saveCookie } from './cookies';
import { checkTailwindPrefixes } from './utilities';
import { generateIframeDivs } from './placeholders';

/**
 * Enable scripts
 */
export function activateToggledCookies(): void {
  const checkPreferences = getCookie('JgcPreferences');
  Object.entries(checkPreferences.preferences).forEach(([key, value]) => {
    const tagToCheck = `[data-jgc-tag="${key}"]`;
    if (value == true) {
      replaceScripts(tagToCheck);
    } else {
      document.querySelectorAll<HTMLElement>(tagToCheck).forEach(element => {
        const parent = element.parentNode as HTMLElement;
        if (parent.hasAttribute('data-jgc-placeholder')) {
          generateIframeDivs(element);
        } else if (value != false) {
          element.classList.add(checkTailwindPrefixes('hidden'));
          element.innerHTML = '';
        }
      });
    }
  });

  if (checkPreferences.darkBackground) {
    saveCookie({ ...checkPreferences, darkBackground: false });
    document.getElementById('jgcModal')?.classList.add(checkTailwindPrefixes('hidden'));
  }
}

/**
 * Delete Google Analytics cookies if the user has changed their settings in this regard
 * TODO: It needs to be improved.
 */
export function checkGoogleAnalytics(): void {
  const checkPreferencesFromStorage = JSON.parse(localStorage.getItem('JgcPreferences'));
  Object.entries(checkPreferencesFromStorage).forEach(([key, value]) => {
    if (key != 'necessary') {
      const getGoogleAnalytics = document.getElementById('googleAnalytics');
      // TODO: This part can be improved
      if (getGoogleAnalytics && key == getGoogleAnalytics.getAttribute('data-jgc-tag') && value == false) {
        const urlParams = (new URL(getGoogleAnalytics.getAttribute('data-jgc-src')) as any).escape();
        const googleAnalyticsId = urlParams.searchParams.get('id');
        const domain = window.location.hostname;

        document.cookie = `_ga=; path=/; domain=${domain}; expires=` + new Date(0).toUTCString();
        document.cookie = `_ga=; path=/; domain=.${domain}; expires=` + new Date(0).toUTCString();
        document.cookie = `_ga_${googleAnalyticsId.slice(2)}=; path=/; domain=${domain}; expires=` + new Date(0).toUTCString();
        document.cookie = `_ga_${googleAnalyticsId.slice(2)}=; path=/; domain=.${domain}; expires=` + new Date(0).toUTCString();
        document.cookie = `_gid=; path=/; domain=${domain}; expires=` + new Date(0).toUTCString();
        document.cookie = `_gid=; path=/; domain=.${domain}; expires=` + new Date(0).toUTCString();
        document.cookie = `_gat_gtag_${googleAnalyticsId}=; path=/; domain=${domain}; expires=` + new Date(0).toUTCString();
        document.cookie = `_gat_gtag_${googleAnalyticsId}=; path=/; domain=.${domain}; expires=` + new Date(0).toUTCString();
        document.cookie = `_gat_gtag_UA_${googleAnalyticsId.slice(3, -2)}_1=; path=/; domain=${domain}; expires=` + new Date(0).toUTCString();
        document.cookie = `_gat_gtag_UA_${googleAnalyticsId.slice(3, -2)}_1=; path=/; domain=.${domain}; expires=` + new Date(0).toUTCString();
      }
    }
  });
}

/**
 * Hide the scripts
 */
export function hideScripts(): void {
  const placeholderElements = document.querySelectorAll<HTMLElement>('[data-jgc-placeholder]');

  document.querySelectorAll('[data-jgc-tag]').forEach(element => {
    if (element.getAttribute('data-jgc-tag') != 'necessary') {
      generateIframeDivs(element);
    } else {
      placeholderElements?.forEach(e => {
        if (e.contains(element)) {
          e.style.backgroundColor = '';
          e.className = '';
        }
      });
      replaceScripts(`[data-jgc-tag="necessary"]`);
    }
  });

  if (document.querySelectorAll('[data-jgc-remove]').length > 0) {
    removeScript(true);
  }
}

/**
 * Remove all divs that hide user accepted iframes
 */
export function removeDivsOfUserAcceptedIframes(): void {
  Object.entries(JSON.parse(localStorage.getItem('JgcPreferences'))).forEach(([key, value]) => {
    if (key != 'necessary') {
      document.querySelectorAll('[data-jgc-remove-style]').forEach(element => {
        if (element.getAttribute('data-jgc-tag') == key && value == true) {
          element.remove();
        }
      });
    }
  });
}

type Service = { service: string; tag: string };

/**
 * Remove scripts from the DOM (if necessary)
 */
export function removeScript(value: boolean): void {
  const scriptsToRemove = document.querySelectorAll('[data-jgc-remove]');
  const preferencesCookie = getCookie('JgcPreferences');

  if (value && scriptsToRemove.length > 0) {
    const updatedPreferencesCookie = { ...preferencesCookie, remove: scriptsToRemove.length };
    saveCookie(updatedPreferencesCookie);

    const servicesToReturn: Service[] = [];
    scriptsToRemove.forEach(element => {
      const service = element.getAttribute('data-jgc-service');
      if (service?.length > 0) {
        servicesToReturn.push({ service, tag: element.getAttribute('data-jgc-tag') });
        saveCookie({ ...updatedPreferencesCookie, servicesRemoved: servicesToReturn });
      }
      if (!getCookie('JgcPreferences').preferences[element.getAttribute('data-jgc-tag')]) {
        element.remove();
      }
    });
  } else {
    const updatedPreferencesCookie = { ...preferencesCookie, remove: 0, refresh: true };
    saveCookie(updatedPreferencesCookie);
    if (!preferencesCookie.refresh) {
      window.location.reload();
    }
  }
}

/**
 * Replace the attribute "jgc" from scripts if the user accepts
 */
export function replaceScripts(customAttributeToCheck: string): void {
  document.querySelectorAll<HTMLElement>(customAttributeToCheck).forEach(element => {
    element.style.display = '';
    element.style.backgroundColor = '';

    const customTypeAttribute = element.getAttribute('data-jgc-type');
    customTypeAttribute && element.setAttribute('type', customTypeAttribute);

    const src = element.getAttribute('data-jgc-src');
    if (src) {
      const customSrc = escape(src);
      if ('InstallTrigger' in window) {
        setTimeout(() => {
          element.setAttribute('src', customSrc);
        }, 100);
      } else {
        element.setAttribute('src', customSrc);
      }
      element.classList.remove(checkTailwindPrefixes('hidden'));
    }

    // TODO: This part can be improved
    if (element.hasAttribute('data-jgc-remove') && element.hasChildNodes()) {
      for (let i = 0; i < element.children.length; i++) {
        const child = element.children[i];
        if (child.hasAttribute('data-jgc-src')) {
          child.setAttribute('src', escape(child.getAttribute('data-jgc-src')));
        }
      }
    }
  });
}
