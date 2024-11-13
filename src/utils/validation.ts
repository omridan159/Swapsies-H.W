export const validateAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const validateAmount = (amount: string): boolean => {
  const num = Number(amount);
  return !isNaN(num) && num > 0;
};
