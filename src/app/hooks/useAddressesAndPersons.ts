import { useEffect, useState } from "react";
import { useStore as useUsers } from "../store/UsersStore";
import { useStore as useToken } from "../store/UserTokenStore";
import { Person } from "../interfaces/Person";
import { Address } from "../interfaces/Address";
import { useAuth0 } from "@auth0/auth0-react";
import { Department } from "../interfaces/Department";
import { addPerson, getAllPerson } from "../functions/PersonAPI";
import { addAddress, getAllAddress } from "../functions/AddressAPI";
import { getAllDepartment } from "../functions/DepartmentAPI";

export function useAddressesAndPersons() {
  const { users } = useUsers();
  const { token } = useToken();

  const [usersPost, setUsersPost] = useState<Person[]>([
    {
      email: "",
      lastName: "",
      name: "",
      phoneNumber: "",
      user_id: "",
    },
  ]);

  const [addressesPost, setAddressesPost] = useState<Address[]>([
    {
      id: 0,
      department: { id: 0, name: "" },
      number: 0,
      person: {
        email: "",
        lastName: "",
        name: "",
        phoneNumber: "",
        user_id: "",
        id: "",
      },
      street: "",
    },
  ]);

  const [personsDatabase, setPersonsDatabase] = useState<Person[]>();
  const [addressesDatabase, setAddressesDatabase] = useState<Address[]>();
  const [departmentsDatabase, setDepartmentsDatabase] =
    useState<Department[]>();

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  // const [tokenState, setTokenState] = useState("");

  // const getToken = async () => {
  //   try {
  //     const token = await getAccessTokenSilently({
  //       authorizationParams: {
  //         audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  //       },
  //     });
  //     setTokenState(token);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const postUsersDatabase = async () => {
    const newUserPost = users.map((user) => ({
      email: user.email,
      lastName: user.family_name,
      name: user.name,
      phoneNumber: user.user_metadata.phone_number.toString(),
      user_id: user.user_id,
    }));

    setUsersPost([...newUserPost]);
  };

  const postAddressesDatabase = async () => {
    const newAddressesPost = users.map((user) => ({
      id: 0,
      department: departmentsDatabase?.find(
        (department) =>
          department.name === user?.user_metadata?.address?.department
      ) ?? { id: 0, name: "" },
      number: user?.user_metadata?.address?.number ?? 0,
      street: user?.user_metadata?.address?.street ?? "",
      person: {
        id:
          personsDatabase?.find((person) => person.user_id === user.user_id)
            ?.id ?? "",
        email: user?.email ?? "",
        lastName: user?.family_name ?? "",
        name: user?.given_name ?? "",
        phoneNumber: user?.user_metadata.phone_number.toString() ?? "",
        user_id: user?.user_id ?? "",
      },
    }));

    setAddressesPost([...newAddressesPost]);
  };

  const getPersonsDatabase = async () => {
    const response = await getAllPerson();
    setPersonsDatabase(response);
  };

  const getAddressesDatabase = async () => {
    const response = await getAllAddress();
    setAddressesDatabase(response);
  };
  const getDepartmentsDatabase = async () => {
    const response = await getAllDepartment();
    setDepartmentsDatabase(response);
  };

  useEffect(() => {
    getAddressesDatabase();
    getDepartmentsDatabase();
    getPersonsDatabase();
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated) getToken();
  // }, [isAuthenticated]);

  useEffect(() => {
    if (users.length > 0) {
      postUsersDatabase();
    }
  }, [users]);

  useEffect(() => {
    if (
      isAuthenticated &&
      users.length > 0 &&
      users.length != personsDatabase?.length
    ) {
      getPersonsDatabase();
    }
  }, [users, personsDatabase]);

  useEffect(() => {
    if (
      users.length > 0 &&
      departmentsDatabase &&
      departmentsDatabase?.length > 0 &&
      personsDatabase &&
      personsDatabase?.length === users.length
    ) {
      postAddressesDatabase();
    }
  }, [users, departmentsDatabase, personsDatabase]);

  useEffect(() => {
    if (
      addressesPost.length > 1 &&
      token != "" &&
      personsDatabase &&
      personsDatabase.length > 0 &&
      users &&
      personsDatabase.length === users.length
    ) {
      addressesPost?.forEach(async (address: Address) => {
        let addressExists = false;
        if (addressesDatabase && addressesDatabase?.length > 1) {
          for (const addressDatabase of addressesDatabase) {
            if (address.person.id === addressDatabase.person.id) {
              addressExists = true;
              break;
            }
          }
        }

        if (addressExists === false) {
          await addAddress(address, token);
        }
      });
    }
  }, [users, addressesPost, token, personsDatabase, usersPost]);

  useEffect(() => {
    if (usersPost.length > 1 && token != "") {
      usersPost?.forEach(async (user: Person) => {
        let personExists = false;
        if (personsDatabase) {
          for (const person of personsDatabase) {
            if (user.user_id === person.user_id) {
              personExists = true;
              break;
            }
          }
        }

        if (personExists === false) {
          await addPerson(user, token);
        }
      });
    }
  }, [usersPost, token]);
}
