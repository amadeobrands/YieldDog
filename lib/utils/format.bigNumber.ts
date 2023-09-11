import { formatUnits } from 'viem'

export function	amount(amount: number | string, minimumFractionDigits = 2, maximumFractionDigits = 2, displayDigits = 0): string {
  let		locale = 'fr-FR';
  if (typeof(navigator) !== 'undefined') {
    locale = navigator.language || 'fr-FR';
  }
  if (maximumFractionDigits < minimumFractionDigits) {
    maximumFractionDigits = minimumFractionDigits;
  }
  if (!amount) {
    amount = 0;
  }
  if (typeof(amount) === 'string') {
    amount = Number(amount);
  }
  if (isNaN(amount)) {
    amount = 0;
  }
  let formattedAmount = new Intl.NumberFormat([locale, 'en-US'], {minimumFractionDigits, maximumFractionDigits}).format(amount)
  
  if (displayDigits > 0 && formattedAmount.length > displayDigits) {
    const leftSide = formattedAmount.slice(0, Math.ceil(displayDigits / 2))
    const rightSide = formattedAmount.slice(-Math.floor(displayDigits / 2))
    formattedAmount = `${leftSide}...${rightSide}`
  }
  
  return formattedAmount
}

export	const	toNormalizedValue = (v: bigint, d?: number): number => {
	return Number(formatUnits(v, d ?? 18));
};

export const	toNormalizedAmount = (v: bigint, d?: number): string => {
	return amount(toNormalizedValue(v, d ?? 18), 9, 9);
};

export { toNormalizedAmount as formatBigNumber}
