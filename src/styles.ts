/**
 * Copyright 2022 Céline Souchet
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 *
 * This project is a fork of the original just-good-cookies project of Francesco Mugnai.
 */
import JGC from './justgoodcookies';
import { addEnterAction, getMaxWidth, checkTailwindPrefixes, returnLogo, returnIcon } from './utilities';
import { getCookie } from './cookies';
import { closeBannerWithButton, makeBannerAnimation, generateButtons } from './banner';
import { managePreferencesLink, managePreferencesLinkListener } from './preferences';

/**
 * Load banner layouts
 */
export function loadBannerLayout(style: any) {
  // "Yes" and "No" buttons
  const yesCookies = JGC.customStyle?.accept
    ? JGC.customStyle.accept
    : checkTailwindPrefixes(
        'text-green-800 dark:text-green-300 bg-green-50 hover:bg-green-100 transition-all duration-300 dark:bg-green-900 ring-1 ring-green-200 px-2 py-0.5 text-xs uppercase font-bold items-center rounded my-2 border-none',
      );
  const noCookies = JGC.customStyle?.reject
    ? JGC.customStyle.reject
    : checkTailwindPrefixes(
        'text-red-800 dark:text-red-300 bg-red-50 hover:bg-red-100 transition-all duration-300 dark:bg-red-900 ring-red-200 ring-1 px-2 py-0.5 text-xs uppercase font-bold items-center rounded my-2 border-none',
      );
  const yesCookies2 = JGC.customStyle?.accept
    ? JGC.customStyle.accept
    : checkTailwindPrefixes(
        'text-green-600 bg-transparent ring-green-400 ring-2 px-3 leading-6 text-xs text-center font-medium uppercase transition transition-all duration-300  hover:bg-green-100 focus:shadow-2xl rounded-full border-none',
      );
  const noCookies2 = JGC.customStyle?.reject
    ? JGC.customStyle.reject
    : checkTailwindPrefixes(
        'text-red-600 bg-transparent ring-red-600 ring-2 px-3 leading-6 text-xs text-center font-medium uppercase transition transition-all duration-300  hover:bg-red-100 focus:shadow-2xl rounded-full border-none',
      );
  const yesCookies3 = JGC.customStyle?.accept
    ? JGC.customStyle.accept
    : checkTailwindPrefixes(
        'text-green-600 bg-transparent transition transition-all duration-300 ring-green-400 ring-2 px-3 py-2 leading-tight text-xs text-center font-medium uppercase transition hover:bg-green-100 focus:shadow-2xl rounded-full border-none',
      );
  const noCookies3 = JGC.customStyle?.reject
    ? JGC.customStyle.reject
    : checkTailwindPrefixes(
        'text-red-600 bg-transparent transition transition-all duration-300 ring-red-600 ring-2 px-3 py-2 leading-tight text-xs text-center font-medium uppercase transition hover:bg-red-100 focus:shadow-2xl rounded-full border-none',
      );
  const yesCookies4 = JGC.customStyle?.accept
    ? JGC.customStyle.accept
    : checkTailwindPrefixes(
        'text-gray-500 dark:text-green-300 px-3 leading-6 text-xs text-center font-bold uppercase transition focus:shadow-2xl tracking-widest rounded-full border-none',
      );
  const noCookies4 = JGC.customStyle?.reject
    ? JGC.customStyle.reject
    : checkTailwindPrefixes(
        'text-gray-500  dark:text-red-300 px-3 leading-6 text-xs text-center font-bold uppercase transition focus:shadow-2xl tracking-widest rounded-full border-none',
      );
  const yesCookies5 = JGC.customStyle?.accept
    ? JGC.customStyle.accept
    : checkTailwindPrefixes('text-white dark:text-green-400 px-5 text-sm text-center font-bold uppercase transition focus:shadow-2xl tracking-wide rounded-full border-none');
  const noCookies5 = JGC.customStyle?.reject
    ? JGC.customStyle.reject
    : checkTailwindPrefixes(
        'text-red-600 dark:text-red-400 px-5 leading-6 text-sm text-center font-bold uppercase transition focus:shadow-2xl tracking-wide rounded-full border-none',
      );
  const yesCookies6 = JGC.customStyle?.accept
    ? JGC.customStyle.accept
    : checkTailwindPrefixes(
        'text-white dark:text-gray-400 px-12 py-2 text-sm text-center font-semibold uppercase transition focus:shadow-2xl tracking-widest rounded-full border-none',
      );
  const yesCookies7 = JGC.customStyle?.reject
    ? JGC.customStyle.reject
    : checkTailwindPrefixes('text-gray-600 dark:text-white rounded-full text-xs font-semibold focus:shadow-2xl border-none');
  const noCookies7 = JGC.customStyle?.accept
    ? JGC.customStyle.accept
    : checkTailwindPrefixes('text-gray-600 dark:text-white text-xs leading-6 font-bold focus:shadow-2xl rounded-full border-none');
  const yesCookies8 = JGC.customStyle?.reject
    ? JGC.customStyle.reject
    : checkTailwindPrefixes(
        'text-gray-600 group-hover:text-green-600 dark:bg-green-900 py-2 dark:text-green-400 px-5 text-sm text-center font-semibold transition focus:shadow-2xl tracking-wide rounded-full border-none',
      );
  const selectedCookies8 = JGC.customStyle?.accept
    ? JGC.customStyle.accept
    : checkTailwindPrefixes(
        'text-orange-600 group-hover:text-orange-600 dark:text-orange-400 dark:bg-orange-900 py-2 px-5 text-sm text-center font-semibold transition focus:shadow-2xl tracking-wide rounded-full border-none',
      );
  const noCookies8 = JGC.customStyle?.accept
    ? JGC.customStyle.accept
    : checkTailwindPrefixes(
        'text-red-600 group-hover:text-red-600 dark:bg-red-900 py-2 dark:text-red-400 px-5 leading-6 text-sm text-center font-semibold transition focus:shadow-2xl tracking-wide rounded-full border-none',
      );
  const yesCookies9 = JGC.customStyle?.reject
    ? JGC.customStyle.reject
    : checkTailwindPrefixes(
        'text-white bg-black dark:text-gray-100 px-6 py-1 text-xs text-center font-semibold uppercase transition focus:shadow-2xl tracking-widest rounded-full border-none',
      );
  const noCookies9 = JGC.customStyle?.accept
    ? JGC.customStyle.accept
    : checkTailwindPrefixes(
        'text-red-900 ring-1 ring-red-900 dark:text-red-700 dark:ring-red-700 px-6 py-1 text-xs text-center font-semibold uppercase transition focus:shadow-2xl tracking-widest rounded-full border-none',
      );

  switch (style) {
    case 'style1':
      JGC.positions = {
        top: checkTailwindPrefixes('justify-top items-start top-0'),
        center: checkTailwindPrefixes('mx-auto top-1/2 -translate-y-1/2'),
        bottom: checkTailwindPrefixes('justify-end items-center bottom-0'),
      };
      JGC.banner = document.createElement('div');
      JGC.banner.style.display = 'none';
      JGC.banner.innerHTML = `<div id="bannerContent" style="${
        JGC.bannerConfig.backgroundImage ? `background-size:cover; background-image:url(${JGC.bannerConfig.backgroundImage})` : ''
      }"
            class="
            ${JGC.positions[JGC.bannerConfig.position || 'bottom']}
            ${JGC.bannerConfig.backgroundColor}
            ${
              JGC.bannerConfig.backgroundImage
                ? `${JGC.bannerConfig.backgroundColor} ${checkTailwindPrefixes('p-2')}`
                : `${JGC.bannerConfig.innerBackgroundImage ? '' : checkTailwindPrefixes('p-6')}`
            }
            ${getMaxWidth('max-w-sm')}
            ${checkTailwindPrefixes('fixed shadow-2xl md:flex md:flex-col md:space-x-1 right-0 md:mr-[2%] transition duration-700 ease-in-out z-[99999] rounded')}">
            <div class="${checkTailwindPrefixes('space-y-2 flex flex-col')} ${
        JGC.bannerConfig.backgroundImage && !JGC.bannerConfig.innerBackgroundImage ? `${JGC.bannerConfig.backgroundColor ?? ''}  ${checkTailwindPrefixes('p-4')}` : ''
      }
              ${JGC.bannerConfig.innerBackgroundImage && !JGC.bannerConfig.backgroundImage ? checkTailwindPrefixes('pb-8') : ''}
              ${JGC.bannerConfig.innerBackgroundImage && JGC.bannerConfig.backgroundImage ? `${checkTailwindPrefixes('pb-8')} ${JGC.bannerConfig.backgroundColor ?? ''}` : ''}
              ">
              ${JGC.bannerConfig.innerBackgroundImage ? `<img class="${checkTailwindPrefixes('md:rounded-t')}" src="${JGC.bannerConfig.innerBackgroundImage}" />` : ''}
              ${returnLogo()}
              <div class="${checkTailwindPrefixes('flex w-full')}" >
                  <div class="${checkTailwindPrefixes('flex items-center space-x-1')} ${JGC.bannerConfig.innerBackgroundImage ? checkTailwindPrefixes('px-6') : ''}">
                    ${returnIcon()}
                    <h4 class="${JGC.customStyle?.bannerTitle ?? checkTailwindPrefixes('text-xl font-bold dark:text-white')}">${JGC.bannerConfig.title}</h4>
                  </div>
                  ${
                    JGC.bannerConfig.closeButton
                      ? `<button id="jgc-close-button" class="${JGC.bannerConfig.logo ? `${checkTailwindPrefixes('absolute top-2 right-4')}` : ``}   ${
                          JGC.customStyle?.closeButton ? `${JGC.customStyle.closeButton}` : `${checkTailwindPrefixes('dark:text-white text-xl ml-auto m-0 p-0 bg-transparent')}`
                        }">&times;</button>`
                      : ''
                  }
              </div>
              <div class="${JGC.customStyle?.bannerText ? JGC.customStyle.bannerText : checkTailwindPrefixes('dark:text-white')} ${
        JGC.bannerConfig.innerBackgroundImage ? checkTailwindPrefixes('px-6') : ''
      }">
                <div>${JGC.bannerText ? JGC.bannerText : `${JGC.text.descriptionText ? JGC.text.descriptionText : JGC.locale.bannerDescription}`}<br/></div>
                <div>${
                  JGC.bannerLink
                    ? JGC.bannerLink
                    : `${JGC.locale.bannerLinkDescription} <a class="${
                        JGC.customStyle?.privacyLink ?? `${checkTailwindPrefixes('dark:decoration-sky-500 dark:underline font-bold text-black dark:text-white')}`
                      }" target="_blank" href="${JGC.config.privacyLink}"> ${JGC.text?.bannerLinkLabel ? JGC.text.bannerLinkLabel : JGC.locale.bannerLinkLabel}</a>`
                }</div>
              </div>
              <div class="${checkTailwindPrefixes('mt-2 flex flex-col')} ${JGC.bannerConfig.innerBackgroundImage && checkTailwindPrefixes('px-6')}">
                <div class="${checkTailwindPrefixes('flex space-x-2')}">
                  <button role="button" tabindex="0" type="button" id="yesCookies" class="${yesCookies}">${
        JGC.bannerConfig.shortText ? JGC.locale.acceptShortText : JGC.text.acceptText
      }</button>
                  ${
                    JGC.bannerConfig?.disableReject == false
                      ? `<button role="button" tabindex="0" type="button" id="noCookies" class="${noCookies}">${
                          JGC.bannerConfig.shortText ? JGC.locale.rejectShortText : JGC.text.rejectText
                        }</button>`
                      : ''
                  }
                </div>
                <div>${
                  // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
                  managePreferencesLink()
                }</div>
              </div>
            </div>
      </div>`;
      document.body.appendChild(JGC.banner);
      makeBannerAnimation();
      if (JGC.bannerConfig.closeButton) document.getElementById('jgc-close-button').addEventListener('click', () => closeBannerWithButton());
      generateButtons();
      break;
    case 'style2':
      JGC.positions = {
        top: checkTailwindPrefixes('justify-top items-center top-0 mt-6'),
        center: checkTailwindPrefixes('mx-auto top-1/2 -translate-y-1/2'),
        bottom: checkTailwindPrefixes('justify-end items-center bottom-0'),
      };
      JGC.banner = document.createElement('div');
      JGC.banner.style.display = 'none';
      JGC.banner.innerHTML = `
      <div id="bannerContent"
      style="${JGC.bannerConfig.backgroundImage && `background-size:cover; background-image:url(${JGC.bannerConfig.backgroundImage})`}"
      class="${JGC.positions[JGC.bannerConfig.position || 'bottom']}
        ${JGC.bannerConfig.backgroundColor}
        ${JGC.bannerConfig.backgroundImage ? checkTailwindPrefixes('p-2') : checkTailwindPrefixes('p-6')}
        ${getMaxWidth('max-w-5xl')}
          ${checkTailwindPrefixes(
            'fixed mx-auto md:left-1/2 md:-translate-x-1/2 right-0 shadow-2xl md:space-x-1 md:mr-[2%] md:mb-[1.5%]  transition duration-700 ease-in-out z-[999] md:rounded-full',
          )}">
            <div class="${checkTailwindPrefixes('flex justify-center items-center flex-col relative')}
            ${JGC.bannerConfig.backgroundImage ? `${JGC.bannerConfig.backgroundColor} ${checkTailwindPrefixes('p-6')}` : checkTailwindPrefixes('p-4')}">
            ${returnLogo()}
            ${
              JGC.bannerConfig.closeButton
                ? `<button id="jgc-close-button" class="${JGC.customStyle?.closeButton ? JGC.customStyle.closeButton : checkTailwindPrefixes('text-white')} ${
                    JGC.customStyle?.closeButton ? JGC.customStyle.closeButton : checkTailwindPrefixes('bg-black dark:bg-white')
                  }
            ${checkTailwindPrefixes('rounded-full w-6 h-6 self-end absolute -top-5 right-20 transform -translate-y-4 dark:text-black dark:ring-2 dark:ring-gray-800 m-0 p-0')}">
            &times;</button>`
                : ''
            }
              <div class="${checkTailwindPrefixes('flex items-center space-x-2 mb-4 dark:text-white')}">
                ${returnIcon()}
                <h4 class="${checkTailwindPrefixes('text-xl font-bold')} ${JGC.customStyle?.bannerTitle ?? ''}">${JGC.bannerConfig.title}</h4>
              </div>
              <div class="${JGC.customStyle?.bannerText ? JGC.customStyle.bannerText : `${checkTailwindPrefixes('dark:text-gray-300')}`} ${checkTailwindPrefixes(
        'text-sm text-center',
      )}">
                <div>${JGC.bannerText ? JGC.bannerText : `${JGC.text.descriptionText ? JGC.text.descriptionText : JGC.locale.bannerDescription}`} <br/></div>
                <div>${
                  JGC.bannerLink ??
                  `<div>${JGC.locale.bannerLinkDescription} <a class="${checkTailwindPrefixes('font-bold')}" target="_blank" href="${JGC.config.privacyLink}"> ${
                    JGC.text?.bannerLinkLabel ? JGC.text.bannerLinkLabel : JGC.locale.bannerLinkLabel
                  }</a></div>`
                }  </div>
              </div>
              <div class="${checkTailwindPrefixes('flex justify-center space-x-2 mt-6')}">
                <button role="button" tabindex="0" type="button" id="yesCookies" class="${yesCookies2}">${
        JGC.bannerConfig.shortText ? JGC.locale.acceptShortText : JGC.text.acceptText
      }</button>
                <button role="button" tabindex="0" type="button" id="noCookies" class="${noCookies2}">${
        JGC.bannerConfig.shortText ? JGC.locale.rejectShortText : JGC.text.rejectText
      }</button>
              </div>
              <div class="${checkTailwindPrefixes('mt-2')}">${
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        managePreferencesLink()
      }</div>
            </div>
      </div>
      `;
      document.body.appendChild(JGC.banner);
      makeBannerAnimation();
      if (JGC.bannerConfig.closeButton) document.getElementById('jgc-close-button').addEventListener('click', () => closeBannerWithButton());
      generateButtons();
      break;
    case 'style3':
      JGC.positions = {
        top: checkTailwindPrefixes('justify-top items-center top-0 mt-6'),
        center: checkTailwindPrefixes('mx-auto top-1/2 -translate-y-1/2'),
        bottom: checkTailwindPrefixes('justify-end items-center bottom-0'),
      };
      JGC.banner = document.createElement('div');
      JGC.banner.style.display = 'none';
      JGC.banner.innerHTML = `
      <div id="bannerContent"
      style="${JGC.bannerConfig.backgroundImage && `background-size:cover; background-image:url(${JGC.bannerConfig.backgroundImage})`}"
      class="
      ${JGC.positions[JGC.bannerConfig.position || 'bottom']}
      ${JGC.bannerConfig.backgroundColor}

      ${JGC.bannerConfig.backgroundImage ? checkTailwindPrefixes('p-2') : checkTailwindPrefixes('p-6')}
      ${checkTailwindPrefixes('fixed shadow-2xl mx-auto md:left-1/2 md:-translate-x-1/2 md:mb-[1.5%]  transition duration-700 ease-in-out z-[999] md:rounded-full')}">
            <div class="${checkTailwindPrefixes('md:grid grid-cols-5 relative justify-between items-center md:space-x-4')}
            ${JGC.bannerConfig.backgroundImage ? `${JGC.bannerConfig.backgroundColor} ${checkTailwindPrefixes('p-6 rounded-full')}` : checkTailwindPrefixes('p-4')}">
              <div class="${JGC.customStyle?.bannerText ? JGC.customStyle.bannerText : `${checkTailwindPrefixes('dark:text-gray-300')}`}
                ${checkTailwindPrefixes('text-xs mt-2 md:mt-0 flex flex-col items-start px-2 col-span-3')}">
                ${returnLogo()}
                <div class="${checkTailwindPrefixes('flex items-center space-x-1 mb-1')}">
                  ${returnIcon()}
                  <h4 class="${checkTailwindPrefixes('text-xl font-bold leading-tight')} ${JGC.customStyle?.bannerTitle ?? ''}">${JGC.bannerConfig.title}</h4>
                </div>
                ${JGC.bannerText ? JGC.bannerText : `${JGC.text.descriptionText ? JGC.text.descriptionText : JGC.locale.bannerDescription}`} <br/>
                ${
                  JGC.bannerLink ??
                  `<div>${JGC.locale.bannerLinkDescription} <a class="${checkTailwindPrefixes('font-bold')}" target="_blank" href="${JGC.config.privacyLink}"> ${
                    JGC.text?.bannerLinkLabel ? JGC.text.bannerLinkLabel : JGC.locale.bannerLinkLabel
                  }</a></div>`
                }
              </div>
              <div class="${checkTailwindPrefixes('col-span-2 flex items-center justify-center')}">
                ${
                  JGC.bannerConfig.closeButton
                    ? `<button id="jgc-close-button" class="${JGC.customStyle?.customStyle ? JGC.customStyle.customStyle : checkTailwindPrefixes('text-white')}
                ${JGC.customStyle?.closeButton ? JGC.customStyle.closeButton : checkTailwindPrefixes('bg-black')}
                ${checkTailwindPrefixes('rounded-full w-6 h-6 self-end absolute -top-4 right-6 transform -translate-y-4 m-0 p-0')}">&times;</button>`
                    : ''
                }
              <div class="${checkTailwindPrefixes('flex flex-col mt-4 md:mt-0 ')}">
                <div class="${checkTailwindPrefixes('space-x-3 flex')}">
                  <button role="button" tabindex="0" type="button" id="yesCookies" class="${yesCookies3}">${
        JGC.bannerConfig.shortText ? JGC.bannerConfig.shortText : JGC.text.acceptText
      }</button>
                  <button role="button" tabindex="0" type="button" id="noCookies" class="${noCookies3}">${
        JGC.bannerConfig.shortText ? JGC.locale.rejectShortText : JGC.text.rejectText
      }</button>
                </div>
                <div class="${checkTailwindPrefixes('mt-2 flex justify-center')}">${
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        managePreferencesLink()
      }</div>
              </div>
              </div>
            </div>
      </div>
      `;
      document.body.appendChild(JGC.banner);
      makeBannerAnimation();
      if (JGC.bannerConfig.closeButton) document.getElementById('jgc-close-button').addEventListener('click', () => closeBannerWithButton());
      generateButtons();
      break;
    case 'style4':
      JGC.positions = {
        top: checkTailwindPrefixes('justify-top items-center p-6'),
        center: checkTailwindPrefixes('items-center justify-center'),
        bottom: checkTailwindPrefixes('justify-end items-center p-6'),
      };
      JGC.banner = document.createElement('div');
      JGC.banner.style.display = 'none';
      JGC.banner.innerHTML = `
        <div id="bannerContent"
        style="background-color: rgba(0,0,0,0.7);"
        class="${JGC.positions[JGC.bannerConfig.position || 'center']}
      ${checkTailwindPrefixes('w-full min-h-screen fixed flex flex-col shadow-2xl top-0 transition duration-700 ease-in-out z-[999]')}">
        ${
          JGC.bannerConfig.backgroundImage
            ? `
              <div class="${checkTailwindPrefixes('p-2')}" style="background-size:cover; background-image:url(${JGC.bannerConfig.backgroundImage})">`
            : ''
        }
              <div class="${JGC.bannerConfig.backgroundColor}  bg-gray-300
              ${getMaxWidth('max-w-xl')}
              ${checkTailwindPrefixes('relative  flex flex-col justify-between items-center')}">
                ${JGC.bannerConfig.innerBackgroundImage ? `<img class="${checkTailwindPrefixes('md:rounded-t')}" src="${JGC.bannerConfig.innerBackgroundImage}" />` : ''}
                <div class="${checkTailwindPrefixes('flex flex-col justify-start w-full px-6')} ${
        JGC.bannerConfig.innerBackgroundImage ? checkTailwindPrefixes('pb-6') : checkTailwindPrefixes('py-6')
      } ${checkTailwindPrefixes('space-x-1"')}>
                ${returnLogo()}
                ${
                  JGC.bannerConfig.closeButton
                    ? `<button id="jgc-close-button" class="${JGC.customStyle?.closeButton ? JGC.customStyle.closeButton : checkTailwindPrefixes('text-white')}
                ${JGC.customStyle?.closeButton ? JGC.customStyle.closeButton : checkTailwindPrefixes('bg-black')} ${checkTailwindPrefixes(
                        'rounded-full w-6 h-6 self-end absolute top-0 right-0 transform -translate-y-4 translate-x-2 m-0 p-0',
                      )}">&times;</button>`
                    : ''
                }
                  <div class="${checkTailwindPrefixes('flex space-x-2 items-center')}">
                  ${returnIcon()}
                  <h4 class="${JGC.customStyle?.bannerTitle ?? checkTailwindPrefixes('text-2xl font-bold dark:text-white')}">${JGC.bannerConfig.title}</h4>
                  </div>
                </div>
                <div class="${JGC.customStyle?.bannerText ? JGC.customStyle.bannerText : `${checkTailwindPrefixes('dark:text-gray-300')}`} ${checkTailwindPrefixes(
        'flex flex-col text-sm px-6 pb-6',
      )}">
                  ${JGC.bannerText ? JGC.bannerText : `${JGC.text.descriptionText ? JGC.text.descriptionText : JGC.locale.bannerDescription}`} <br/>
                  ${
                    JGC.bannerLink
                      ? JGC.bannerLink
                      : `${JGC.locale.bannerLinkDescription} <a class="${checkTailwindPrefixes('font-bold')}" target="_blank" href="${JGC.config.privacyLink}"> ${
                          JGC.text?.bannerLinkLabel ? JGC.text.bannerLinkLabel : JGC.locale.bannerLinkLabel
                        }</a>`
                  }
                </div>
                <div class="${checkTailwindPrefixes('grid grid-cols-2 bg-black w-full divide-x divide-gray-300 dark:divide-gray-700')}">
                <div class="${checkTailwindPrefixes('group')}">
                    <div class="${JGC.customStyle?.accept ? JGC.customStyle.accept : checkTailwindPrefixes('bg-gray-300 dark:bg-gray-800')}
                      ${checkTailwindPrefixes(
                        'py-4 flex items-center justify-center transition duration-500 group-hover:scale-110 relative hover:z-10',
                      )}" style="box-shadow: 0px 14px 20px 20px rgba(0, 0, 0, 10%);">
                      <button type="button" role="button" tabindex="0" id="yesCookies" class="${yesCookies4} group-hover:text-green-800 transition duration-500">
                        ${JGC.bannerConfig.shortText ? JGC.bannerConfig.shortText : JGC.text.acceptText}
                      </button>
                    </div>
                  </div>
                  <div class="${checkTailwindPrefixes('group')}">
                    <div class="${JGC.customStyle?.reject ? JGC.customStyle.reject : checkTailwindPrefixes('bg-gray-300 dark:bg-gray-800')}
                      ${checkTailwindPrefixes(
                        'py-4 flex items-center justify-center  transition duration-500 hover:scale-110 relative hover:z-10',
                      )}" style="box-shadow: 0px 14px 20px 5px rgb(0, 0, 0, 10%);">
                      <button role="button" tabindex="0" type="button" id="noCookies" class="${noCookies4} group-hover:text-red-800 transition duration-500">
                        ${JGC.bannerConfig.shortText ? JGC.locale.rejectShortText : JGC.text.rejectText}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="${checkTailwindPrefixes('bg-gradient-to-r from-gray-300 dark:from-gray-600 to-gray-400 dark:to-gray-800 w-full flex justify-center py-2')}">
                  ${managePreferencesLink(checkTailwindPrefixes('text-white'))}
                </div>
              </div>
              ${JGC.bannerConfig.backgroundImage ? `</div>` : ''}
        </div>
        `;
      document.body.appendChild(JGC.banner);
      if (JGC.bannerConfig.closeButton) document.getElementById('jgc-close-button').addEventListener('click', () => closeBannerWithButton());
      generateButtons();
      break;
    case 'style5':
      JGC.positions = {
        top: checkTailwindPrefixes('top-0'),
        center: checkTailwindPrefixes('mx-auto top-1/2 -translate-y-1/2'),
        bottom: checkTailwindPrefixes('bottom-0'),
      };
      JGC.banner = document.createElement('div');
      JGC.banner.style.display = 'none';
      JGC.banner.innerHTML = `<div style="${JGC.bannerConfig.backgroundImage && `background-size:cover; background-image:url(${JGC.bannerConfig.backgroundImage})`}"
        id="bannerContent" class="
        ${JGC.positions[JGC.bannerConfig.position || 'bottom']}
        ${JGC.bannerConfig.backgroundColor}
        ${
          JGC.bannerConfig.innerBackgroundImage
            ? `${checkTailwindPrefixes('grid grid-cols-5')}  ${JGC.bannerConfig.backgroundImage ? '' : checkTailwindPrefixes('gap-6')}`
            : checkTailwindPrefixes('flex flex-col')
        }
        ${JGC.bannerConfig.backgroundImage ? checkTailwindPrefixes('p-2') : checkTailwindPrefixes('px-6 items-start justify-center py-8')}
        ${checkTailwindPrefixes('sm:w-full md:w-full w-full fixed shadow-2xl  transition duration-700 ease-in-out dark:bg-gray-800 z-[999]')}">
        ${
          JGC.bannerConfig.closeButton
            ? `<button id="jgc-close-button" class="${JGC.customStyle?.closeButton ? JGC.customStyle.closeButton : checkTailwindPrefixes('text-black dark:text-white')}
        ${JGC.customStyle?.closeButton ? JGC.customStyle.closeButton : ''} ${checkTailwindPrefixes('rounded-full text-2xl self-end m-0 p-0 bg-transparent')}">&times;</button>`
            : ''
        }
        ${JGC.bannerConfig.innerBackgroundImage ? `<img class="${checkTailwindPrefixes('md:rounded-t col-span-1')}" src="${JGC.bannerConfig.innerBackgroundImage}" />` : ''}
            <div class="
            ${JGC.bannerConfig.backgroundImage ? `${JGC.bannerConfig.backgroundColor} ${checkTailwindPrefixes('w-full p-4')}` : ''}
            ${JGC.bannerConfig.innerBackgroundImage && checkTailwindPrefixes('col-span-4')}
            ${checkTailwindPrefixes('flex flex-col items-start space-y-3')}">
                <div>
                  <div class="${checkTailwindPrefixes('flex flex-col items-start space-x-1 w-full')}">
                      ${returnLogo()}
                    <div class="${checkTailwindPrefixes('flex space-x-2 items-center')}">
                      ${returnIcon()}
                      <h4 class="${JGC.customStyle?.bannerTitle ?? checkTailwindPrefixes('text-2xl font-semibold dark:text-white')}">${JGC.bannerConfig.title}</h4>
                    </div>
                  </div>
                  <div class="${JGC.customStyle?.bannerText ? JGC.customStyle.bannerText : `${checkTailwindPrefixes('dark:text-gray-300')}`}">
                    ${JGC.bannerText ? JGC.bannerText : `${JGC.text.descriptionText ? JGC.text.descriptionText : JGC.locale.bannerDescription}`}<br/>
                    ${
                      JGC.bannerLink
                        ? JGC.bannerLink
                        : `${JGC.locale.bannerLinkDescription}
                    <a class="${checkTailwindPrefixes('font-bold')}" target="_blank" href="${JGC.config.privacyLink}"> ${
                            JGC.text?.bannerLinkLabel ? JGC.text.bannerLinkLabel : JGC.locale.bannerLinkLabel
                          }</a>.`
                    }
                  </div>
                </div>
                <div class="${checkTailwindPrefixes('flex w-full space-x-2')}">
                  <div class="${JGC.customStyle?.accept ? JGC.customStyle.accept : checkTailwindPrefixes('bg-black dark:bg-gray-600')}
                    ${checkTailwindPrefixes('py-2 rounded-full flex items-center justify-center shadow-2xl')}">
                    <button type="button" role="button" tabindex="0" id="yesCookies" class="${yesCookies5}">
                      ${JGC.bannerConfig.shortText ? JGC.locale.acceptShortText : JGC.text.acceptText}
                    </button>
                  </div>
                  <div class="${JGC.customStyle?.reject ? JGC.customStyle.reject : checkTailwindPrefixes('dark:bg-gray-600')}
                  ${checkTailwindPrefixes('py-2 border dark:border-0 border-red-200 rounded-full flex items-center justify-center shadow-2xl')}">
                    <button role="button" tabindex="0" type="button" id="noCookies" class="${noCookies5}"> ${
        JGC.bannerConfig.shortText ? JGC.locale.rejectShortText : JGC.text.rejectText
      } </button>
                  </div>
                </div>
                ${
                  // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
                  managePreferencesLink()
                }
              </div>
        </div>
        `;
      document.body.appendChild(JGC.banner);
      makeBannerAnimation();
      if (JGC.bannerConfig.closeButton) document.getElementById('jgc-close-button').addEventListener('click', () => closeBannerWithButton());
      generateButtons();
      break;
    case 'style6':
      JGC.positions = {
        center: checkTailwindPrefixes('items-center justify-center'),
        bottom: checkTailwindPrefixes('justify-end items-center'),
        top: checkTailwindPrefixes('justify-top items-center'),
      };
      JGC.banner = document.createElement('div');
      JGC.banner.style.display = 'none';
      JGC.banner.innerHTML = `
      <div
      id="bannerContent" class="
      ${JGC.positions[JGC.bannerConfig.position ?? 'center']}
      ${JGC.bannerConfig.backgroundImage ? checkTailwindPrefixes('p-2') : checkTailwindPrefixes('p-6')}
    ${checkTailwindPrefixes('bg-black bg-opacity-70 w-full min-h-screen fixed flex flex-col top-0 shadow-2xl mx-auto transition duration-700 ease-in-out z-[999]')}">
      ${
        JGC.bannerConfig.backgroundImage
          ? `
            <div class="${checkTailwindPrefixes('p-2')} ${checkTailwindPrefixes('md:rounded-xl')}"
            style="background-size:cover; background-image:url(${JGC.bannerConfig.backgroundImage})">`
          : ''
      }
            ${
              JGC.bannerConfig.closeButton
                ? `<button id="jgc-close-button" class="${checkTailwindPrefixes('rounded-full w-6 h-6 self-end absolute top-4 right-6')} ${
                    JGC.customStyle?.closeButton ? JGC.customStyle.closeButton : checkTailwindPrefixes('text-white m-0 p-0 bg-transparent')
                  }">&times;</button>`
                : ''
            }
            <div class="${JGC.bannerConfig.backgroundColor}
            ${JGC.bannerConfig.innerBackgroundImage ? checkTailwindPrefixes('pb-4') : checkTailwindPrefixes('py-4')}
            ${getMaxWidth('max-w-xl')}
            ${checkTailwindPrefixes('flex flex-col justify-between items-center md:rounded-xl')}">
              ${JGC.bannerConfig.innerBackgroundImage ? `<img class="${checkTailwindPrefixes('md:rounded-t')}" src="${JGC.bannerConfig.innerBackgroundImage}" />` : ''}
              <div class="${checkTailwindPrefixes('flex flex-col items-center mt-4')}">
                ${returnLogo()}
                <div class="${checkTailwindPrefixes('flex space-x-2 items-center')}">
                  ${returnIcon()}
                  <h4 class="${JGC.customStyle?.bannerTitle ?? checkTailwindPrefixes('text-3xl font-bold dark:text-white')}">${JGC.bannerConfig.title}</h4>
                </div>
              </div>
              <div class="${JGC.customStyle?.bannerText ? JGC.customStyle.bannerText : `${checkTailwindPrefixes('dark:text-gray-300')}`}
              ${checkTailwindPrefixes('flex flex-col text-xs px-12 text-center mt-2')}">
                ${JGC.bannerText ? JGC.bannerText : `${JGC.text.descriptionText ? JGC.text.descriptionText : JGC.locale.bannerDescription}`} <br/>
                ${
                  JGC.bannerLink ??
                  `<div>${JGC.locale.bannerLinkDescription} <a class="jgc-font-bold" target="_blank" href="${JGC.config.privacyLink}"> ${
                    JGC.text?.bannerLinkLabel ? JGC.text.bannerLinkLabel : JGC.locale.bannerLinkLabel
                  }</a></div>`
                }
              </div>
              <div id="bannerButtons" class="${checkTailwindPrefixes('flex flex-col items-center space-y-2 tracking-tighter mt-4 mb-2')}">
                <div class="${JGC.customStyle?.accept ? JGC.customStyle.accept : checkTailwindPrefixes('bg-black dark:bg-gray-900')} ${checkTailwindPrefixes('rounded-full')}">
                  <button type="button" role="button" tabindex="0" id="yesCookies" class="${yesCookies6}">${
        JGC.bannerConfig.shortText ? JGC.locale.acceptShortText : JGC.text.acceptText
      }</button>
                </div>
              </div>
            </div>
            ${JGC.bannerConfig.backgroundImage ? `</div>` : ''}
            <div class="${checkTailwindPrefixes('mt-2')}">${managePreferencesLink(checkTailwindPrefixes('text-white underline'))}</div>
      </div>
      `;
      document.body.appendChild(JGC.banner);
      if (JGC.bannerConfig.closeButton) document.getElementById('jgc-close-button').addEventListener('click', () => closeBannerWithButton());
      document.getElementById('yesCookies').addEventListener('click', () => JGC.yesCookies());
      addEnterAction('yesCookies');
      managePreferencesLinkListener();
      break;
    case 'style7':
      JGC.positions = {
        top: checkTailwindPrefixes('justify-top items-start top-0'),
        center: checkTailwindPrefixes('mx-auto top-1/2 -translate-y-1/2'),
        bottom: checkTailwindPrefixes('justify-end items-end bottom-0'),
      };
      JGC.banner = document.createElement('div');
      JGC.banner.style.display = 'none';
      JGC.banner.innerHTML = `
      <div id="bannerContent" style="${JGC.bannerConfig.backgroundImage ? `background-size:cover; background-image:url(${JGC.bannerConfig.backgroundImage})` : ''}"
            class="
            ${JGC.positions[JGC.bannerConfig.position || 'bottom']}
            ${JGC.bannerConfig.backgroundColor}
            ${
              JGC.bannerConfig.backgroundImage
                ? `${JGC.bannerConfig.backgroundColor} ${checkTailwindPrefixes('p-2')}`
                : `${JGC.bannerConfig.innerBackgroundImage ? '' : checkTailwindPrefixes('p-6')}`
            }
            ${getMaxWidth('max-w-xl')}
            ${checkTailwindPrefixes(
              'translate-y-full origin-bottom fixed bg-opacity-95 right-0 shadow-2xl md:flex md:flex-col md:space-x-1  transition duration-700 ease-in-out z-[999] rounded',
            )}">
            ${
              JGC.bannerConfig.closeButton
                ? `<button id="jgc-close-button" class="${JGC.customStyle?.closeButton}
            ${checkTailwindPrefixes(
              'text-sm bg-gray-800 px-3 py-0.5 rounded-tr-lg rounded-tl-lg  border-t-rounded text-white self-end absolute -top-[8px] right-2 transform -translate-y-4 m-0',
            )}">
            &times;</button>`
                : ''
            }
            <div class="${checkTailwindPrefixes('space-y-6 flex flex-col')}
              ${JGC.bannerConfig.backgroundImage && !JGC.bannerConfig.innerBackgroundImage ? `${JGC.bannerConfig.backgroundColor ?? ''} ${checkTailwindPrefixes('p-4')}` : ''}
              ${JGC.bannerConfig.innerBackgroundImage && !JGC.bannerConfig.backgroundImage ? checkTailwindPrefixes('pb-8') : ''}
              ${JGC.bannerConfig.innerBackgroundImage && JGC.bannerConfig.backgroundImage ? `${checkTailwindPrefixes('pb-8')} ${JGC.bannerConfig.backgroundColor ?? ''}` : ''}
              ">
              ${JGC.bannerConfig.innerBackgroundImage ? `<img class="${checkTailwindPrefixes('md:rounded-t')}" src="${JGC.bannerConfig.innerBackgroundImage}" />` : ''}
              ${JGC.bannerConfig.logo ? `<img class="${JGC.bannerConfig.logoClasses ? JGC.bannerConfig.logoClasses : ''}" src="${JGC.bannerConfig.logo}" />` : ''}
              <div class="${checkTailwindPrefixes('flex items-center space-x-2')} ${JGC.bannerConfig.innerBackgroundImage ? checkTailwindPrefixes('px-6') : ''}">
                  ${returnIcon()}
                  <h4 class="${JGC.customStyle?.bannerTitle ?? checkTailwindPrefixes('text-xl font-bold dark:text-white')}">${JGC.bannerConfig.title}</h4>
              </div>
              <div class="${JGC.customStyle?.bannerText ? JGC.customStyle.bannerText : checkTailwindPrefixes('dark:text-white')} ${
        JGC.bannerConfig.innerBackgroundImage ? checkTailwindPrefixes('px-6') : ''
      }">
                <div>${JGC.bannerText ? JGC.bannerText : `${JGC.text.descriptionText ? JGC.text.descriptionText : JGC.locale.bannerDescription}`} <br/></div>
                <div>${
                  JGC.bannerLink
                    ? JGC.bannerLink
                    : `${JGC.locale.bannerLinkDescription} <a class="${checkTailwindPrefixes('font-bold')}" target="_blank" href="${JGC.config.privacyLink}"> ${
                        JGC.text?.bannerLinkLabel ? JGC.text.bannerLinkLabel : JGC.locale.bannerLinkLabel
                      }</a>`
                }</div>
              </div>
              <div class="${checkTailwindPrefixes('flex justify-start w-full')} ${JGC.bannerConfig.innerBackgroundImage && checkTailwindPrefixes('px-6')}">
                <div class="${checkTailwindPrefixes('space-x-2 w-full flex')}">
                    <button type="button" role="button" tabindex="0" id="yesCookies" class="${yesCookies7} ${checkTailwindPrefixes('group flex items-center')}">
                      <div class="${checkTailwindPrefixes(
                        'w-3 h-3 rounded-full border border-sky-800 dark:border-green-800 mr-1 group-hover:bg-sky-800 dark:group-hover:bg-green-800 transition duration-300',
                      )}"></div>
                      <div class="${JGC.customStyle?.accept ? JGC.customStyle.accept : checkTailwindPrefixes('group-hover:text-sky-800 dark:group-hover:text-green-200')}">${
        JGC.bannerConfig.shortText ? JGC.locale.acceptShortText : JGC.text.acceptText
      }</div>
                    </button>
                    <button type="button" role="button" tabindex="0" id="noCookies" class="${noCookies7} ${checkTailwindPrefixes('group flex items-center')}">
                      <div class="${checkTailwindPrefixes(
                        'w-3 h-3 rounded-full border border-sky-800 dark:border-red-800 mr-1 group-hover:bg-sky-800 dark:group-hover:bg-red-800 transition duration-300',
                      )}"></div>
                        <div class="${JGC.customStyle?.reject ? JGC.customStyle.reject : checkTailwindPrefixes('group-hover:text-sky-800 dark:group-hover:text-red-200')}">${
        JGC.bannerConfig.shortText ? JGC.locale.rejectShortText : JGC.text.rejectText
      }</div>
                      </button>
                    </div>
                    <div class="${checkTailwindPrefixes('ml-auto w-full text-right')}">${
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        managePreferencesLink()
      }</div>
                </div>
            </div>
        </div>
        `;
      document.body.appendChild(JGC.banner);
      makeBannerAnimation();
      if (JGC.bannerConfig.closeButton) document.getElementById('jgc-close-button').addEventListener('click', () => closeBannerWithButton());
      generateButtons();
      break;
    case 'style8':
      const cookieExists = getCookie('JgcPreferences');
      JGC.positions = {
        top: checkTailwindPrefixes('top-0'),
        center: checkTailwindPrefixes('mx-auto top-1/2 -translate-y-1/2'),
        bottom: checkTailwindPrefixes('bottom-0'),
      };
      JGC.banner = document.createElement('div');
      JGC.banner.style.display = 'none';
      JGC.banner.innerHTML = `<div style="${JGC.bannerConfig.backgroundImage && `background-size:cover; background-image:url(${JGC.bannerConfig.backgroundImage})`}"
        id="bannerContent" class="
        ${JGC.positions[JGC.bannerConfig.position || 'bottom']}
        ${JGC.bannerConfig.backgroundColor}
        ${
          JGC.bannerConfig.innerBackgroundImage
            ? `${checkTailwindPrefixes('grid grid-cols-5')}  ${JGC.bannerConfig.backgroundImage ? '' : checkTailwindPrefixes('gap-6')}`
            : checkTailwindPrefixes('flex flex-col')
        }
        ${JGC.bannerConfig.backgroundImage ? checkTailwindPrefixes('p-2') : checkTailwindPrefixes('px-6 items-start justify-center')}
        ${checkTailwindPrefixes('sm:w-full md:w-full w-full fixed shadow-2xl transition duration-700 ease-in-out dark:bg-gray-800 z-[999] py-4')}">
        ${JGC.bannerConfig.innerBackgroundImage ? `<img class="${checkTailwindPrefixes('md:rounded-t col-span-1')}" src="${JGC.bannerConfig.innerBackgroundImage}" />` : ''}
            <div class="
            ${JGC.bannerConfig.backgroundImage ? `${JGC.bannerConfig.backgroundColor} ${checkTailwindPrefixes('w-full p-4')}` : ''}
            ${JGC.bannerConfig.innerBackgroundImage && checkTailwindPrefixes('col-span-4')}
            ${checkTailwindPrefixes('flex flex-col items-start space-y-3 w-full')}">
                <div class="${checkTailwindPrefixes('w-full')}">
                  <div class="${checkTailwindPrefixes('flex items-center w-full mb-3')}" >
                    <div class="${checkTailwindPrefixes('flex flex-col items-start space-x-1')} ${JGC.bannerConfig.innerBackgroundImage ? checkTailwindPrefixes('px-6') : ''}">
                      ${returnLogo()}
                      <div class="${checkTailwindPrefixes('flex items-center space-x-2')}">
                        ${returnIcon()}
                        <h4 class="${JGC.customStyle?.bannerTitle ?? checkTailwindPrefixes('text-xl font-bold dark:text-white')}">${JGC.bannerConfig.title}</h4>
                      </div>
                    </div>
                    ${
                      JGC.bannerConfig.closeButton
                        ? `<button id="jgc-close-button" class="${JGC.customStyle?.closeButton}  ${checkTailwindPrefixes('ml-auto')}">&times;</button>`
                        : ''
                    }
                  </div>
                  <div class="${JGC.customStyle?.bannerText ? JGC.customStyle.bannerText : `${checkTailwindPrefixes('dark:text-gray-300')}`} ${checkTailwindPrefixes(
        'mb-4 leading-relaxed',
      )}">
                    ${JGC.bannerText ? JGC.bannerText : `${JGC.text.descriptionText ? JGC.text.descriptionText : JGC.locale.bannerDescription}`} <br/>
                    ${
                      JGC.bannerLink
                        ? JGC.bannerLink
                        : `${JGC.locale.bannerLinkDescription}
                    <a class="${checkTailwindPrefixes('font-bold')}" target="_blank" href="${JGC.config.privacyLink}"> ${
                            JGC.text?.bannerLinkLabel ? JGC.text.bannerLinkLabel : JGC.locale.bannerLinkLabel
                          }</a>.`
                    }
                  </div>
                </div>
                <div class="${checkTailwindPrefixes('flex w-full space-x-2')}">
                    <div class="${checkTailwindPrefixes('group')}">
                    <div class="${JGC.customStyle?.accept ? JGC.customStyle.accept : ''}
                      ${checkTailwindPrefixes('py-2 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ease-linear')}">
                      <button role="button" tabindex="0" type="button" id="yesCookies" class="${yesCookies8}">${
        JGC.bannerConfig.shortText ? JGC.locale.acceptShortText : JGC.text.acceptText
      } </button>
                    </div>
                  </div>
                  <div class="${checkTailwindPrefixes('group')}">
                    <div class="${JGC.customStyle?.accept ? JGC.customStyle.accept : ''}
                      ${checkTailwindPrefixes('py-2 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ease-linear')}">
                      <button type="button" id="acceptSelected" class="${selectedCookies8}">${
        JGC.bannerConfig.shortText ? JGC.locale.acceptSelectedShortText : JGC.text.acceptSelectedText
      } </button>
                    </div>
                  </div>
                  <div class="${checkTailwindPrefixes('group')}">
                    <div class="${JGC.customStyle?.reject ? JGC.customStyle.reject : checkTailwindPrefixes('')} ${checkTailwindPrefixes(
        'py-2 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ease-linear',
      )}">
                    <button type="button" id="noCookies" class="${noCookies8}"> ${JGC.bannerConfig.shortText ? JGC.locale.rejectShortText : JGC.text.rejectText} </button>
                    </div>
                  </div>
                </div>
                <br/>
                <div class="${checkTailwindPrefixes('md:grid border-t hidden')}
                  ${cookieExists['enable'].length == 1 ? `${checkTailwindPrefixes('md:grid-cols-1')}` : ''}
                  ${cookieExists['enable'].length == 2 ? `${checkTailwindPrefixes('md:grid-cols-2')}` : ''}
                  ${cookieExists['enable'].length == 3 ? `${checkTailwindPrefixes('md:grid-cols-3')}` : ''}
                  ${cookieExists['enable'].length >= 4 ? `${checkTailwindPrefixes('md:grid-cols-4')}` : ''}
                  ">
                  ${(JGC as any).generateOptions()}
                </div>
                <div class="${checkTailwindPrefixes('block w-full border-t md:hidden')} ">${
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        managePreferencesLink()
      }</div>
              </div>
        </div>
        `;
      document.body.appendChild(JGC.banner);
      makeBannerAnimation();
      if (JGC.bannerConfig.closeButton) document.getElementById('jgc-close-button').addEventListener('click', () => closeBannerWithButton());
      generateButtons();
      document.getElementById('acceptSelected').addEventListener('click', () => (JGC as any).closePreferencePanel()); // Close
      // Close
      break;
    case 'style9':
      if (!JGC.bannerConfig.shortText) {
        throw "You need to turn on the 'shortText' property in order to use style 9 correctly.";
      }
      JGC.positions = {
        top: checkTailwindPrefixes('justify-top top-4'),
        bottom: checkTailwindPrefixes('justify-end bottom-0'),
      };
      JGC.banner = document.createElement('div');
      JGC.banner.style.display = 'none';
      JGC.banner.innerHTML = `<div id="bannerContent" style="${
        JGC.bannerConfig.backgroundImage ? `background-size:cover; background-image:url(${JGC.bannerConfig.backgroundImage})` : ''
      }"
                class=" ${JGC.positions[JGC.bannerConfig.position || 'bottom']}
                ${JGC.bannerConfig.backgroundColor}
                ${
                  JGC.bannerConfig.backgroundImage
                    ? `${JGC.bannerConfig.backgroundColor} ${checkTailwindPrefixes('p-2')}`
                    : `${JGC.bannerConfig.innerBackgroundImage ? '' : checkTailwindPrefixes('px-6 py-2')}`
                }
                ${checkTailwindPrefixes('fixed right-0 shadow-2xl md:flex md:flex-col md:space-x-1 md:mr-[4%] mb-10 transition duration-700 ease-in-out rounded-full z-[999]')}">
                <div class="${checkTailwindPrefixes('flex items-center space-x-2')}
                  ${JGC.bannerConfig.backgroundImage && !JGC.bannerConfig.innerBackgroundImage ? `${JGC.bannerConfig.backgroundColor ?? ''}  ${checkTailwindPrefixes('p-4')}` : ''}
                  ${JGC.bannerConfig.innerBackgroundImage && !JGC.bannerConfig.backgroundImage ? checkTailwindPrefixes('pb-8') : ''}
                  ${JGC.bannerConfig.innerBackgroundImage && JGC.bannerConfig.backgroundImage ? `${checkTailwindPrefixes('pb-8')} ${JGC.bannerConfig.backgroundColor ?? ''}` : ''}
                  ">
                  ${JGC.bannerConfig.innerBackgroundImage ? `<img class="${checkTailwindPrefixes('md:rounded-t')}" src="${JGC.bannerConfig.innerBackgroundImage}" />` : ''}
                  ${JGC.bannerConfig.logo ? `<img class="${JGC.bannerConfig.logoClasses ? JGC.bannerConfig.logoClasses : ''}" src="${JGC.bannerConfig.logo}" />` : ''}
                  <div class="${checkTailwindPrefixes('col-span-3 flex space-x-2')}
                    ${JGC.customStyle?.bannerText ? JGC.customStyle.bannerText : checkTailwindPrefixes('dark:text-white')} ${
        JGC.bannerConfig.innerBackgroundImage ? checkTailwindPrefixes('px-6') : ''
      }">
                    <div>${
                      JGC.bannerText
                        ? JGC.bannerText
                        : `${
                            JGC.text.descriptionText ? JGC.text.descriptionText : `${JGC.bannerConfig.shortText ? JGC.locale.bannerShortDescription : JGC.locale.bannerDescription}`
                          }`
                    }</div>
                    <div><a class="${checkTailwindPrefixes('font-bold underline')}" target="_blank" href="${JGC.config.privacyLink}"> Read more </a></div>
                  </div>
                  <div class="${checkTailwindPrefixes('space-x-1 col-span-1')} ${JGC.bannerConfig.innerBackgroundImage && checkTailwindPrefixes('px-6')}">
                    <button type="button" role="button" tabindex="0" id="yesCookies" class="${yesCookies9}">${
        JGC.bannerConfig.shortText ? JGC.locale.acceptShortText : JGC.text.acceptText
      }</button>
                    <button type="button" role="button" tabindex="0" id="noCookies" class="${noCookies9}">${
        JGC.bannerConfig.shortText ? JGC.locale.rejectShortText : JGC.text.rejectText
      }</button>
                  </div>
                </div>
          </div>
          `;
      document.body.appendChild(JGC.banner);
      makeBannerAnimation();
      document.getElementById('yesCookies').addEventListener('click', () => JGC.yesCookies());
      document.getElementById('noCookies').addEventListener('click', () => JGC.noCookies());
      addEnterAction('yesCookies');
      addEnterAction('noCookies');
      break;
    default:
      break;
  }
}
