export default async function changeMyPassword(id, body) {
  try {
    const result = await fetch(
      `http://localhost:8000/api/user/changepassword/${id}`,
      {
        credentials: "include",
        method: "PATCH",
        mode: "cors",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(data),
      }
    );
    if (result.status == "200") {
      return {
        success: "Your Password was successfully updated",
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
    console.error(error);
    return {
      success: null,
      error: "Something Went Wrong, try again later",
    };
  }
}
