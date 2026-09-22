// shared.js — common utilities for The Reset Co pages
window.getPrices = () =>
  JSON.parse(localStorage.getItem('trc_prices') ||
    '{"serenity":22000,"awakening":26000,"transformation":35000}');
