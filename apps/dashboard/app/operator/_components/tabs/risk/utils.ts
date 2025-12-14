export const formatNumber = (num: number) => num.toLocaleString();

export const formatPercent = (num: number) => `${(num * 100).toFixed(2)}%`;

export const formatVolatility = (vol: number) => {
  if (vol < 0.0001) return '< 0.01%';
  return `${(vol * 100).toFixed(2)}%`;
};

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};
