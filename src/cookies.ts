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

interface Cookie {
  remove: boolean;
  darkBackground: boolean;
  duration: { expiry: string; value: string };
  preferences: any;
  id?: string;
}

type CookieType = 'JgcPreferences';

/*
 * Check the expiration date of the cookie
 */
export function checkCookieExpiration(val: string): void {
  const name: CookieType = 'JgcPreferences';
  const checkPreference = getCookie(name);
  const cookieDuration = JGC.cookieTimeout * 24 * 60 * 60 * 1000;
  const date = new Date();
  date.setTime(date.getTime() + cookieDuration);
  if (!checkPreference.duration) {
    const getPreferences = getCookie(name);
    const uniqueId = Date.now() + Math.random().toString(16).slice(2);
    const duration = { value: val, expiry: date.toString() };
    saveCookie({ ...getPreferences, duration, id: uniqueId });
  } else {
    const now = new Date();
    const storedData = new Date(checkPreference.duration.expiry);
    if (now.setHours(0, 0, 0, 0) >= storedData.setHours(0, 0, 0, 0)) {
      const getPreferences = getCookie(name);
      delete getPreferences.duration;
      const duration = { value: '1', expiry: date.toString() };
      saveCookie({ ...getPreferences, duration });
      showBanner();
    }
  }
}

/**
 * Get cookie
 */
export function getCookie(name: CookieType): Cookie {
  const cookie = {};
  document.cookie.split(';').forEach(function (el) {
    const [k, v] = el.split('=');
    cookie[k.trim()] = v;
  });
  if (cookie[name]) {
    return JSON.parse(cookie[name]);
  } else {
    return null;
  }
}

/**
 * Get cookie preferences (useful for the callbacks from the frontend)
 */
export function getCookieId(name: CookieType): void {
  const cookie = {};
  document.cookie.split(';').forEach(function (el) {
    const [k, v] = el.split('=');
    cookie[k.trim()] = v;
  });
  if (cookie[name]) {
    const cookieName = JSON.parse(cookie[name]);
    return cookieName.id;
  } else {
    return null;
  }
}

/**
 * Get cookie (useful for a callback from the frontend)
 */
export function getCookiePreferences(name: CookieType): void {
  const cookie = {};
  document.cookie.split(';').forEach(function (el) {
    const [k, v] = el.split('=');
    cookie[k.trim()] = v;
  });
  if (cookie[name]) {
    const cookie = JSON.parse(cookie[name]);
    return cookie.preferences;
  } else {
    return null;
  }
}

/**
 * Refresh the local storage
 */
export function refreshLocalStorage(): void {
  const checkPreferences = getCookie('JgcPreferences');
  const saveObj = { ...checkPreferences.preferences };
  localStorage.setItem('JgcPreferences', JSON.stringify(saveObj));
}

/**
 * Save cookie
 */
export function saveCookie(saveObj: Cookie): void {
  const checkPreferences = getCookie('JgcPreferences');
  if (checkPreferences && checkPreferences.duration) {
    const expiration = checkPreferences.duration.expiry;
    document.cookie = `JgcPreferences=${JSON.stringify(saveObj)};expires= ${expiration};path=/;SameSite=Strict`;
  } else {
    document.cookie = `JgcPreferences=${JSON.stringify(saveObj)};path=/;SameSite=Strict;`;
  }
}

/**
 * Save cookie categories
 */
export function saveCookiesPreferences(): void {
  const arr = [];
  if (JGC.activate) for (const [key, value] of Object.entries(JGC.activate)) arr.push(value.dataJgcTag);
  for (const [k, v] of Object.entries(JGC.getCustomCookies)) arr.push(k);
  const preferences = getCookie('JgcPreferences');
  const saveObj = { ...preferences, enable: arr };
  saveCookie(saveObj);
}
