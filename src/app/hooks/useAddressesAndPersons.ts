import { useEffect, useState } from "react";
import { useStore as useUsers } from "../store/UsersStore";
import { useStore as useToken } from "../store/UserTokenStore";
import { Person } from "../interfaces/Person";
import { Address } from "../interfaces/Address";
import { Department } from "../interfaces/Department";
import { addPerson, getAllPerson, updatePerson } from "../functions/PersonAPI";
import {
  addAddress,
  getAllAddress,
  updateAddress,
} from "../functions/AddressAPI";
import { getAllDepartment } from "../functions/DepartmentAPI";

export function useAddressesAndPersons() {
  const { users } = useUsers();
  const { token } = useToken();

  const [personsDatabase, setPersonsDatabase] = useState<Person[]>();
  const [addressesDatabase, setAddressesDatabase] = useState<Address[]>();
  const [departmentsDatabase, setDepartmentsDatabase] =
    useState<Department[]>();

  const [personsPost, setPersonsPost] = useState<Person[]>();
  const [addressesPost, setAddressesPost] = useState<Address[]>();

  useEffect(() => {
    getPersons();
    getAddresses();
    getDepartments();
  }, []);

  const getPersons = async () => {
    try {
      const persons = await getAllPerson();
      setPersonsDatabase(persons);
    } catch (error) {
      console.error(error);
    }
  };

  const getAddresses = async () => {
    try {
      const addresses = await getAllAddress();
      setAddressesDatabase(addresses);
    } catch (error) {
      console.error(error);
    }
  };

  const getDepartments = async () => {
    try {
      const departments = await getAllDepartment();
      setDepartmentsDatabase(departments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (users.length > 0 && token) {
      const newPersonsPost = users.map((user) => ({
        email: user.email,
        lastName: user.family_name,
        name: user.given_name,
        phoneNumber: user.user_metadata.phone_number.toString(),
        user_id: user.user_id,
      }));
      setPersonsPost(newPersonsPost);
    }
  }, [users, token]);

  const insertPersons = async () => {
    try {
      if (personsPost && personsPost.length > 0) {
        if (personsDatabase && personsDatabase.length === 0) {
          for (const personPost of personsPost) {
            await addPerson(personPost, token);
          }
          await getPersons();
        } else if (personsDatabase && personsDatabase.length > 0) {
          for (const personPost of personsPost) {
            const existingPerson = personsDatabase.find(
              (person) => person.user_id === personPost.user_id
            );
            if (!existingPerson) {
              await addPerson(personPost, token);
              await getPersons();
            } else if (
              existingPerson &&
              existingPerson.id &&
              (existingPerson.name !== personPost.name ||
                existingPerson.lastName !== personPost.lastName ||
                existingPerson.phoneNumber !== personPost.phoneNumber)
            ) {
              await updatePerson(personPost, token, existingPerson.id);
              await getPersons();
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    insertPersons();
  }, [personsPost, personsDatabase]);

  useEffect(() => {
    if (
      users.length > 0 &&
      token &&
      departmentsDatabase &&
      departmentsDatabase.length > 0 &&
      personsDatabase &&
      personsDatabase.length > 0
    ) {
      const newAddressesPost: Address[] = [];
      for (const user of users) {
        const department = departmentsDatabase.find(
          (d) => d.name === user.user_metadata.address.department
        );
        const person = personsDatabase?.find(
          (person) => person.user_id === user.user_id
        );
        if (department && person) {
          newAddressesPost.push({
            id: 0,
            street: user.user_metadata.address.street,
            number: user.user_metadata.address.number,
            department: department,
            person: person,
          });
        }
      }
      setAddressesPost(newAddressesPost);
    }
  }, [users, token, departmentsDatabase, personsDatabase]);

  const insertAddresses = async () => {
    try {
      if (addressesPost && addressesPost.length > 0) {
        if (addressesDatabase && addressesDatabase.length === 0) {
          for (const addressPost of addressesPost) {
            await addAddress(addressPost, token);
          }
          await getAddresses();
        } else if (addressesDatabase && addressesDatabase.length > 0) {
          for (const addressPost of addressesPost) {
            const existingAddress = addressesDatabase.find(
              (address) => address.person.user_id === addressPost.person.user_id
            );
            if (!existingAddress) {
              await addAddress(addressPost, token);
              await getAddresses();
            } else if (
              existingAddress &&
              (existingAddress.department.name !==
                addressPost.department.name ||
                existingAddress.number !== addressPost.number ||
                existingAddress.street !== addressPost.street)
            ) {
              await updateAddress(addressPost, token, existingAddress.id);
              await getAddresses();
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    insertAddresses();
  }, [addressesPost, addressesDatabase]);
}
