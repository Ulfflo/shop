// lib/gtag.js

export const GA_TRACKING_ID = "G-D8MP8FWQ0Q";

// Initialize Google Analytics page view tracking
export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// Log specific events
export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
