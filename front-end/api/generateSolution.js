export default async function generateSolution(data) {
  try {
    const result = await fetch(`http://localhost:8000/solution`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(data),
    });
    return result.ok ? await result.json() : null;
  } catch (error) {
    console.error(error);
  }
}
