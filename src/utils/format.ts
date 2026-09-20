import { Currency, CurrencyConfig } from '../types';
import { CURRENCIES } from '../data/luxuryData';

export function formatPrice(amountInUSD: number, currency: Currency = 'USD'): string {
  const config: CurrencyConfig = CURRENCIES[currency] || CURRENCIES.USD;
  const converted = Math.round(amountInUSD * config.rate);

  const formattedNumber = new Intl.NumberFormat(
    currency === 'INR' ? 'en-IN' : 'en-US'
  ).format(converted);

  if (currency === 'AED') {
    return `${config.symbol} ${formattedNumber}`;
  }
  return `${config.symbol}${formattedNumber}`;
}

export function calculateShippingFee(subtotalUSD: number, shippingId: string = 'standard-intl'): number {
  if (shippingId === 'standard-intl') {
    return subtotalUSD >= 75 ? 0 : 9.99;
  }
  if (shippingId === 'express-dhl') {
    return 19.99;
  }
  return 9.99;
}
