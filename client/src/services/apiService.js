import { API_URL } from "../configs/apiConfig";

export async function registerUser(data) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Network response was not ok");
  }

  return await response.json();
}
export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const deleteUser = async (Id) => {
  const response = await fetch(
    `${API_URL}/users/${Id}`,

    {
      method: "DELETE",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
};

 export const updateUser = async (Id, updatedData) => {
  console.log("Updating user with ID:", Id); // Log the ID
  console.log("Data to be updated:", updatedData); // Log the data being sent
  const response = await fetch(`${API_URL}/users/${Id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }
  return response.json();
};


export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Login failed");
  }

  return await response.json(); // Return the response
};
