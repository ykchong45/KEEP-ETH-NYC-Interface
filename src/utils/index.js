import { ethers } from 'ethers';

export const toFloat = (bn, decimals) => {
  return ethers.utils.formatUnits(bn, decimals);
};

export const toBN = (num, decimals) => {
  return ethers.utils.parseUnits(`${num}`, decimals);
};
