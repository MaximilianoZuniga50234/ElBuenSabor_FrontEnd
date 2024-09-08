import { create } from "zustand";
import { Department } from "../../interfaces/Department";

type Store = {
  departments: Department[];
  add_all_department: () => void;
  add: (newDepartment: Department) => void;
  remove: (departmentId: number) => void;
};

export const useStore = create<Store>()((set) => ({
  departments: [],
  add_all_department: async () => {
    const departments = await fetch(
      "http://localhost:9000/api/v1/department"
    ).then((res) => res.json());
    set({ departments });
  },
  add: (newDepartment: Department) =>
    set((state) => ({ departments: [...state.departments, newDepartment] })),
  remove: (departmentId: number) =>
    set((state) => ({
      departments: state.departments.filter(
        (department) => department.id !== departmentId
      ),
    })),
}));
