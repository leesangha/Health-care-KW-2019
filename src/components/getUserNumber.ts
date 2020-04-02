export default function getUserNumber(): number {
  const userInfo: string | null = sessionStorage.getItem("info");

  return userInfo === null ? -1 : JSON.parse(userInfo)[0].user_no;
}