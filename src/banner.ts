/**
 * Copyright 2022 Céline Souchet
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 *
 * This project is a fork of the original just-good-cookies project of Francesco Mugnai.
 */
import JGC from './justgoodcookies';
import { checkTailwindPrefixes } from './utilities';
import { addEnterAction } from './utilities';
import { managePreferencesLinkListener } from './preferences';

/**
 * Close banner
 */
export function closeBanner() {
  const banner = document.getElementById('bannerContent');
  if (banner) {
    banner.classList.add(checkTailwindPrefixes('opacity-0'), checkTailwindPrefixes('pointer-events-none'));
    if (JGC.config.layout != 'style8') {
      // "style8" is a little special. I can not use animations here because the toggle switches repeat in 2 different areas.
      setTimeout(() => {
        banner.remove(); // I need this timeout for the fade out animation
      }, 700);
    } else {
      banner.remove();
    }
  }
}

/**
 * Close banner with button
 */
export function closeBannerWithButton() {
  JGC.bannerConfig.closeButtonAccept ? JGC.yesCookies() : JGC.noCookies();
}

/**
 * Make banner buttons
 */
export function generateButtons() {
  document.getElementById('yesCookies').addEventListener('click', () => JGC.yesCookies());
  addEnterAction('yesCookies');
  if (JGC.bannerConfig?.disableReject == false) {
    document.getElementById('noCookies').addEventListener('click', () => JGC.noCookies());
    addEnterAction('noCookies');
  }
  managePreferencesLinkListener();
}

/**
 * Animate banner
 */
export function makeBannerAnimation() {
  if (JGC.bannerConfig.animation) {
    const bannerDiv = document.getElementById('bannerContent');
    switch (JGC.bannerConfig?.position || 'bottom') {
      case 'top':
        if (bannerDiv) {
          if (JGC.config.layout == 'style7') {
            document.getElementById('jgc-close-button').classList.remove(checkTailwindPrefixes('-top-[8px]'));
            document.getElementById('jgc-close-button').classList.remove(checkTailwindPrefixes('rounded-tr-lg'));
            document.getElementById('jgc-close-button').classList.remove(checkTailwindPrefixes('rounded-tl-lg'));
            document.getElementById('jgc-close-button').classList.add(checkTailwindPrefixes('-bottom-[40px]'));
            document.getElementById('jgc-close-button').classList.add(checkTailwindPrefixes('rounded-br-lg'));
            document.getElementById('jgc-close-button').classList.add(checkTailwindPrefixes('rounded-bl-lg'));
          }
          bannerDiv.classList.add(checkTailwindPrefixes('-translate-y-full'));
          setTimeout(() => {
            bannerDiv.classList.remove(checkTailwindPrefixes('-translate-y-full'));
            bannerDiv.classList.add(checkTailwindPrefixes('translate-y-0'));
          }, 300);
          break;
        }
      case 'bottom':
        if (bannerDiv) {
          bannerDiv.classList.add(checkTailwindPrefixes('translate-y-full'));
          setTimeout(() => {
            // bannerDiv.classList.add(checkTailwindPrefix('mb-4'))
            bannerDiv.classList.remove(checkTailwindPrefixes('translate-y-full'));
          }, 300);
        }
        break;
      default:
        break;
    }
  }
}

/**
 * Show banner
 */
export function showBanner() {
  return (JGC.banner.style.display = '');
}
