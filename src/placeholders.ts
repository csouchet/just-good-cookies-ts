/**
 * Copyright 2022 Céline Souchet
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 *
 * This project is a fork of the original just-good-cookies project of Francesco Mugnai.
 */
import JGC from './justgoodcookies';
import { checkTailwindPrefix } from './utilities';
import { managePreferences } from './preferences';

/**
 * Make a placeholder over the blocked iframes
 */
export function generateIframeDivs(element: any) {
  const checkIfTextPlaceholderExist = element.getAttribute('data-jgc-placeholder-text') || JGC.placeholder?.text;
  const checkIfImgPlaceholderExist = element.getAttribute('data-jgc-placeholder-img') || JGC.placeholder?.image;
  if (element.tagName == 'IFRAME' && (checkIfTextPlaceholderExist || checkIfImgPlaceholderExist)) {
    const getIdElement = element.getAttribute('src') || element.getAttribute('data-jgc-src');
    const getTag = element.getAttribute('data-jgc-tag');
    const tag = document.createElement('div');
    if (checkIfImgPlaceholderExist) {
      tag.setAttribute('style', `background-image: url(${returnPlaceholderImg(element)})`);
    }
    tag.setAttribute('data-jgc-placeholder-id', getIdElement);
    if (getTag) {
      tag.setAttribute('data-jgc-placeholder-tag', getTag);
      tag.setAttribute('data-jgc-placeholder-height', element.getAttribute('height'));
    }
    tag.classList.add(checkTailwindPrefix('flex'));
    tag.classList.add(checkTailwindPrefix(`md:pt-0`));
    tag.classList.add(checkTailwindPrefix(`pt-[56.25%]`));
    tag.classList.add(checkTailwindPrefix(`md:w-[${returnIframeSize(element, 'width')}]`));
    tag.classList.add(checkTailwindPrefix(`md:h-[${returnIframeSize(element, 'height')}]`));
    tag.classList.add(checkTailwindPrefix('w-full'));
    tag.classList.add(checkTailwindPrefix('items-center'));
    tag.classList.add(checkTailwindPrefix('justify-center'));
    tag.classList.add(checkTailwindPrefix('bg-gray-100'));
    tag.classList.add(checkTailwindPrefix('cursor-pointer'));
    if (JGC.placeholder?.classes) {
      const classes = JGC.placeholder.classes;
      const splitWords = classes.split(/[ ,]+/);
      const array = [...splitWords];
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        tag.classList.add(element);
      }
    }
    if (checkIfTextPlaceholderExist) {
      const settingsHtml = checkIfTextPlaceholderExist ? checkIfTextPlaceholderExist : `${JGC.placeholder?.text ? JGC.placeholder.text : ''}`;
      tag.innerHTML = settingsHtml.escape();
    }
    tag.addEventListener('click', () => managePreferences());
    element.parentNode.insertBefore(tag, element);
    if (element.hasAttribute('data-jgc-src')) element.setAttribute('height', 0);
  }
}

/**
 * Remove hidden divs
 */
export function removeHiddenDivs(src: string):void  {
  const getDivsToRemove = document.querySelectorAll('[data-jgc-placeholder-tag]');
  if (getDivsToRemove.length > 0) {
    for (let i = 0; i < getDivsToRemove.length; i++) {
      const element = getDivsToRemove[i];
      if (element.getAttribute('data-jgc-placeholder-tag') == src) element.remove();
    }
  }
}

/**
 * Remove placeholders
 */
export function removePlaceholders() :void{
  const getElementsPlaceholder = document.querySelectorAll('[data-jgc-placeholder]');
  if (getElementsPlaceholder.length > 0) {
    for (let i = 0; i < getElementsPlaceholder.length; i++) {
      const element = getElementsPlaceholder[i];
      const getPlaceholder = element.querySelectorAll('[data-jgc-placeholder-tag]');
      const getOriginalIframe = element.querySelectorAll('[data-jgc-tag]');
      const getSrcToRemove = element.querySelectorAll('[data-jgc-src]');
      if (getOriginalIframe) {
        for (let i = 0; i < getOriginalIframe.length; i++) {
          const el = getOriginalIframe[i];
          if (getPlaceholder.length > 0) {
            const height = getPlaceholder[0].getAttribute('data-jgc-placeholder-height');
            el.setAttribute('height', `${height}px`);
          }
        }
      }
      if (getPlaceholder) {
        for (let i = 0; i < getPlaceholder.length; i++) {
          const el = getPlaceholder[i];
          const placeholderId = el.getAttribute('data-jgc-placeholder-id');
          const hiddenDiv = document.querySelectorAll(`[data-jgc-placeholder-tag="${placeholderId}"]`);
          hiddenDiv[0].remove();
          el.remove();
        }
      }
      const getSrc = getSrcToRemove[0]?.getAttribute('data-jgc-src') || element.getAttribute('data-jgc-placeholder-id');
      removeHiddenDivs(getSrc);
    }
  } else {
    document.body.querySelectorAll('[data-jgc-tag]').forEach(el => el.classList.remove(checkTailwindPrefix('h-0'), checkTailwindPrefix('w-0')));
  }
}

/**
 * Calculate the dimensions of an iFrame (in px, in percentage or from the style attribute).
 */
const returnIframeSize = (element: any, prop: any) => {
  const style = element.getAttribute('style');
  if (element.getAttribute(prop)) {
    const checkWidthPercentage = element.getAttribute(prop).indexOf('%') > -1;
    const checkWidthPx = element.getAttribute(prop).indexOf('px') > -1;
    if (checkWidthPercentage || checkWidthPx) {
      return element.getAttribute(prop);
    } else {
      return element.getAttribute(prop) + 'px';
    }
  } else if (style) {
    const getProps = style
      .replace(/\s/g, '')
      .replace(/^.*{([^}]+)}.*/, '$1')
      .match(/([^;]+)/g);
    let returnValue = '';
    getProps.forEach((element: any) => {
      if (element.includes(prop)) {
        returnValue = element.split(':').pop();
      }
    });
    return returnValue;
  }
};

/**
 * Shows an image as a placeholder, if it exists
 */
export function returnPlaceholderImg(element: any) {
  const checkIfImgPlaceholderExist = element.getAttribute('data-jgc-placeholder-img');
  if (checkIfImgPlaceholderExist?.length > 0 && checkIfImgPlaceholderExist != 'disable') {
    return checkIfImgPlaceholderExist;
  }
  if (JGC.placeholder?.image && !checkIfImgPlaceholderExist) {
    return JGC.placeholder.image;
  }
  if (checkIfImgPlaceholderExist && checkIfImgPlaceholderExist == 'disable') {
    return;
  }
}
