export default async function updateAccount(data) {
  try {
    const result = await fetch(
      "http://localhost:8000/api/user/update_account",
      {
        credentials: "include",
        method: "PATCH",
        mode: "cors",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(data),
      }
    );
    console.log(result); // Log the result object

    if (result.status == "200") {
      return {
        success: "Your account was successfully updated",
        error: null,
      };
    } else {
      const err = await result.json();
      console.log(err["detail"]);
      return {
        success: null,
        error: err["detail"],
      };
    }
  } catch (error) {
    return console.log(error);
  }
}
