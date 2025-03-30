import CryptoJS from 'crypto-js';
import { Wallet } from 'ethers';

export const encryptWallet = (wallet: Wallet, password: string): string => {
  const privateKey = wallet.privateKey;
  return CryptoJS.AES.encrypt(privateKey, password).toString();
};

export const decryptWallet = (encrypted: string, password: string): Wallet => {
  const decrypted = CryptoJS.AES.decrypt(encrypted, password);
  const privateKey = decrypted.toString(CryptoJS.enc.Utf8);
  return new Wallet(privateKey);
};