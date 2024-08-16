import posthog from 'posthog-js'
type EventProperties = Record<string, any>;

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST as string,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug()
      },
    })
  }
  return posthog;
}


export const trackEvent = (eventName: string, properties?: EventProperties) => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    posthog.capture(eventName, properties);
  } else {
    console.log(`Event tracked (DEV): ${eventName}`, properties);
  }
};

export const trackButtonClick = (buttonName: string, location: string, additionalProps?: EventProperties) => {
  trackEvent('button_clicked', {
    button_name: buttonName,
    location,
    ...additionalProps,
  });
};

export const trackLinkClick = (linkName: string, url: string, location: string, additionalProps?: EventProperties) => {
  trackEvent('link_clicked', {
    link_name: linkName,
    url,
    location,
    ...additionalProps,
  });
};

export const trackSectionView = (sectionName: string, additionalProps?: EventProperties) => {
  trackEvent('section_viewed', {
    section_name: sectionName,
    ...additionalProps,
  });
};