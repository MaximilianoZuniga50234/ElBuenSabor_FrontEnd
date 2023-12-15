import { Box, Fade, Modal, Popover } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { UserAuth0Post } from "../../interfaces/UserAuth0";
import { useStore as useCurrentUser } from "../../store/CurrentUserStore"
import { getAllDepartment } from "../../functions/DepartmentAPI";
import { Department } from "../../interfaces/Department";
import { FaInfo } from "react-icons/fa6";
import { updateUserAuth0 } from "../../functions/UserAPI";

interface ModalEditProfileProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
}


export default function ModalEditProfile({ open, setOpen }: ModalEditProfileProps) {

    const { user } = useCurrentUser()

    const userPostInitialState: UserAuth0Post = {
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
        password: '',
    }

    const [userPost, setUserPost] = useState<UserAuth0Post>(userPostInitialState)
    const [userId, setUserId] = useState<string>('')
    const [departments, setDepartments] = useState<Department[]>([])
    const [isConfirmButtonPressed, setIsConfirmButtonPressed] = useState<boolean>(false)
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [isPasswordDeleted, setIsPasswordDeleted] = useState<boolean>(false)

    const handleClose = () => {
        setOpen(false)
    }

    const getDepartments = async () => {
        const response = await getAllDepartment()
        setDepartments(response)
    }

    useEffect(() => {
        getDepartments()
    }, []);


    useEffect(() => {
        if (isPasswordDeleted) {
            updateUserAuth0(userPost, userId)
        }
    }, [isPasswordDeleted]);


    useEffect(() => {
        if (user) {
            setUserPost({
                ...userPost,
                user_metadata: { ...user.user_metadata, address: { ...user.user_metadata.address, department: user?.user_metadata?.address?.department != "" ? user?.user_metadata?.address?.department : "Ciudad" } },
                given_name: user.given_name,
                family_name: user.family_name,
                name: `${user.given_name} ${user.family_name}`,
            })
            setUserId(user.user_id)
        }
    }, [user])


    useEffect(() => {
        console.log(userPost)
    }, [userPost])


    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserPost({ ...userPost, given_name: event.target.value, name: `${event.target.value} ${userPost.family_name}` })
    }

    const handleChangeFamilyName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserPost({ ...userPost, family_name: event.target.value, name: `${userPost.given_name} ${event.target.value}` })
    }

    const handleChangeStreet = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserPost({
            ...userPost,
            user_metadata: {
                ...userPost.user_metadata,
                address: {
                    ...userPost.user_metadata.address,
                    street: event.target.value
                }
            }
        })
    }

    const handleChangeAddressNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserPost({
            ...userPost,
            user_metadata: {
                ...userPost.user_metadata,
                address: {
                    ...userPost.user_metadata.address,
                    number: Number(event.target.value)
                }
            }
        })
    }

    const handleChangeDepartment = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUserPost({
            ...userPost,
            user_metadata: {
                ...userPost.user_metadata,
                address: {
                    ...userPost.user_metadata.address,
                    department: event.target.value
                }
            }
        })
    }

    const handleChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserPost({ ...userPost, user_metadata: { ...userPost.user_metadata, phone_number: Number(event.target.value) } })
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserPost({ ...userPost, password: event.target.value })
    }

    const handleChangeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value)
    }

    const handleConfirm = async () => {
        setIsConfirmButtonPressed(true)
        if (userPost.password === "") {
            const newUserPost = { ...userPost }
            delete newUserPost.password
            setUserPost(newUserPost)
            setIsPasswordDeleted(true)
        } else {
            await updateUserAuth0(userPost, userId)
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
                    <Box className='modalEditProfile__box'>
                        <h3 className="modalEditProfile__h3">
                            Modificar datos
                        </h3>

                        <div className="modalEditProfile__div">
                            <h5 className="modalEditProfile__h5">Nombre</h5>
                            <input type="text"
                                className="modalEditProfile__input"
                                defaultValue={user?.given_name}
                                onChange={handleChangeName}
                                placeholder="Ingrese el apellido"
                            />
                        </div>

                        <div className="modalEditProfile__div">
                            <h5 className="modalEditProfile__h5">Apellido</h5>
                            <input type="text"
                                className="modalEditProfile__input"
                                defaultValue={user?.family_name}
                                onChange={handleChangeFamilyName}
                                placeholder="Ingrese el apellido"
                            />
                        </div>

                        <div className="modalEditProfile__div">
                            <h5 className="modalEditProfile__h5">Calle de la dirección</h5>
                            <input type="text"
                                className="modalEditProfile__input"
                                defaultValue={user?.user_metadata?.address?.street}
                                onChange={handleChangeStreet}
                                placeholder="Ingrese la calle de la dirección"
                            />
                        </div>

                        <div className="modalEditProfile__div">
                            <h5 className="modalEditProfile__h5">Número de la dirección</h5>
                            <input type="text"
                                className="modalEditProfile__input"
                                defaultValue={user?.user_metadata?.address?.number}
                                onChange={handleChangeAddressNumber}
                                placeholder="Ingrese el número de la calle"
                            />
                        </div>

                        <div className="modalEditProfile__div">
                            <h5 className="modalEditProfile__h5">Departamento de la dirección</h5>
                            <select
                                className="modalEditProfile__select"
                                defaultValue={user?.user_metadata?.address?.department}
                                onChange={handleChangeDepartment}
                                placeholder="Ingrese el departamento del cliente"
                            >
                                {departments.map((department: Department) => (
                                    <option value={department.name} key={department.id}>{department.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="modalEditProfile__div">
                            <h5 className="modalEditProfile__h5 modalEditProfile__h5--popover" >Teléfono
                                <button onClick={handleClickPhoneNumberPopover} className="modalEditProfile__popover__button">
                                    <h6 className="modalEditProfile__h5">
                                        <FaInfo className="modalEditProfile__icon"></FaInfo>
                                    </h6>
                                </button>
                                <Popover
                                    className="modalEditProfile__popover__container"
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
                                    <div className="modalEditProfile__popover__div">
                                        <p>
                                            El número de teléfono debe estar compuesto por
                                            10 números (código de área + número de abonado).
                                        </p>
                                    </div>
                                </Popover>
                            </h5>
                            <input type="number"
                                className="modalEditProfile__input"
                                defaultValue={user?.user_metadata?.phone_number}
                                onChange={handleChangePhoneNumber}
                                placeholder="Ingrese el teléfono"
                            />
                        </div>

                        <div className="modalEditProfile__div">
                            <h5 className="modalEditProfile__h5 modalEditProfile__h5--popover">Contraseña nueva
                                <button onClick={handleClickPasswordPopover} className="modalEditProfile__popover__button">
                                    <h6 className="modalEditProfile__h5">
                                        <FaInfo className="modalEditProfile__popover__icon"></FaInfo>
                                    </h6>
                                </button>
                                <Popover
                                    className="modalEditProfile__popover__container"
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
                                    <div className="modalEditProfile__popover__div">
                                        <p>
                                            La contraseña debe tener:
                                        </p>
                                        <ul>
                                            <li>Mínimo 8 caracteres de largo.</li>
                                            <li>Al menos una letra minúscula (a-z).</li>
                                            <li>Al menos una letra mayúscula (A-Z).</li>
                                            <li>Al menos un caracter especial (!@#$%^&*-).</li>
                                            <li>Nota: No es obligatorio colocar una nueva contraseña.</li>
                                        </ul>
                                    </div>
                                </Popover>
                            </h5>
                            <input type="text"
                                className="modalEditProfile__input"
                                onChange={handleChangePassword}
                                placeholder="Ingrese la nueva contraseña"
                            />
                        </div>

                        <div className="modalEditProfile__div">
                            <h5 className="modalEditProfile__h5">Confirmar contraseña</h5>
                            <input type="text"
                                className="modalEditProfile__input"
                                onChange={handleChangeConfirmPassword}
                                placeholder="Confirme la contraseña"
                            />
                        </div>

                        <div className="modalEditProfile__buttons">
                            <button className="modalEditProfile__button" onClick={() => { handleClose() }}>Cancelar</button>
                            <button className="modalEditProfile__button" disabled={isConfirmButtonPressed ? true : false}
                                onClick={function () {
                                    const passwordValidate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&-])[A-Za-z\d!@#$%^&-]{8,}$/;

                                    if (userPost.given_name === "" || userPost.given_name === undefined) {
                                        toast.error('El campo del nombre no puede estar vacío.')
                                    } else if (userPost.family_name === "" || userPost.family_name === undefined) {
                                        toast.error('El campo del apellido no puede estar vacío.')
                                    } else if (userPost.user_metadata.address.street === "") {
                                        toast.error('El campo del nombre de la calle no puede estar vacío.')
                                    } else if (userPost.user_metadata.address.number === 0) {
                                        toast.error('El campo del número de la dirección no puede ser "0".')
                                    } else if (userPost.user_metadata.phone_number.toString().length != 10 || userPost.user_metadata.phone_number === undefined) {
                                        toast.error('El número de teléfono es inválido.')
                                    } else if (userPost.password != "") {
                                        if (userPost.password && (passwordValidate.test(userPost.password) === false)) {
                                            toast.error('La contraseña es inválida.')
                                        } else if (userPost.password != confirmPassword) {
                                            toast.error('Las contraseñas no coinciden.')
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
