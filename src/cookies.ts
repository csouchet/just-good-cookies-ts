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

export type GetCustomCookies = { [key: string]: boolean };

interface Cookie {
  refresh?: boolean;
  remove?: boolean | number;
  darkBackground?: boolean;
  duration?: { expiry: string; value: string };
  preferences?: GetCustomCookies;
  id?: string;
  servicesRemoved?: {
    service: string;
    tag: string;
  }[];
  enable?: string[];
}

export type CookieType = 'JgcPreferences';

/*
 * Check the expiration date of the cookie
 */
export function checkCookieExpiration(value?: string): void {
  const cookie = getCookie('JgcPreferences');
  const date = new Date();
  date.setTime(date.getTime() + JGC.cookieTimeout * 24 * 60 * 60 * 1000);

  if (!cookie.duration) {
    saveCookie({ ...cookie, duration: { value, expiry: date.toString() }, id: Date.now() + Math.random().toString(16).slice(2) });
  } else if (new Date().setHours(0, 0, 0, 0) >= new Date(cookie.duration.expiry).setHours(0, 0, 0, 0)) {
    delete cookie.duration;
    saveCookie({ ...cookie, duration: { value: '1', expiry: date.toString() } });
    showBanner();
  }
}

/**
 * Get cookie
 */
export function getCookie(name: CookieType): Cookie {
  const cookie: Cookie = {};
  document.cookie.split(';').forEach(function (el) {
    const [k, v] = el.split('=');
    cookie[k.trim()] = v;
  });
  return cookie[name] ? JSON.parse(cookie[name]) : null;
}

/**
 * Get cookie preferences (useful for the callbacks from the frontend)
 */
export function getCookieId(name: CookieType): void {
  const cookie: Cookie = {};
  document.cookie.split(';').forEach(function (el) {
    const [k, v] = el.split('=');
    cookie[k.trim()] = v;
  });
  return cookie[name] ? JSON.parse(cookie[name]).id : null;
}

/**
 * Get cookie (useful for a callback from the frontend)
 */
export function getCookiePreferences(name: CookieType): void {
  const cookie: Cookie = {};
  document.cookie.split(';').forEach(function (el) {
    const [k, v] = el.split('=');
    cookie[k.trim()] = v;
  });
  return cookie[name] ? JSON.parse(cookie[name]).preferences : null;
}

/**
 * Refresh the local storage
 */
export function refreshLocalStorage(): void {
  const checkPreferences = getCookie('JgcPreferences');
  localStorage.setItem('JgcPreferences', JSON.stringify(checkPreferences.preferences));
}

/**
 * Save cookie
 */
export function saveCookie(saveObj: Cookie): void {
  const checkPreferences = getCookie('JgcPreferences');
  const cookieExpires = checkPreferences?.duration ? `expires=${checkPreferences.duration.expiry}` : '';
  document.cookie = `JgcPreferences=${JSON.stringify(saveObj)};path=/;SameSite=Strict;${cookieExpires}`;
}

/**
 * Save cookie categories
 */
export function saveCookiesPreferences(): void {
  const arr: string[] = [];
  JGC.activate &&
    Object.values(JGC.activate).forEach(value => {
      arr.push(value.dataJgcTag);
    });
  Object.keys(JGC.getCustomCookies).forEach(key => {
    arr.push(key);
  });
  saveCookie({ ...getCookie('JgcPreferences'), enable: arr });
}
