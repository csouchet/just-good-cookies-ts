/**
 * Copyright 2022 Céline Souchet
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 *
 * This project is a fork of the original just-good-cookies project of Francesco Mugnai.
 */

import type { GetCustomCookies } from './justgoodcookies';
import JGC from './justgoodcookies';
import { checkTailwindPrefixes } from './utilities';
import { refreshLocalStorage, getCookie, saveCookie } from './cookies';
import { closeBanner } from './banner';
import { activateToggledCookies, removeScript } from './scripts';

/**
 * Animate toggles
 */
export function animateToggle(val: any, buttonType: any) {
  const toggle = document.getElementById('toggle-' + buttonType + '-div');
  const toggleRight = document.getElementById('toggle-' + buttonType + '-right');
  const toggleNecessary = document.getElementById('toggle-necessary-right-fixed');
  const bgColor = JGC.customStyle?.toggles ? JGC.customStyle.toggles : checkTailwindPrefixes('bg-green-200');
  if (val && toggle != null && toggleRight != null) {
    toggle.classList.remove(checkTailwindPrefixes('bg-gray-800'), checkTailwindPrefixes('dark:bg-gray-700'));
    toggle.classList.add(bgColor);
    toggleRight.classList.remove(checkTailwindPrefixes('translate-x-0'));
    toggleRight.classList.remove(checkTailwindPrefixes('ml-0.5'));
    toggleRight.classList.add(checkTailwindPrefixes('-ml-0.5'));
    toggleRight.classList.add(checkTailwindPrefixes('border-green-400'));
    // toggleRight.classList.add(checkTailwindPrefix('translate-x-full'))
    toggleRight.classList.remove(checkTailwindPrefixes('left-0'));
    toggleRight.classList.add(checkTailwindPrefixes('absolute'));
    toggleRight.classList.add(checkTailwindPrefixes('right-0'));
  } else if (!val) {
    toggle.classList.remove(checkTailwindPrefixes('translate-x-full'));
    toggle.classList.remove(bgColor);
    toggle.classList.add(checkTailwindPrefixes('bg-gray-800'), checkTailwindPrefixes('dark:bg-gray-700'));
    toggleRight.classList.remove(checkTailwindPrefixes('-ml-0.5'));
    toggleRight.classList.remove(checkTailwindPrefixes('translate-x-full'));
    toggleRight.classList.remove(checkTailwindPrefixes('border-green-400'));
    toggleRight.classList.add(checkTailwindPrefixes('ml-0.5'));
    toggleRight.classList.add(checkTailwindPrefixes('translate-x-0'));
    toggleRight.classList.add(checkTailwindPrefixes('left-0'));
  } else if (val && buttonType == 'necessary' && toggleNecessary) {
    toggle.classList.remove(checkTailwindPrefixes('bg-gray-800'), checkTailwindPrefixes('dark:bg-gray-700'));
    toggle.classList.add(bgColor);
    toggleNecessary.classList.remove(checkTailwindPrefixes('ml-0.5'));
    toggleNecessary.classList.add(checkTailwindPrefixes('-ml-0.5'));
    toggleNecessary.classList.remove(checkTailwindPrefixes('translate-x-0'));
    toggleNecessary.classList.add(checkTailwindPrefixes('border-green-400'));
    // toggleNecessary.classList.add(checkTailwindPrefix('translate-x-full'))
    toggleNecessary.classList.remove(checkTailwindPrefixes('left-0'));
    toggleNecessary.classList.add(checkTailwindPrefixes('absolute'));
    toggleNecessary.classList.add(checkTailwindPrefixes('right-0'));
  }
}

/**
 * Change toggles and settings
 */
export function changeSettings(toggleClicked: any) {
  const checkPreferencesFromStorage = JSON.parse(localStorage.getItem('JgcPreferences'));
  checkPreferencesFromStorage[toggleClicked] = !checkPreferencesFromStorage[toggleClicked];
  animateToggle(checkPreferencesFromStorage[toggleClicked], toggleClicked);
  const saveObj = { ...checkPreferencesFromStorage };
  localStorage.setItem('JgcPreferences', JSON.stringify(saveObj));
}

/**
 * Change the value of toggles
 */
export function changeToggle(): void {
  const checkPreferences = getCookie('JgcPreferences');
  Object.entries(checkPreferences['preferences']).forEach(([key, value]) => {
    if (value) {
      animateToggle(true, key);
    }
  });
}

/**
 * Close the settings panel and reload the page
 */
export function closePreferencePanel(): void {
  activateToggledCookies();
  removeScript(false);
  const date = new Date();
  date.setTime(date.getTime() + JGC.cookieTimeout);
  saveCookie({
    ...getCookie('JgcPreferences'),
    preferences: JSON.parse(localStorage.getItem('JgcPreferences')),
    duration: {
      value: '1',
      expiry: date.toString(),
    },
  });
  closeBanner();
  // And yes, we need to refresh the page to activate specific cookies. Maybe this part can be improved.
  window.location.reload();
}

/**
 * Change the local storage on "Save All"
 */
export function closePreferencePanelAndSaveAll(): void {
  const checkPreferencesFromStorage = JSON.parse(localStorage.getItem('JgcPreferences'));
  const preferences = {};
  Object.keys(checkPreferencesFromStorage).forEach(key => (preferences[key] = true));
  localStorage.setItem('JgcPreferences', JSON.stringify(preferences));
  if (document.getElementById('preferenceDiv')) {
    closePreferencePanel();
  }
}

/**
 * Generate single options (for the panel)
 */
export function generateOptions(): string {
  let arr = '';
  const cookieExists = getCookie('JgcPreferences');
  Object.entries(JGC.getCustomCookies).forEach(([key, value]) => {
    if (cookieExists['enable'].length > 0 && cookieExists['enable'].includes(key)) {
      arr += `
        <div class="${checkTailwindPrefixes('flex items-center space-x-6 py-1 px-4')} ${JGC.customStyle?.stripes ? `${JGC.customStyle.stripes}` : ''} ">
          <div>
            <div class="${checkTailwindPrefixes('flex items-center justify-center')}">
            <div id="toggle-${key}-div" class="${checkTailwindPrefixes('relative w-12 h-7 transition duration-200 ease-linear rounded-full bg-gray-800 dark:bg-gray-700')}">
              <label id="${key == 'necessary' ? `toggle-necessary-right-fixed` : `toggle-${key}-right`}"
                for="toggle-${key}" class="${checkTailwindPrefixes(
        'bg-gray-100 absolute left-0 w-6 h-6 mt-0.5 ml-0.5 transition duration-100 ease-linear transform rounded-full cursor-pointer mr-[2px]',
      )}">
                ${
                  key == 'necessary'
                    ? `
                <div class="${checkTailwindPrefixes('p-1 flex items-center justify-center')}">
                  <svg class="${
                    JGC.customStyle?.lockIcon ? JGC.customStyle.lockIcon : checkTailwindPrefixes('text-green-600')
                  }" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512">
                    <g>
                      <path d="m432,224h-48v-96c0-70.578-57.422-128-128-128s-128,57.422-128,128v96h-48c-8.836,0-16,7.164-16,16v256c0,8.836 7.164,16 16,16h352c8.836,0 16-7.164 16-16v-256c0-8.836-7.164-16-16-16zm-272-96c0-52.938 43.063-96 96-96s96,43.063 96,96v96h-16v-96c0-44.109-35.891-80-80-80s-80,35.891-80,80v96h-16v-96zm48,96v-96c0-26.469 21.531-48 48-48 26.469,0 48,21.531 48,48v96h-96zm208,256h-320v-224h320v224z"/>
                      <path d="m256,304.002c-17.673,0-32,14.326-32,32 0,11.814 6.476,22.018 16,27.561v36.439c0,8.836 7.163,16 16,16 8.837,0 16-7.164 16-16v-36.439c9.524-5.543 16-15.747 16-27.561 0-17.674-14.327-32-32-32z"/>
                    </g>
                  </svg>
                </div>
                `
                    : ``
                }
              </label>
              <input tabindex="0" type="checkbox" id="toggle-${key}" name="toggle-${key}" class="${checkTailwindPrefixes('w-full h-full appearance-none focus:shadow-2xl ')}"/>
            </div>
          </div>
        </div>
      <div class="${JGC.customStyle?.servicesTag ? JGC.customStyle.services : `${checkTailwindPrefixes('dark:text-gray-300')}`} ${checkTailwindPrefixes('w-full')}">
          <div class="${checkTailwindPrefixes('flex items-center space-x-2')}">
            <h4 class="${checkTailwindPrefixes('font-bold text-md')}">${value.title}</h4>
          </div>
          <div class="${JGC.customStyle?.panelText ? JGC.customStyle.panelText : `${checkTailwindPrefixes('dark:text-gray-300')}`} ${checkTailwindPrefixes(
        'text-xs md:text-md',
      )}">${value.description}</div>
          ${returnServices(key)}
        </div>
      </div>`;
      setTimeout(() => {
        document.getElementById(`toggle-${key}-right`) && document.getElementById(`toggle-${key}-right`).addEventListener('click', () => changeSettings(`${key}`));
        const getLabel = document.getElementById(`toggle-${key}`);
        if (getLabel) {
          getLabel.addEventListener('keyup', e => {
            if (e.keyCode === 13) {
              e.preventDefault();
              changeSettings(`${key}`);
            }
          });
        }
        if (JGC.config.layout == 'style8') changeToggle();
      }, 1);
    }
  });
  return arr;
}

/**
 * Load preferences
 */
export function loadPreferences(): void {
  setTimeout(() => {
    const findPreferenceButton = document.querySelectorAll('[data-jgc-preferences]');
    const preferenceButton = findPreferenceButton[0];
    if (preferenceButton) preferenceButton.addEventListener('click', () => managePreferences());
  }, 200);
}

/**
 * Return an array of services
 */
function makeArrForServices(value: string): string {
  return `<div class="${JGC.customStyle?.toggles ? JGC.customStyle.toggles : checkTailwindPrefixes('bg-green-200')}
  ${JGC.customStyle?.servicesTag ? JGC.customStyle.servicesTag : checkTailwindPrefixes('text-green-800')}
  ${checkTailwindPrefixes('px-2 py-0.5 rounded')}">${value}</div>`;
}

/**
 * Generate panel
 */
export function managePreferences(): void {
  document.body.classList.add(checkTailwindPrefixes('overflow-hidden'));
  closeBanner();
  const panelExists = document.querySelector('#preferenceDiv') != null;
  if (!panelExists) {
    const cookiePanel = document.createElement('div');
    cookiePanel.innerHTML = `
    <div id="preferenceDiv" style="background-color: rgba(0,0,0,0.6);z-index:9999 !important;" class="${checkTailwindPrefixes(
      'w-full min-h-screen top-0 fixed flex flex-col p-6 shadow-2xl items-center justify-center mx-auto transition duration-700 ease-in-out',
    )} ${JGC.panelHeader ? '' : null} ">
        ${JGC.panelHeader ? `<div id="jgc-custom-header" class="${checkTailwindPrefixes('w-full')}"></div>` : ''}
          <div class="${
            JGC.panel?.bgColor
              ? JGC.panel.bgColor
              : `${JGC.customStyle?.preferenceDiv ? JGC.customStyle.preferenceDiv : checkTailwindPrefixes('bg-white dark:bg-gray-800 max-w-3xl w-full')}`
          } ${JGC.panel?.padding == false ? '' : `${checkTailwindPrefixes('p-2')}`}">
            <div class="${JGC.customStyle?.panelHeader ? JGC.customStyle.panelHeader : `${checkTailwindPrefixes('md:flex justify-between px-4 py-4')}`}">
              <h2 class="${JGC.customStyle?.panelTitle ? JGC.customStyle.panelTitle : checkTailwindPrefixes('dark:text-gray-300 leading-snug text-xl font-bold m-0 p-0')}">
                ${JGC.text?.panelTitle ? JGC.text.panelTitle : ''}
              </h2>
              <div class="${checkTailwindPrefixes('md:space-x-2 md:mt-0 mt-4 flex space-y-2 md:space-y-0 flex-col md:flex-row')}">
                <button role="button" id="closePreferencePanel" type="button" class="${
                  JGC.customStyle?.saveButton
                    ? JGC.customStyle.saveButton
                    : `${checkTailwindPrefixes(
                        'px-3 py-1 uppercase font-bold tracking-wide text-xs z-index-10 relative rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer text-green-600 ring-1 ring-green-600',
                      )}`
                } ">
                  ${JGC.text?.saveButton ? JGC.text.saveButton : JGC.locale.saveAndContinue}
                </button>
                <button role="button" id="closePreferencePanelAcceptAll" type="button" class="${
                  JGC.customStyle?.saveAllButton
                    ? JGC.customStyle.saveAllButton
                    : `${checkTailwindPrefixes(
                        'px-3 py-1 uppercase font-bold tracking-wide text-xs z-index-10 relative rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer text-green-600 ring-1 ring-green-600',
                      )}`
                }  ">
                  ${JGC.text?.saveAllButton ? JGC.text.saveAllButton : JGC.locale.saveAndContinueAcceptAll}
                </button>
              </div>
            </div>
            <div>
              <div style="overflow-y: scroll; -webkit-overflow-scrolling: touch; max-height: calc(100vh - 400px);" class="${
                JGC.panel && JGC.panel.stripes ? `${JGC.panel.stripes.odd} ${JGC.panel.stripes.even}` : checkTailwindPrefixes('space-y-4 overflow-y-auto')
              } ${checkTailwindPrefixes('text-sm py-4')}">
                ${generateOptions()}
              </div>
            </div>
          </div>
          ${JGC.panelFooter ? `<div id="jgc-custom-footer" class="${checkTailwindPrefixes('w-full')}"></div>` : ''}
        </div>
    </div>
    `;
    document.body.appendChild(cookiePanel);
    if (JGC.panelHeader) document.getElementById('jgc-custom-header').innerHTML = JGC.panelHeader;
    if (JGC.panelFooter) document.getElementById('jgc-custom-footer').innerHTML = JGC.panelFooter;
    document.getElementById('closePreferencePanel').addEventListener('click', () => closePreferencePanel());
    document.getElementById('closePreferencePanelAcceptAll').addEventListener('click', () => closePreferencePanelAndSaveAll());
  } else {
    document.querySelector('#preferenceDiv').classList.remove(checkTailwindPrefixes('hidden'));
  }
  changeToggle();
}

/**
 *  Add the click event to fire the settings panel
 */
export function managePreferencesLinkListener(): void {
  refreshLocalStorage();
  document.getElementById('openPanel').addEventListener('click', () => managePreferences());
}

/**
 * Fire the settings panel
 */
export function managePreferencesLink(colors: string): string {
  const createButton = document.createElement('div');
  createButton.innerHTML = `
  <button id="openPanel" style=${JGC.customStyle?.preferencesText ? '' : 'font-size:0.6rem'} ;" class="${
    colors ? colors : `${JGC.customStyle?.preferencesText ? JGC.customStyle.preferencesText : checkTailwindPrefixes('font-bold uppercase dark:text-white')}`
  }">
    ${JGC.text.preferencesText ?? 'Manage and choose cookies'}
  </button>`;

  return createButton.innerHTML;
}

/**
 * Open panel
 */
export function openPanel(): void {
  if (getCookie('JgcPreferences').refresh == null && JGC.panel?.open) {
    if (JGC.config.layout == 'style8') {
      // Style8 is a bit particular...
      document.getElementById('bannerContent').remove();
      setTimeout(() => {
        managePreferences();
      }, 200);
    } else {
      managePreferences();
    }
  }
}

/**
 * Return services
 */
function returnServices(service: string): string {
  let arr = '';
  let check = undefined;

  document.querySelectorAll(`[data-jgc-tag="${service}"]`)?.forEach(element => {
    const getService = element.getAttribute('data-jgc-service') ? (element.getAttribute('data-jgc-service') as any).escape() : null;
    if (getService) {
      if (element.hasAttribute('data-jgc-remove')) {
        check = true;
      }
      arr += makeArrForServices(getService);
    }
  });

  const checkPreferences = getCookie('JgcPreferences');
  if (!check && checkPreferences.servicesRemoved?.length > 0 && !checkPreferences.duration) {
    checkPreferences.servicesRemoved.forEach(serviceRemoved => {
      if (serviceRemoved.tag == service) {
        arr += makeArrForServices(serviceRemoved.service);
      }
    });
  }

  if (JGC.auto) {
    Object.values(JGC.autoCategories).forEach(element => {
      if (service == element[1]) {
        arr += makeArrForServices(element[0]);
      }
    });
  }

  if (JGC.activate) {
    Object.entries(JGC.activate).forEach(element => {
      if (element[1].dataJgcService && service == element[1].dataJgcTag) {
        arr += makeArrForServices(element[1].dataJgcService);
      }
    });
  }

  return `<div class="${arr.length > 0 ? checkTailwindPrefixes('mt-2 border-t') : ''}">
    ${arr.length > 0 ? `<h4 class="${checkTailwindPrefixes('text-xs mt-1')} ${JGC.customStyle?.servicesText ?? ''}">${JGC.text.servicesTag}</h4>` : ''}
    <div class="${checkTailwindPrefixes('flex space-x-1 mt-2 text-xs font-semibold')}">${arr}</div>
    </div>`;
}

/**
 * Grab the custom tags and write an item to local storage
 */
export function setPreferences(): void {
  const preferences: GetCustomCookies = {};

  Object.keys(JGC.getCustomCookies).forEach(key => {
    preferences[key] = true;
  });
  saveCookie({ ...getCookie('JgcPreferences'), preferences });
}
