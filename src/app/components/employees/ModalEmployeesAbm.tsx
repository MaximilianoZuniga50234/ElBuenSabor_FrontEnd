import { Toaster, toast } from "sonner";
import { Box, Fade, Modal, Popover } from "@mui/material";
import { Email, UserAuth0Get, UserAuth0Post } from "../../interfaces/UserAuth0";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { addRoleToUser, createUserAuth0, removeRoleToUser, updateUserAuth0 } from "../../functions/UserAPI";
import { FaInfo } from "react-icons/fa6";
import { Department } from "../../interfaces/Department";
import { getAllDepartment } from "../../functions/DepartmentAPI";
import { useStore as useUsers } from "../../store/UsersStore"

interface ModalEmployeesProps {
    employee: UserAuth0Get,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    isNew: boolean
}

export default function ModalEmployeesAbm({ employee, open, setOpen, isNew }: ModalEmployeesProps) {
    const { users } = useUsers()

    const employeePostInitialState: UserAuth0Post = {
        email: "email@example.com",
        user_metadata: {
            phone_number: 0,
            address: {
                department: "Ciudad",
                number: 0,
                street: ""
            },
            roleToAdd: "",
            state: "De alta"
        },
        given_name: '',
        family_name: '',
        name: '',
        password: 'password',
        connection: 'Username-Password-Authentication',
    }

    const [departments, setDepartments] = useState<Department[]>([])
    const [isConnectionDeleted, setIsConnectionDeleted] = useState<boolean>(false)
    const [isConfirmButtonPressed, setIsConfirmButtonPressed] = useState<boolean>(false)
    const [employeePost, setEmployeePost] = useState<UserAuth0Post>(employeePostInitialState)
    const [userId, setUserId] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('password')

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        setEmployeePost({
            ...employeePost,
            email: employee.email,
            user_metadata: { ...employee.user_metadata, roleToAdd: employee.role != "" ? employee.role : "Cajero" },
            given_name: employee.given_name,
            family_name: employee.family_name,
            name: `${employee.given_name} ${employee.family_name}`,
        })
        setUserId(employee.user_id)
    }, [employee])

    useEffect(() => {
        if (!isNew && !isConnectionDeleted) {
            const newEmployeePost = { ...employeePost }
            delete newEmployeePost.connection
            delete newEmployeePost.password
            setEmployeePost(newEmployeePost)
            setIsConnectionDeleted(true)
        }
    }, [employeePost])

    const getDepartments = async () => {
        const response = await getAllDepartment()
        setDepartments(response)
    }

    useEffect(() => {
        getDepartments()
    }, [])

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeePost({ ...employeePost, given_name: event.target.value, name: `${event.target.value} ${employeePost.family_name}` })
    }

    const handleChangeFamilyName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeePost({ ...employeePost, family_name: event.target.value, name: `${employeePost.given_name} ${event.target.value}` })
    }

    const handleChangeStreet = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeePost({
            ...employeePost,
            user_metadata: {
                ...employeePost.user_metadata,
                address: {
                    ...employeePost.user_metadata.address,
                    street: event.target.value
                }
            }
        })
    }

    const handleChangeAddressNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeePost({
            ...employeePost,
            user_metadata: {
                ...employeePost.user_metadata,
                address: {
                    ...employeePost.user_metadata.address,
                    number: Number(event.target.value)
                }
            }
        })
    }

    const handleChangeDepartment = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEmployeePost({
            ...employeePost,
            user_metadata: {
                ...employeePost.user_metadata,
                address: {
                    ...employeePost.user_metadata.address,
                    department: event.target.value
                }
            }
        })
    }

    const handleChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeePost({ ...employeePost, user_metadata: { ...employeePost.user_metadata, phone_number: Number(event.target.value) } })
    }

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeePost({ ...employeePost, email: event.target.value as Email })
    }

    const handleChangeRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEmployeePost({ ...employeePost, user_metadata: { ...employeePost.user_metadata, roleToAdd: event.target.value } })
    }

    const handleChangeState = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEmployeePost({ ...employeePost, user_metadata: { ...employeePost.user_metadata, state: event.target.value } })
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeePost({ ...employeePost, password: event.target.value })
    }

    const handleChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value)
    }

    const handleConfirm = async () => {
        setIsConfirmButtonPressed(true)
        if (isNew === true) {
            await createUserAuth0(employeePost)
        } else {
            await removeRoleToUser(employee)
            await addRoleToUser(employeePost, userId)
            await updateUserAuth0(employeePost, userId)
        }
        setTimeout(() => window.location.reload(), 1500)
    }

    const [phoneNumberAnchorEl, setPhoneNumberAnchorEl] = useState<HTMLButtonElement | null>(null);

    const openPhoneNumberPopover = Boolean(phoneNumberAnchorEl);

    const handleClickPhoneNumberPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPhoneNumberAnchorEl(event.currentTarget);
    };

    const handleClosePhoneNumberPopover = () => {
        setPhoneNumberAnchorEl(null);
    };

    const [emailAnchorEl, setEmailAnchorEl] = useState<HTMLButtonElement | null>(null);

    const openEmailPopover = Boolean(emailAnchorEl);

    const handleClickEmailPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setEmailAnchorEl(event.currentTarget);
    };

    const handleCloseEmailPopover = () => {
        setEmailAnchorEl(null);
    };

    const [passwordAnchorEl, setPasswordAnchorEl] = useState<HTMLButtonElement | null>(null);

    const openPasswordPopover = Boolean(passwordAnchorEl);

    const handleClickPasswordPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPasswordAnchorEl(event.currentTarget);
    };

    const handleClosePasswordPopover = () => {
        setPasswordAnchorEl(null);
    };

    return (
        <>
            <Toaster position="top-center" richColors visibleToasts={1} />
            <Modal
                open={open}
                onClose={handleClose}
                slotProps={{
                    backdrop: {
                        timeout: 300,
                    },
                }}
                disableScrollLock={true}
            >
                <Fade in={open}>
                    <Box className='modalEmployeesAbm__box'>
                        <h3 className="modalEmployeesAbm__h3">
                            {
                                isNew === true ?
                                    "Añadir empleado" :
                                    "Modificar empleado"
                            }
                        </h3>

                        <div className="modalEmployeesAbm__div">
                            <h5 className="modalEmployeesAbm__h5">Nombre del empleado</h5>
                            <input type="text"
                                className="modalEmployeesAbm__input"
                                defaultValue={employee.given_name}
                                onChange={handleChangeName}
                                placeholder="Ingrese el nombre del empleado"
                            />
                        </div>

                        <div className="modalEmployeesAbm__div">
                            <h5 className="modalEmployeesAbm__h5">Apellido del empleado</h5>
                            <input type="text"
                                className="modalEmployeesAbm__input"
                                defaultValue={employee.family_name}
                                onChange={handleChangeFamilyName}
                                placeholder="Ingrese el apellido del empleado"
                            />
                        </div>

                        <div className="modalEmployeesAbm__div">
                            <h5 className="modalEmployeesAbm__h5">Calle de la dirección del empleado</h5>
                            <input type="text"
                                className="modalEmployeesAbm__input"
                                defaultValue={employee.user_metadata?.address.street}
                                onChange={handleChangeStreet}
                                placeholder="Ingrese la calle de la dirección"
                            />
                        </div>

                        <div className="modalEmployeesAbm__div">
                            <h5 className="modalEmployeesAbm__h5" >Número de la dirección del empleado
                            </h5>
                            <input type="number"
                                className="modalEmployeesAbm__input"
                                defaultValue={employee.user_metadata?.address.number}
                                onChange={handleChangeAddressNumber}
                                placeholder="Ingrese el teléfono del empleado"
                            />
                        </div>

                        <div className="modalEmployeesAbm__div">
                            <h5 className="modalEmployeesAbm__h5">Departamento de la dirección del empleado</h5>
                            <select
                                className="modalEmployeesAbm__select"
                                defaultValue={employee.user_metadata?.address.department}
                                onChange={handleChangeDepartment}
                                placeholder="Ingrese el departamento del empleado"
                            >
                                {departments.map((department: Department) => (
                                    <option value={department.name} key={department.id}>{department.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="modalEmployeesAbm__div">
                            <h5 className="modalEmployeesAbm__h5 modalEmployeesAbm__h5--popover" >Teléfono del empleado
                                <button onClick={handleClickPhoneNumberPopover} className="modalEmployeesAbm__popover__button">
                                    <h6 className="modalEmployeesAbm__h5">
                                        <FaInfo className="modalEmployeesAbm__popover__icon"></FaInfo>
                                    </h6>
                                </button>
                                <Popover
                                    className="modalEmployeesAbm__popover__container"
                                    open={openPhoneNumberPopover}
                                    anchorEl={phoneNumberAnchorEl}
                                    onClose={handleClosePhoneNumberPopover}
                                    anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'center',
                                        horizontal: 'left',
                                    }}
                                >
                                    <div className="modalEmployeesAbm__popover__div">
                                        <p>
                                            El número de teléfono debe estar compuesto por
                                            10 números (código de área + número de abonado).
                                        </p>
                                    </div>
                                </Popover>
                            </h5>
                            <input type="number"
                                className="modalEmployeesAbm__input"
                                defaultValue={employee.user_metadata?.phone_number}
                                onChange={handleChangePhoneNumber}
                                placeholder="Ingrese el teléfono del empleado"
                            />
                        </div>

                        <div className="modalEmployeesAbm__div">
                            <h5 className="modalEmployeesAbm__h5 modalEmployeesAbm__h5--popover">Email del empleado
                                <button onClick={handleClickEmailPopover} className="modalEmployeesAbm__popover__button">
                                    <h6 className="modalEmployeesAbm__h5">
                                        <FaInfo className="modalEmployeesAbm__popover__icon"></FaInfo>
                                    </h6>
                                </button>
                                <Popover
                                    className="modalEmployeesAbm__popover__container"
                                    open={openEmailPopover}
                                    anchorEl={emailAnchorEl}
                                    onClose={handleCloseEmailPopover}
                                    anchorOrigin={{
                                        vertical: 'center',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'center',
                                        horizontal: 'left',
                                    }}
                                >
                                    <div className="modalEmployeesAbm__popover__div">
                                        <p>
                                            El email debe cumplir con el siguiente formato: "[texto]@[texto].com"
                                        </p>
                                    </div>
                                </Popover>
                            </h5>
                            <input type="text"
                                className="modalEmployeesAbm__input"
                                defaultValue={employee.email}
                                onChange={handleChangeEmail}
                                placeholder="Ingrese el email del empleado"
                            />
                        </div>

                        <div className="modalEmployeesAbm__div">
                            <h5 className="modalEmployeesAbm__h5">Rol del empleado</h5>
                            <select
                                className="modalEmployeesAbm__select"
                                defaultValue={employee.role}
                                onChange={handleChangeRole}
                            >
                                <option value="Cajero">Cajero</option>
                                <option value="Cocinero">Cocinero</option>
                                <option value="Delivery">Delivery</option>
                            </select>
                        </div>

                        {isNew ?
                            <>
                                <div className="modalEmployeesAbm__div">
                                    <h5 className="modalEmployeesAbm__h5 modalEmployeesAbm__h5--popover">Contraseña provisoria
                                        <button onClick={handleClickPasswordPopover} className="modalEmployeesAbm__popover__button">
                                            <h6 className="modalEmployeesAbm__h5">
                                                <FaInfo className="modalEmployeesAbm__popover__icon"></FaInfo>
                                            </h6>
                                        </button>
                                        <Popover
                                            className="modalEmployeesAbm__popover__container"
                                            open={openPasswordPopover}
                                            anchorEl={passwordAnchorEl}
                                            onClose={handleClosePasswordPopover}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'center',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <div className="modalEmployeesAbm__popover__div">
                                                <p>
                                                    La contraseña debe tener:
                                                </p>
                                                <ul>
                                                    <li>Mínimo 8 caracteres de largo.</li>
                                                    <li>Al menos una letra minúscula (a-z).</li>
                                                    <li>Al menos una letra mayúscula (A-Z).</li>
                                                    <li>Al menos un caracter especial (!@#$%^&*-).</li>
                                                </ul>
                                            </div>
                                        </Popover>
                                    </h5>
                                    <input type="text"
                                        className="modalEmployeesAbm__input"
                                        onChange={handleChangePassword}
                                        placeholder={isNew ? "Ingrese una contraseña para el empleado" : "No puede cambiar la contraseña"}
                                        disabled={isNew ? false : true}
                                    />
                                </div>

                                <div className="modalEmployeesAbm__div">
                                    <h5 className="modalEmployeesAbm__h5">Confirmar contraseña</h5>
                                    <input type="text"
                                        className="modalEmployeesAbm__input"
                                        onChange={handleChangeConfirmPassword}
                                        placeholder={isNew ? "Confirme la contraseña" : "No puede cambiar la contraseña"}
                                        disabled={isNew ? false : true}
                                    />
                                </div>
                            </> :
                            <>
                                <div className="modalEmployeesAbm__div">
                                    <h5 className="modalEmployeesAbm__h5">Estado del empleado</h5>
                                    <select
                                        className="modalEmployeesAbm__select"
                                        defaultValue={employee.user_metadata.state}
                                        onChange={handleChangeState}
                                    >
                                        <option value="De alta">De alta</option>
                                        <option value="De baja">De baja</option>
                                    </select>
                                </div>

                            </>
                        }

                        <div className="modalEmployeesAbm__buttons">
                            <button className="modalEmployeesAbm__button" onClick={() => { handleClose() }}>Cancelar</button>
                            <button className="modalEmployeesAbm__button" disabled={isConfirmButtonPressed ? true : false}
                                onClick={function () {
                                    const passwordValidate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&-])[A-Za-z\d!@#$%^&-]{8,}$/;
                                    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                    if (employeePost.given_name === "") {
                                        toast.error('El campo del nombre no puede estar vacío.')
                                    } else if (employeePost.family_name === "") {
                                        toast.error('El campo del apellido no puede estar vacío.')
                                    } else if (employeePost.user_metadata.address.street === "") {
                                        toast.error('El campo del nombre de la calle no puede estar vacío.')
                                    } else if (employeePost.user_metadata.address.number === 0) {
                                        toast.error('El campo del número de la dirección no puede ser "0".')
                                    } else if (employeePost.user_metadata.phone_number.toString().length != 10) {
                                        toast.error('El número de teléfono es inválido.')
                                    } else if (employeePost.email && ((emailValidate.test(employeePost.email) === false) || !(employeePost.email.endsWith(".com")))) {
                                        toast.error('El email es inválido.')
                                    } else if (users?.find(user => user.email === employeePost.email) != null) {
                                        toast.error('El email ya está asignado a otro usuario.')
                                    } else if (isNew && employeePost.password && (passwordValidate.test(employeePost.password) === false)) {
                                        toast.error('La contraseña es inválida.')
                                    } else if (isNew && employeePost.password != confirmPassword) {
                                        toast.error('Las contraseñas no coinciden.')
                                    } else {
                                        handleConfirm()
                                    }
                                }}
                            >{isConfirmButtonPressed ? "Cargando..." : "Confirmar"}</button>
                        </div>
                    </Box>
                </Fade>
            </Modal >
        </>
    )
}
