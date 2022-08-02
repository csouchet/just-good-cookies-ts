/**
 * Copyright 2022 Céline Souchet
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 *
 * This project is a fork of the original just-good-cookies project of Francesco Mugnai.
 */
import JGC from './justgoodcookies';

/**
 * Activate Google Analytics
 */
export function activateGoogle() {
  const head = document.getElementsByTagName('head')[0];
  const GoogleAnalytics = document.createElement('script');
  const GoogleAnalyticsCode = document.createElement('script');
  const GoogleAnalyticsId = JGC.activate?.GoogleAnalytics?.id ? JGC.activate.GoogleAnalytics.id.escape() : false;
  const GoogleAnalyticsAnonymized = JGC.activate?.GoogleAnalytics?.anonymized ? JGC.activate.GoogleAnalytics.anonymized : false;
  const GoogleAnalyticsAdStorage = JGC.activate?.GoogleAnalytics?.ad_storage ? JGC.activate.GoogleAnalytics.ad_storage : false;
  const GoogleAnalyticsAnalyticsStorage = JGC.activate?.GoogleAnalytics?.analytics_storage ? JGC.activate.GoogleAnalytics.analytics_storage : false;
  GoogleAnalytics.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsId}`);
  GoogleAnalyticsCode.text = `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'ad_storage': '${GoogleAnalyticsAdStorage == true ? 'granted' : 'denied'}',
      'analytics_storage': '${GoogleAnalyticsAnalyticsStorage == true ? 'granted' : 'denied'}',
    });
    gtag('js', new Date());
    gtag('config', '${GoogleAnalyticsId}', { 'anonymize_ip': ${GoogleAnalyticsAnonymized ?? false} });`;
  head.insertBefore(GoogleAnalytics, head.firstChild);
  head.appendChild(GoogleAnalyticsCode);
}

/**
 * Activate Facebook Pixel
 */
export function activateFacebook() {
  if (JGC.activate?.FacebookPixel) {
    const FacebookPixel_init = JGC.activate.FacebookPixel.init.escape();
    const FacebookPixel_noscript = document.createElement('noscript');
    const FacebookPixel_script = document.createElement('script');
    FacebookPixel_script.text = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${FacebookPixel_init}');
    fbq('track', 'PageView');`;
    document.head.appendChild(FacebookPixel_script);
    FacebookPixel_noscript.setAttribute('width', '1');
    FacebookPixel_noscript.setAttribute('height', '1');
    FacebookPixel_noscript.setAttribute('style', 'display:none');
    FacebookPixel_noscript.setAttribute('src', `https://www.facebook.com/tr?id=${FacebookPixel_init}&ev=PageView&noscript=1`);
    document.head.appendChild(FacebookPixel_noscript);
  }
}

/**
 * Google Tag Manager script
 */
function activateGoogleTagManager(w: any, d: any, s: any, l: any, i: any) {
  w[l] = w[l] || [];
  w[l].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });
  const f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = '//www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
}

/**
 * Check custom user's activations
 */
export function checkActivations() {
  const activations = {
    default: () => {},
    GoogleAnalytics: () => activateGoogle(),
    FacebookPixel: () => activateFacebook(),
  };
  // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (JGC.activate) Object.keys(JGC.activate).forEach(k => (activations[k] || activations['default'])());
}

/**
 * Activate Google Tag Manager
 * TODO: It needs more tests.
 */
export function googleTagManager() {
  if (JGC.activate?.GoogleTagManager) {
    const dataObject = { event: JGC.activate.GoogleTagManager.event_name };
    const GoogleAnalyticsContainerId = JGC.activate.GoogleTagManager.container_id;
    activateGoogleTagManager(window, document, 'script', 'dataLayer', GoogleAnalyticsContainerId);
    if (JGC.activate.GoogleTagManager.variables) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      JGC.activate.GoogleTagManager.variables.forEach((element: any) => (dataObject[element[0]] = element[1]));
    }
    // @ts-expect-error TS(2304): Cannot find name 'dataLayer'.
    if (typeof dataLayer != 'undefined') dataLayer.push(dataObject);
  }
}
