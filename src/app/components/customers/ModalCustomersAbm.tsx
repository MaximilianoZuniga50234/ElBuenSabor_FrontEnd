import { Toaster, toast } from "sonner";
import { Box, Fade, Modal, Popover } from "@mui/material";
import { Email, UserAuth0Get, UserAuth0Post } from "../../interfaces/UserAuth0";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getUsersAuth0, updateUserAuth0 } from "../../functions/UserAPI";
import { FaInfo } from "react-icons/fa6";
import { Department } from "../../interfaces/Department";
import { getAllDepartment } from "../../functions/DepartmentAPI";

interface ModalCustomersProps {
    customer: UserAuth0Get,
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}

export default function ModalCustomersAbm({ customer, open, setOpen }: ModalCustomersProps) {

    const [allUsers, setAllUsers] = useState<UserAuth0Get[]>([]);

    const getAllUsers = async () => {
        const response = await getUsersAuth0()
        setAllUsers(response)
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const customerPostInitialState: UserAuth0Post = {
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
        connection: 'Username-Password-Authentication',
    }

    const [departments, setDepartments] = useState<Department[]>([])
    const [isConnectionDeleted, setIsConnectionDeleted] = useState<boolean>(false)
    const [isConfirmButtonPressed, setIsConfirmButtonPressed] = useState<boolean>(false)
    const [customerPost, setCustomerPost] = useState<UserAuth0Post>(customerPostInitialState)
    const [userId, setUserId] = useState<string>('')

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        setCustomerPost({
            ...customerPost,
            email: customer.email,
            user_metadata: { ...customer.user_metadata, address: { ...customer.user_metadata.address, department: customer.user_metadata.address.department != "" ? customer.user_metadata.address.department : "Ciudad" } },
            given_name: customer.given_name,
            family_name: customer.family_name,
            name: `${customer.given_name} ${customer.family_name}`,
        })
        setUserId(customer.user_id)
    }, [customer])

    useEffect(() => {
        console.log(customerPost)
        if (!isConnectionDeleted) {
            const newCustomerPost = { ...customerPost }
            delete newCustomerPost.connection
            setCustomerPost(newCustomerPost)
            setIsConnectionDeleted(true)
        }
    }, [customerPost])

    const getDepartments = async () => {
        const response = await getAllDepartment()
        setDepartments(response)
    }

    useEffect(() => {
        getDepartments()
    }, [])

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerPost({ ...customerPost, given_name: event.target.value, name: `${event.target.value} ${customerPost.family_name}` })
    }

    const handleChangeFamilyName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerPost({ ...customerPost, family_name: event.target.value, name: `${customerPost.given_name} ${event.target.value}` })
    }

    const handleChangeStreet = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerPost({
            ...customerPost,
            user_metadata: {
                ...customerPost.user_metadata,
                address: {
                    ...customerPost.user_metadata.address,
                    street: event.target.value
                }
            }
        })
    }


    const handleChangeAddressNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerPost({
            ...customerPost,
            user_metadata: {
                ...customerPost.user_metadata,
                address: {
                    ...customerPost.user_metadata.address,
                    number: Number(event.target.value)
                }
            }
        })
    }

    const handleChangeDepartment = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCustomerPost({
            ...customerPost,
            user_metadata: {
                ...customerPost.user_metadata,
                address: {
                    ...customerPost.user_metadata.address,
                    department: event.target.value
                }
            }
        })
    }

    const handleChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerPost({ ...customerPost, user_metadata: { ...customerPost.user_metadata, phone_number: Number(event.target.value) } })
    }

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerPost({ ...customerPost, email: event.target.value as Email })
    }

    const handleChangeState = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCustomerPost({ ...customerPost, user_metadata: { ...customerPost.user_metadata, state: event.target.value } })
    }

    const handleConfirm = async () => {
        setIsConfirmButtonPressed(true)
        await updateUserAuth0(customerPost, userId)
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
                    <Box className='modalCustomersAbm__box'>
                        <h3 className="modalCustomersAbm__h3">
                            Modificar cliente
                        </h3>

                        <div className="modalCustomersAbm__div">
                            <h5 className="modalCustomersAbm__h5">Nombre del cliente</h5>
                            <input type="text"
                                className="modalCustomersAbm__input"
                                defaultValue={customer.given_name}
                                onChange={handleChangeName}
                                placeholder="Ingrese el nombre del cliente"
                            />
                        </div>

                        <div className="modalCustomersAbm__div">
                            <h5 className="modalCustomersAbm__h5">Apellido del cliente</h5>
                            <input type="text"
                                className="modalCustomersAbm__input"
                                defaultValue={customer.family_name}
                                onChange={handleChangeFamilyName}
                                placeholder="Ingrese el apellido del cliente"
                            />
                        </div>

                        <div className="modalCustomersAbm__div">
                            <h5 className="modalCustomersAbm__h5">Calle de la dirección del cliente</h5>
                            <input type="text"
                                className="modalCustomersAbm__input"
                                defaultValue={customer.user_metadata?.address.street}
                                onChange={handleChangeStreet}
                                placeholder="Ingrese la calle de la dirección"
                            />
                        </div>

                        <div className="modalCustomersAbm__div">
                            <h5 className="modalCustomersAbm__h5">Número de la dirección del cliente</h5>
                            <input type="text"
                                className="modalCustomersAbm__input"
                                defaultValue={customer.user_metadata?.address.number}
                                onChange={handleChangeAddressNumber}
                                placeholder="Ingrese el número de la calle"
                            />
                        </div>

                        <div className="modalCustomersAbm__div">
                            <h5 className="modalCustomersAbm__h5">Departamento de la dirección del cliente</h5>
                            <select
                                className="modalCustomersAbm__select"
                                defaultValue={customer.user_metadata?.address.department}
                                onChange={handleChangeDepartment}
                                placeholder="Ingrese el departamento del cliente"
                            >
                                {departments.map((department: Department) => (
                                    <option value={department.name} key={department.id}>{department.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="modalCustomersAbm__div">
                            <h5 className="modalCustomersAbm__h5 modalCustomersAbm__h5--popover" >Teléfono del cliente
                                <button onClick={handleClickPhoneNumberPopover} className="modalCustomersAbm__popover__button">
                                    <h6 className="modalCustomersAbm__h5">
                                        <FaInfo className="modalCustomersAbm__popover__icon"></FaInfo>
                                    </h6>
                                </button>
                                <Popover
                                    className="modalCustomersAbm__popover__container"
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
                                    <div className="modalCustomersAbm__popover__div">
                                        <p>
                                            El número de teléfono debe estar compuesto por
                                            10 números (código de área + número de abonado).
                                        </p>
                                    </div>
                                </Popover>
                            </h5>
                            <input type="number"
                                className="modalCustomersAbm__input"
                                defaultValue={customer.user_metadata?.phone_number}
                                onChange={handleChangePhoneNumber}
                                placeholder="Ingrese el teléfono del cliente"
                            />
                        </div>

                        <div className="modalCustomersAbm__div">
                            <h5 className="modalCustomersAbm__h5 modalCustomersAbm__h5--popover">Email del cliente
                                <button onClick={handleClickEmailPopover} className="modalCustomersAbm__popover__button">
                                    <h6 className="modalCustomersAbm__h5">
                                        <FaInfo className="modalCustomersAbm__popover__icon"></FaInfo>
                                    </h6>
                                </button>
                                <Popover
                                    className="modalCustomersAbm__popover__container"
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
                                    <div className="modalCustomersAbm__popover__div">
                                        <p>
                                            El email debe cumplir con el siguiente formato: "[texto]@[texto].com"
                                        </p>
                                    </div>
                                </Popover>
                            </h5>
                            <input type="text"
                                className="modalCustomersAbm__input"
                                defaultValue={customer.email}
                                onChange={handleChangeEmail}
                                placeholder="Ingrese el email del cliente"
                            />
                        </div>

                        <div className="modalCustomersAbm__div">
                            <h5 className="modalCustomersAbm__h5">Estado del cliente</h5>
                            <select
                                className="modalCustomersAbm__select"
                                defaultValue={customer.user_metadata?.state}
                                onChange={handleChangeState}
                            >
                                <option value="De alta">De alta</option>
                                <option value="De baja">De baja</option>
                            </select>
                        </div>

                        <div className="modalCustomersAbm__buttons">
                            <button className="modalCustomersAbm__button" onClick={() => { handleClose() }}>Cancelar</button>
                            <button className="modalCustomersAbm__button" disabled={isConfirmButtonPressed ? true : false}
                                onClick={function () {
                                    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                    if (customerPost.given_name === "" || customerPost.given_name === undefined) {
                                        toast.error('El nombre no puede estar vacío.')
                                    } else if (customerPost.family_name === "" || customerPost.family_name === undefined) {
                                        toast.error('El apellido no puede estar vacío.')
                                    } else if (customerPost.user_metadata.address.street === "") {
                                        toast.error('El campo del nombre de la calle no puede estar vacío.')
                                    } else if (customerPost.user_metadata.address.number === 0) {
                                        toast.error('El campo del número de la dirección no puede ser "0".')
                                    } else if (customerPost.user_metadata.phone_number.toString().length != 10 || customerPost.user_metadata.phone_number === undefined) {
                                        toast.error('El número de teléfono es inválido.')
                                    } else if ((emailValidate.test(customerPost.email) === false) || !(customerPost.email.endsWith(".com"))) {
                                        toast.error('El email es inválido.')
                                    } else
                                        if (customerPost.email != customer.email) {
                                            if (allUsers?.find(user => user.email === customerPost.email) != null) {
                                                toast.error('El email ya está asignado a otro usuario.')
                                            }
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
