
export const formatCurrency = (value: number): string => {
  // Format as Indian currency (assuming IPL-style auction)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    notation: value >= 10000000 ? 'compact' : 'standard',
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en').format(value);
};
