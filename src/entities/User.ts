export default interface User {
  id: number,
  username: string,
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
  birth_date: string | null,
  bro: string,
  portrait: string | null,
  back_image: string | null,
}