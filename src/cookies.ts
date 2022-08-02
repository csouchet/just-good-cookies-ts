/**
 * Copyright 2022 Céline Souchet
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 *
 * This project is a fork of the original just-good-cookies project of Francesco Mugnai.
 */
import JGC from './justgoodcookies';
import { showBanner } from './banner';

/*
 * Check the expiration date of the cookie
 */
export function checkCookieExpiration(val: any) {
  const checkPreference = getCookie('JgcPreferences');
  const cookieDuration = JGC.cookieTimeout * 24 * 60 * 60 * 1000;
  let saveObj = {};
  const date = new Date();
  date.setTime(date.getTime() + cookieDuration);
  const item = { value: val, expiry: date.toString() };
  if (!checkPreference['duration']) {
    const getPreferences = getCookie('JgcPreferences');
    const uniqueId = Date.now() + Math.random().toString(16).slice(2);
    saveObj = { ...getPreferences, duration: item, id: uniqueId };
    saveCookie(saveObj);
  } else {
    const now = new Date();
    const storedData = new Date(checkPreference['duration']['expiry']);
    if (now.setHours(0, 0, 0, 0) >= storedData.setHours(0, 0, 0, 0)) {
      const getPreferences = getCookie('JgcPreferences');
      delete getPreferences.duration;
      const item = { value: '1', expiry: date.toString() };
      saveObj = { ...getPreferences, duration: item };
      saveCookie(saveObj);
      showBanner();
    }
  }
}

/**
 * Get cookie
 */
export function getCookie(name: any) {
  const cookie = {};
  document.cookie.split(';').forEach(function (el) {
    const [k, v] = el.split('=');
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    cookie[k.trim()] = v;
  });
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (cookie[name]) {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return JSON.parse(cookie[name]);
  } else {
    return null;
  }
}

/**
 * Get cookie preferences (useful for the callbacks from the frontend)
 */
export function getCookieId(name: any) {
  const cookie = {};
  document.cookie.split(';').forEach(function (el) {
    const [k, v] = el.split('=');
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    cookie[k.trim()] = v;
  });
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (cookie[name]) {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const cookieName = JSON.parse(cookie[name]);
    return cookieName['id'];
  } else {
    return null;
  }
}

/**
 * Get cookie (useful for a callback from the frontend)
 */
export function getCookiePreferences(name: any) {
  const cookie = {};
  document.cookie.split(';').forEach(function (el) {
    const [k, v] = el.split('=');
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    cookie[k.trim()] = v;
  });
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (cookie[name]) {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    const cookieName = JSON.parse(cookie[name]);
    return cookieName['preferences'];
  } else {
    return null;
  }
}

/**
 * Refresh the local storage
 */
export function refreshLocalStorage() {
  const checkPreferences = getCookie('JgcPreferences');
  const saveObj = { ...checkPreferences['preferences'] };
  localStorage.setItem('JgcPreferences', JSON.stringify(saveObj));
}

/**
 * Save cookie
 */
export function saveCookie(saveObj: any) {
  const checkPreferences = getCookie('JgcPreferences');
  if (checkPreferences && checkPreferences['duration']) {
    const expiration = checkPreferences['duration'].expiry;
    document.cookie = `JgcPreferences=${JSON.stringify(saveObj)};expires= ${expiration};path=/;SameSite=Strict`;
  } else {
    document.cookie = `JgcPreferences=${JSON.stringify(saveObj)};path=/;SameSite=Strict;`;
  }
}

/**
 * Save cookie categories
 */
export function saveCookiesPreferences() {
  const arr = [];
  // @ts-expect-error TS(2550): Property 'entries' does not exist on type 'ObjectC... Remove this comment to see the full error message
  if (JGC.activate) for (const [key, value] of Object.entries(JGC.activate)) arr.push(value.dataJgcTag);
  // @ts-expect-error TS(2550): Property 'entries' does not exist on type 'ObjectC... Remove this comment to see the full error message
  for (const [k, v] of Object.entries(JGC.getCustomCookies)) arr.push(k);
  const preferences = getCookie('JgcPreferences');
  const saveObj = { ...preferences, enable: arr };
  saveCookie(saveObj);
}
