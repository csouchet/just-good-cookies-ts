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
export function activateGoogle(): void {
  const GoogleAnalyticsId = JGC.activate?.GoogleAnalytics?.id ?? '';

  const GoogleAnalytics = document.createElement('script');
  GoogleAnalytics.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsId}`);

  const GoogleAnalyticsCode = document.createElement('script');
  GoogleAnalyticsCode.text = `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'default', {
      'ad_storage': '${JGC.activate?.GoogleAnalytics?.ad_storage ? 'granted' : 'denied'}',
      'analytics_storage': '${JGC.activate?.GoogleAnalytics?.analytics_storage ? 'granted' : 'denied'}',
    });
    gtag('js', new Date());
    gtag('config', '${GoogleAnalyticsId}', { 'anonymize_ip': ${JGC.activate?.GoogleAnalytics?.anonymized ?? false} });`;

  const head = document.getElementsByTagName('head')[0];
  head.insertBefore(GoogleAnalytics, head.firstChild);
  head.appendChild(GoogleAnalyticsCode);
}

/**
 * Activate Facebook Pixel
 */
export function activateFacebook(): void {
  if (JGC.activate?.FacebookPixel) {
    JGC.activate.FacebookPixel = {};

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
    fbq('init', '${JGC.activate.FacebookPixel}');
    fbq('track', 'PageView');`;
    document.head.appendChild(FacebookPixel_script);

    const FacebookPixel_noscript = document.createElement('noscript');
    FacebookPixel_noscript.setAttribute('width', '1');
    FacebookPixel_noscript.setAttribute('height', '1');
    FacebookPixel_noscript.setAttribute('style', 'display:none');
    FacebookPixel_noscript.setAttribute('src', `https://www.facebook.com/tr?id=${JGC.activate.FacebookPixel}&ev=PageView&noscript=1`);
    document.head.appendChild(FacebookPixel_noscript);
  }
}

/**
 * Google Tag Manager script
 */
function activateGoogleTagManager(containerId: string): void {
  const dataLayer = window.dataLayer ?? [];
  dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });

  const j = document.createElement('script');
  j.async = true;
  j.src = `//www.googletagmanager.com/gtm.js?id=${containerId}&l=dataLayer`;

  const f = document.getElementsByTagName('script')[0];
  f.parentNode.insertBefore(j, f);
}

/**
 * Check custom user's activations
 */
export function checkActivations(): void {
  const activations: { default: () => void; GoogleAnalytics: () => void; FacebookPixel: () => void; GoogleTagManager: () => void; [key: string]: () => void } = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    default: () => {},
    GoogleAnalytics: () => activateGoogle(),
    FacebookPixel: () => activateFacebook(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    GoogleTagManager: () => {},
  };
  if (JGC.activate) Object.keys(JGC.activate).forEach(k => (activations[k] || activations.default)());
}

/**
 * Activate Google Tag Manager
 * TODO: It needs more tests.
 */
export function googleTagManager(): void {
  const googleTagManager = JGC.activate?.GoogleTagManager;
  if (googleTagManager) {
    const dataObject = { event: googleTagManager.event_name };
    activateGoogleTagManager(googleTagManager.container_id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    googleTagManager?.variables.forEach(element => (dataObject[element[0]] = element[1]));
    if (typeof window.dataLayer != 'undefined') window.dataLayer.push(dataObject);
  }
}
