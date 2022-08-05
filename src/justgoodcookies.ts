/**
 * Copyright 2022 Céline Souchet
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 *
 * This project is a fork of the original just-good-cookies project of Francesco Mugnai.
 */

import { googleTagManager, checkActivations } from './activate';
import { autoMode, generatePreferenceStorage, checkCookiesAutoMode } from './autoMode';
import { showBanner, closeBanner } from './banner';
import type { CookieType, Preferences } from './cookies';
import { getCookie, getCookieId, getCookiePreferences, saveCookie, checkCookieExpiration, saveCookiesPreferences } from './cookies';
import type { Locale } from './locales';
import { locales } from './locales';
import { activateToggledCookies, hideScripts, removeScript, removeDivsOfUserAcceptedIframes, checkGoogleAnalytics } from './scripts';
import { loadBannerLayout } from './styles';
import { removePlaceholders } from './placeholders';
import { closePreferencePanel, closePreferencePanelAndSaveAll, setPreferences, loadPreferences, openPanel } from './preferences';
import { isString, checkTailwindPrefixes, checkDarkMode, checkBackground, loadText } from './utilities';

export type Activate = {
  GoogleAnalytics: { dataJgcTag: string; dataJgcService: string; id?: string; anonymized?: boolean; ad_storage?: boolean; analytics_storage?: boolean };
  FacebookPixel: { dataJgcTag?: string; dataJgcService?: string };
  GoogleTagManager: { dataJgcTag: string; dataJgcService: string; variables: string[][]; event_name: string[]; container_id: string };
};

type Text = {
  acceptSelectedText: string;
  acceptText: string;
  bannerLinkLabel: string;
  descriptionText: string;
  panelTitle: string;
  preferencesText: string;
  rejectText: string;
  saveButton: string;
  saveAllButton: string;
  servicesTag: string;
};
type BannerMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full' | 'min' | 'max';
type Placeholder = { text: string; image: string; classes: string };
type Panel = {
  stripes?: {
    even: string;
    odd: string;
  };
  padding: boolean;
  bgColor: null;
  open: boolean;
};
type Banner = {
  animation: boolean;
  backgroundColor: string;
  backgroundDark: boolean;
  backgroundImage: string;
  closeButton: boolean;
  closeButtonAccept: boolean;
  disableReject: boolean;
  innerBackgroundImage: string;
  icon: string;
  iconDark: boolean;
  logo: string;
  logoClasses: string;
  maxWidth: BannerMaxWidth;
  onAccept: () => void;
  onReject: () => void;
  position: string;
  shortText: string;
  title: string;
};
type Style = {
  services: string;
  accept: string;
  bannerText: string;
  bannerTitle: string;
  closeButton: () => void;
  toggles: string;
  lockIcon: string;
  panelHeader: string;
  panelTitle: string;
  panelText: string;
  preferenceDiv: string;
  preferencesText: string;
  privacyLink: string;
  reject: string;
  saveButton: string;
  stripes: string;
  servicesTag: string;
  servicesText: string;
  saveAllButton: string;
};

interface Data {
  activate: Activate;
  panel: Panel;
  cookies: Preferences;
  style: Style;
  banner: Banner;
  privacyLink: string;
  text: Text;
  cookieDuration: number;
  layout: string;
  tailwindPrefix: string;
  dark: boolean;
  placeholder: Placeholder;
  locale: 'en' | 'fr' | 'de' | 'es' | 'it';
  autoCategories: { [key: string]: string[] };
  autoMode: boolean;
}

type Locales = {
  de: {
    acceptSelectedText: string;
    bannerShortDescription: string;
    acceptText: string;
    servicesText: string;
    bannerLinkLabel: string;
    rejectText: string;
    preferencesText: string;
    bannerLinkDescription: string;
    acceptShortText: string;
    saveAndContinueAcceptAll: string;
    panelTitle: string;
    acceptSelectedShortText: string;
    bannerDescription: string;
    saveAndContinue: string;
    rejectShortText: string;
  };
  en: {
    acceptSelectedText: string;
    bannerShortDescription: string;
    acceptText: string;
    servicesText: string;
    bannerLinkLabel: string;
    rejectText: string;
    preferencesText: string;
    bannerLinkDescription: string;
    acceptShortText: string;
    saveAndContinueAcceptAll: string;
    panelTitle: string;
    acceptSelectedShortText: string;
    bannerDescription: string;
    saveAndContinue: string;
    rejectShortText: string;
  };
  it: {
    acceptSelectedText: string;
    bannerShortDescription: string;
    acceptText: string;
    servicesText: string;
    bannerLinkLabel: string;
    rejectText: string;
    preferencesText: string;
    bannerLinkDescription: string;
    acceptShortText: string;
    saveAndContinueAcceptAll: string;
    panelTitle: string;
    acceptSelectedShortText: string;
    bannerDescription: string;
    saveAndContinue: string;
    rejectShortText: string;
  };
  fr: {
    acceptSelectedText: string;
    bannerShortDescription: string;
    acceptText: string;
    servicesText: string;
    bannerLinkLabel: string;
    rejectText: string;
    preferencesText: string;
    bannerLinkDescription: string;
    acceptShortText: string;
    saveAndContinueAcceptAll: string;
    panelTitle: string;
    acceptSelectedShortText: string;
    bannerDescription: string;
    saveAndContinue: string;
    rejectShortText: string;
  };
  es: {
    acceptSelectedText: string;
    bannerShortDescription: string;
    acceptText: string;
    servicesText: string;
    bannerLinkLabel: string;
    rejectText: string;
    preferencesText: string;
    bannerLinkDescription: string;
    acceptShortText: string;
    saveAndContinueAcceptAll: string;
    panelTitle: string;
    acceptSelectedShortText: string;
    bannerDescription: string;
    saveAndContinue: string;
    rejectShortText: string;
  };
};

class JustGoodCookies {
  acceptText: string;
  activate: Activate; // Custom Activations
  auto: boolean; // autoMode
  autoCategories: { [key: string]: string[] }; // Categories for autoMode
  banner: string; // Banner div
  bannerConfig?: Banner; // Banner config
  bannerLink: string; // Privacy policy link
  bannerText: string; // Custom banner text
  config: // General config
  {
    locale: keyof Locales;
    layout: string;
    privacyLink: string;
  };
  cookieTimeout: number; // Default cookie duration (360 days)
  customStyle: Style; // Banner style
  darkMode: boolean; // Force dark mode
  getCookieId: (name: CookieType) => void;
  getCookiePreferences: (name: CookieType) => void;
  getCustomCookies: Preferences; // Cookie preferences and tags
  locale: Locale; // Locale
  localeString: keyof Locales; // Lang string
  locales: Locales;
  onAccept: () => void; // Callback on "accept"
  onReject: () => void; // Callback on "reject"
  panel: Panel; // Preference panel
  panelFooter: string; // "Footer"
  panelHeader: string; // "Header"
  placeholder: Placeholder; // Placeholder
  positions: string; // Banner positions
  tailwindPrefix: string; // Tailwind Prefix
  text: Text; // Custom texts

  constructor() {
    this.bannerConfig = {
      animation: true,
      backgroundColor: checkTailwindPrefixes('bg-white dark:bg-gray-800'),
      backgroundDark: false,
      backgroundImage: null,
      closeButton: true,
      closeButtonAccept: false,
      disableReject: false,
      icon: null,
      iconDark: null,
      innerBackgroundImage: null,
      logo: undefined,
      logoClasses: undefined,
      maxWidth: undefined,
      onAccept: null,
      onReject: null,
      position: undefined,
      shortText: this.acceptText,
      title: 'Cookies',
    };
    this.cookieTimeout = 360;
    this.panel = { bgColor: null, open: false, padding: false };
    this.positions = '';
    this.tailwindPrefix = '';
    this.text = undefined;
    this.getCookieId = getCookieId;
    this.getCookiePreferences = getCookiePreferences;
  }

  /*
   *  Check the current status
   */
  checkCookies(): void {
    const preference = getCookie('JgcPreferences');
    if (preference.duration) {
      if (preference.duration.valid) {
        bannerContent.classList.add(checkTailwindPrefixes('hidden'));
        checkCookiesAutoMode(); // Check if we are running the autoMode
        removePlaceholders(); // Remove placeholders
        removeDivsOfUserAcceptedIframes(); // Remove hidden divs (if string) for accepted cookies
        checkCookieExpiration(); // Check if the cookie is expired
        checkActivations(); // Check if we need to activate some pre-built scripts
        checkGoogleAnalytics(); // Check Google Analytics
        activateToggledCookies(); // We enable cookies and manage them through the settings panel
        googleTagManager(); // Check if we need to turn on Google Tag Manager
        closeBanner(); // Close the banner
      } else {
        if (this.auto) {
          autoMode();
        }
        checkCookieExpiration(); // Check if cookie is expired
        hideScripts(); // Hide the scripts
      }
    } else {
      // The banner has not been accepted yet, let's turn off all scripts and show the banner
      if (this.auto) {
        autoMode();
      }
      hideScripts();
      showBanner();
    }
  }

  /*
   * Accepts cookies
   */
  yesCookies(): void {
    checkCookieExpiration('1');
    checkActivations();
    setPreferences();
    activateToggledCookies();
    closePreferencePanelAndSaveAll();
    const checkPreferences = getCookie('JgcPreferences');
    if (checkPreferences.remove > 0) {
      removeScript(true); // We need to remove them AND refresh the page
    } else {
      googleTagManager(); // Do not trigger Google Tag Manager twice
      removePlaceholders();
    }
    if (this.onAccept && typeof this.onAccept == 'function') this.onAccept();
    closeBanner();
    removeDivsOfUserAcceptedIframes();
    if (!this.bannerConfig.onAccept) window.location.reload();
    if (document.getElementById('preferenceDiv')) closePreferencePanel();
  }

  /*
   * Reject cookies
   */
  noCookies(): void {
    checkCookieExpiration('0');
    const getPreferences = getCookie('JgcPreferences');
    const saveObj = { ...getPreferences };
    saveCookie(saveObj);
    if (this.onReject && typeof this.onReject == 'function') this.onReject();
    closeBanner();
  }

  /**
   * Activate the JGC engine and all the main functions
   */
  init(data: Data = {} as Data): void {
    // Initialize the language
    if (data.locale) {
      this.locales = locales;
      this.locale = this.locales[data.locale] || this.locales.en;
      this.localeString = data.locale;
    }

    // Check if the autoMode is active or not
    if (data.autoMode) {
      if (!getCookie('JgcPreferences')) {
        document.querySelectorAll('iframe,script').forEach(element => element.classList.add(checkTailwindPrefixes('hidden')));
      }
      this.auto = true;
      data.autoCategories && (this.autoCategories = data.autoCategories);
    }

    // General config
    this.config = {
      locale: data.locale ? data.locale : 'en',
      layout: data.layout ?? 'style1',
      privacyLink: data.privacyLink ?? '',
    };

    // Cookie duration
    data.cookieDuration && (this.cookieTimeout = data.cookieDuration);

    // Tailwind Prefix
    data.tailwindPrefix && (this.tailwindPrefix = data.tailwindPrefix);

    // Automatic Dark Mode
    if (data.dark && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      const htmlClass = document.querySelector('html');
      htmlClass.classList.add(checkTailwindPrefixes('dark'));
      this.darkMode = true;
    }

    // Custom texts
    const text = data.text;
    this.text = text
      ? text
      : {
          ...this.locale,
          descriptionText: null,
          saveButton: this.locale.saveAndContinue,
          saveAllButton: this.locale.saveAndContinueAcceptAll,
          servicesTag: this.locale.servicesText,
        };

    // Banner config & style
    if (data.banner) {
      this.bannerConfig = {
        ...data.banner,
        shortText: this.locale.acceptShortText,
      };
      this.onAccept = data.banner.onAccept;
      this.onReject = data.banner.onReject;
    }

    // Custom text placeholder
    data.placeholder && (this.placeholder = data.placeholder);

    // Preference Panel
    data.panel && (this.panel = data.panel);

    // Banner style
    this.customStyle = data.style;

    // Cookie Categories
    data.cookies && (this.getCustomCookies = data.cookies);

    // Activations
    data.activate && (this.activate = data.activate);

    // Let's start the engine
    if (document.readyState == 'complete' || document.readyState == 'loading') {
      checkDarkMode(); // Check Dark Mode
      loadText(); // Check if there is a custom text for the banner
      generatePreferenceStorage(); // Create the default user settings
      checkBackground(); // Check if we need to add a dark overlay
      loadPreferences(); // Make the preference button clickable
      saveCookiesPreferences(); // Save cookies
      loadBannerLayout(this.config.layout); // Load the banner
      openPanel(); // Check whether the preferences panel should be visible or not
      this.checkCookies(); // Check cookies
    }
  }
}

export default new JustGoodCookies();
