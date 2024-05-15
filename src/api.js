export async function getToDos() {
  const response = await fetch("https://wedev-api.sky.pro/api/v2/leaderboard");
  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }
  const data = await response.json();
  return data;
}
export async function postToDo({ name, time, achievements }) {
  const response = await fetch("https://wedev-api.sky.pro/api/v2/leaderboard", {
    method: "POST",
    body: JSON.stringify({
      name,
      time,
      achievements,
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
