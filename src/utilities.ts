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

/**
 * Intercept the pressure of the "enter" key
 */
export function addEnterAction(el: string): void {
  document.getElementById(el).addEventListener('keyup', (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      return `JGC.${el}()`;
    }
  });
}

/**
 * Control whether the background should be dark or not
 */
export function checkBackground(): void {
  const preferencesCookie = getCookie('JgcPreferences');
  if (JGC.bannerConfig.backgroundDark != false && (preferencesCookie.darkBackground == false || !preferencesCookie.duration)) {
    const modal = document.createElement('div');
    modal.id = 'jgcModal';
    modal.className = checkTailwindPrefixes('bg-black bg-opacity-80 fixed min-h-screen top-0 w-full z-index-50');
    document.body.appendChild(modal);

    saveCookie({ ...preferencesCookie, darkBackground: true });
  }
}

/**
 * Check if the dark mode should be activated.
 */
export function checkDarkMode(): void {
  const htmlClass = document.querySelector('html').classList.contains(checkTailwindPrefixes('dark'));
  if (htmlClass) {
    JGC.darkMode = true;
  }
}

function checkTailwindPrefix(element: string, withSecondPrefix = false): string {
  if (/:/.test(element)) {
    const prefix = element.split(':')[0];
    if (withSecondPrefix && element.includes('dark:group-hover')) {
      const prefix2 = element.split(':')[1];
      return element.replace(prefix + ':' + prefix2 + ':', `${prefix}:${prefix2}:${JGC.tailwindPrefix}`);
    } else {
      return element.replace(prefix + ':', `${prefix}:${JGC.tailwindPrefix}`);
    }
  } else {
    return JGC.tailwindPrefix + element;
  }
}

/**
 * Check if a prefix for Tailwind has been chosen and updates all class names
 */
export function checkTailwindPrefixes(value: string): string {
  if (value && /\s/.test(value)) {
    return value
      .split(/[ ,]+/)
      .map(element => checkTailwindPrefix(element, true))
      .join(' ');
  }
  return checkTailwindPrefix(value);
}

/**
 * Get the max width of the banner
 */
export function getMaxWidth(defaultValue: string): string {
  return checkTailwindPrefixes(JGC.bannerConfig?.maxWidth ? `max-w-${JGC.bannerConfig.maxWidth}` : defaultValue);
}

/**
 * Checking whether a value is a string or an object (for translations)
 */
export function isString(value: string | object, key: string): string {
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'object') {
    return value[JGC.localeString].escape();
  } else {
    throw `: "${key}" is not valid, must be a string or an object.`;
  }
}

/**
 * Load user-defined text
 */
export function loadText(): void {
  JGC.bannerText = document.getElementById('jgc-banner-text')?.innerHTML;
  JGC.bannerLink = document.getElementById('jgc-banner-link')?.innerHTML;
  JGC.panelHeader = document.getElementById('jgc-panel-header')?.innerHTML;
  JGC.panelFooter = document.getElementById('jgc-panel-footer')?.innerHTML;
}

/**
 * Return icons (if any)
 */
export function returnIcon(): string {
  if (JGC.bannerConfig.icon) {
    if (JGC.darkMode) {
      return `<div><img class="${checkTailwindPrefixes('w-4 h-4')}" src="${JGC.bannerConfig.iconDark}" /></div>`;
    }
    return `<div><img class="${checkTailwindPrefixes('w-4 h-4')}" src="${JGC.bannerConfig.icon}" /></div>`;
  }
  return '';
}

/**
 * Return logo (if any)
 */
export function returnLogo(): string {
  return JGC.bannerConfig.logo ? `<img class="${JGC.bannerConfig.logoClasses ? JGC.bannerConfig.logoClasses : ''}" src="${JGC.bannerConfig.logo}" />` : '';
}

export function escape(value: string): string {
  const replace = {
    '>': '&gt;',
    '<': '&lt;',
    '&': '&amp;',
  };
  return value.replace(/[&<>]/g, tag => replace[tag] || tag);
}
