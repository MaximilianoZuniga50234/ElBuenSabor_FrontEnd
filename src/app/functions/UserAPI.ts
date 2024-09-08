import { UserAuth0Get, UserAuth0Post } from "../interfaces/UserAuth0";

export async function getAllUser() {
  return await fetch("http://localhost:9000/api/v1/user").then((r) => r.json());
}

export async function getOneUser(id: string) {
  return await fetch(`http://localhost:9000/api/v1/user/${id}`).then((r) =>
    r.json()
  );
}

export async function getUsersAuth0() {
  const response = await fetch(
    "https://elbuensabor.us.auth0.com/api/v2/users",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_AUTH0_MANAGEMENT_API_TOKEN
        }`,
      },
    }
  );

  return await response.json();
}

export async function getUserAuth0XId(userId: string) {
  const response = await fetch(
    `https://elbuensabor.us.auth0.com/api/v2/users/${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_AUTH0_MANAGEMENT_API_TOKEN
        }`,
      },
    }
  );

  return await response.json();
}

export async function createUserAuth0(user: UserAuth0Post) {
  await fetch("https://elbuensabor.us.auth0.com/api/v2/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${
        import.meta.env.VITE_AUTH0_MANAGEMENT_API_TOKEN
      }`,
    },
  });
}

export async function updateUserAuth0(user: UserAuth0Post, id: string) {
  await fetch(`https://elbuensabor.us.auth0.com/api/v2/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${
        import.meta.env.VITE_AUTH0_MANAGEMENT_API_TOKEN
      }`,
    },
  });
}

export async function deleteUserAuth0(userId: string) {
  await fetch(`https://elbuensabor.us.auth0.com/api/v2/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${
        import.meta.env.VITE_AUTH0_MANAGEMENT_API_TOKEN
      }`,
    },
  });
}

export async function getUserRole(id: string) {
  const response = await fetch(
    `https://elbuensabor.us.auth0.com/api/v2/users/${id}/roles`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_AUTH0_MANAGEMENT_API_TOKEN
        }`,
      },
    }
  );

  return await response.json();
}

export async function getUsersXRole(roleId: string) {
  const response = await fetch(
    `https://elbuensabor.us.auth0.com/api/v2/roles/${roleId}/users`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_AUTH0_MANAGEMENT_API_TOKEN
        }`,
      },
    }
  );

  return await response.json();
}

export async function addRoleToUser(user: UserAuth0Post, userId: string) {
  let roleId: string = "";
  if (user.user_metadata.roleToAdd === "Cajero") {
    roleId = "rol_4He3EeX0J865wVlP";
  } else if (user.user_metadata.roleToAdd === "Cocinero") {
    roleId = "rol_43MztEs0A1OA6H5V";
  } else if (user.user_metadata.roleToAdd === "Delivery") {
    roleId = "rol_XolrFEPAXWX8aMYL";
  }

  await fetch(`https://elbuensabor.us.auth0.com/api/v2/users/${userId}/roles`, {
    method: "POST",
    body: JSON.stringify({
      roles: [roleId],
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        import.meta.env.VITE_AUTH0_MANAGEMENT_API_TOKEN
      }`,
    },
  });
}
export async function removeRoleToUser(user: UserAuth0Get) {
  let roleId: string = "";
  if (user.role === "Cajero") {
    roleId = "rol_4He3EeX0J865wVlP";
  } else if (user.role === "Cocinero") {
    roleId = "rol_43MztEs0A1OA6H5V";
  } else if (user.role === "Delivery") {
    roleId = "rol_XolrFEPAXWX8aMYL";
  }

  await fetch(
    `https://elbuensabor.us.auth0.com/api/v2/users/${user.user_id}/roles`,
    {
      method: "DELETE",
      body: JSON.stringify({
        roles: [roleId],
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_AUTH0_MANAGEMENT_API_TOKEN
        }`,
      },
    }
  );
}
