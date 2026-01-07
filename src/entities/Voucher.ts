export default interface Voucher {
  id: number,
  code: string,
  redeemed: boolean,
  redeemed_by: string,
  redeemed_at: string,
  expires_at: string,
}