export async function getToDos() {
  const response = await fetch("https://wedev-api.sky.pro/api/leaderboard");
  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }
  const data = await response.json();
  return data;
}
export async function postToDo({ id, name, time }) {
  const response = await fetch("https://wedev-api.sky.pro/api/leaderboard", {
    method: "POST",
    body: JSON.stringify({
      id,
      name,
      time,
    }),
  });
  if (!response.ok) {
    if (!response.ok) {
      throw new Error("Ошибка получения данных");
    }
    const data = await response.json();
    return data;
  }
}
