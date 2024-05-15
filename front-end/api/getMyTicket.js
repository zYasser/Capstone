export default async function getMyTicket(page) {
  try {
    const result = await fetch(
      `http://localhost:8000/api/ticket/all?page=${page}`
    );

    return result.ok ? await result.json() : null;
  } catch (error) {
    return console.log(error);
  }
}
