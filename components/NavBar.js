import { useState } from "react";
import Link from "next/link"
import Image from "next/image";
import Modal from 'react-modal';
import { useUsuario } from "@/hooks/useUsuario";
import axios from "axios";

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(6, 6, 6, 0.75)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        border: 'none',
        background: '#262626',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '10px',
        padding: '0px',
        maxWidth: '380px'
    },
};

Modal.setAppElement('#__next');

export const NavBar = ({ URL_BACK_END }) => {

    const [modalPost, setModalPost] = useState(false);
    const [modalSesion, setModalSesion] = useState(false);
    const [image, setImage] = useState('');
    const [srcImage, setSrcImage] = useState('')
    const [showImage, setShowImage] = useState(false)
    const [description, setDescription] = useState('')
    const { cerrarSesion, usuario } = useUsuario();

    const changeModalPost = () => {
        setModalPost(!modalPost)
        setShowImage(false)
        setSrcImage('')
    }

    const changeModalSesion = () => {
        setModalSesion(!modalSesion)
    }

    const handleSelectImage = e => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            setImage(e.target.files[0])

            reader.onload = () => {
                setSrcImage(reader.result);
                setShowImage(true);
            };

            reader.readAsDataURL(file);
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {

            await axios.post(`${URL_BACK_END}/usuario/publicacion`, {
                description, user: usuario._id, image
            }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            setModalPost(false)

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="w-full bg-stone-900 fixed bottom-0 rounded-t-xl">
            <nav className="flex justify-between text-white max-w-[800px] m-auto">
                <Link
                    href="/inicio"
                    className="flex flex-col justify-center items-center p-3"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span className="text-sm">Inicio</span>
                </Link>

                <button
                    className="flex flex-col justify-center items-center p-3"
                    onClick={changeModalPost}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Postear</span>
                </button>

                <Link
                    href="/perfil"
                    className="flex flex-col justify-center items-center p-3"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">Perfil</span>
                </Link>

                <button
                    className="flex flex-col justify-center items-center p-3"
                    onClick={changeModalSesion}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                    <span className="text-sm">Más</span>
                </button>
            </nav>


            <Modal
                isOpen={modalSesion}
                style={customStyles}
            >

                <button
                    type="button"
                    onClick={cerrarSesion}
                    className="px-7 py-3 hover:bg-stone-700 text-red-500 font-bold w-full"
                >
                    Cerrar Sesion
                </button>

                <button
                    onClick={changeModalSesion}
                    className=" text-white w-full flex justify-center py-3 mt-5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </Modal>


            <Modal
                isOpen={modalPost}
                style={customStyles}
            >
                <h2 className="text-white border-b border-b-stone-500 p-3 text-center">Crea una nueva publicacion</h2>

                <button
                    id="upload-button"
                    onClick={() =>
                        document.getElementById('file-input').click()
                    }
                    className="text-white font-semibold px-6 py-2 bg-sky-600 rounded-lg block m-auto my-3"
                >
                    Seleccionar Archivo
                </button>

                <input
                    type="file"
                    id="file-input"
                    className="hidden"
                    onChange={handleSelectImage}
                    name="image"
                />

                {
                    showImage && (
                        <>
                            <Image
                                src={`${srcImage}`}
                                alt={`${srcImage}`}
                                width={300}
                                height={400}
                            />

                            <form
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                                method="post"
                            >

                                <input
                                    type="text"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    className="w-full text-gray-800 p-2 placeholder:text-black outline-none"
                                    placeholder="Descripción"
                                />

                                <input
                                    type="submit"
                                    value="Postear"
                                    className="w-full cursor-pointer hover:hover:bg-stone-700 my-3 p-2 font-bold text-white"
                                />
                            </form>
                        </>
                    )
                }

                <button
                    onClick={changeModalPost}
                    className=" text-white w-full flex justify-center p-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </Modal>
        </div >
    )
}
