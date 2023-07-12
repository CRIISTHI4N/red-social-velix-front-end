import Image from "next/image"
import { useState, useEffect } from "react";
import axios from "axios";

export const Publicacion = ({ publicacion, URL_BACK_END }) => {

    // const [changeStateLike, setChangeStateLike] = useState(true)

    const { _id, likes, description, user } = publicacion

    const url = (publicacion.imgUrl.slice(29));
    const [urlImage, setUrlImage] = useState('')

    const mostrarImg = async () => {
        const response = await axios.get(`${URL_BACK_END}/images/${url}`, {
            responseType: 'arraybuffer',
        })

        const imageData = response.data;
        const imageBlob = new Blob([imageData], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(imageBlob);
        setUrlImage(imageUrl)
    }

    useEffect(() => {
        mostrarImg();
    }, [])

    return (
        <div className="bg-stone-900 text-white mb-4 rounded-xl border border-stone-500 max-w-[500px] m-auto">
            <div className='flex gap-2 p-3 border-b border-b-stone-500'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white font-bold">{user.user}</span>
            </div>

            <div>

                {urlImage && (
                    <Image
                        src={`${urlImage}`}
                        alt=""
                        width={500}
                        height={10}
                        className="w-full"
                    />
                )}

            </div>

            <div className="p-4">
                {/* <div className="mb-3">
                    <div className=" flex items-center gap-3 pb-3">
                        <button
                        onClick={changeLike}
                        >
                            {
                                changeStateLike
                                    ? <i className="fa-regular fa-heart text-2xl"></i>
                                    : <i className="fa-solid fa-heart text-2xl text-red-500"></i>
                            }

                        </button>
                    </div>

                    <span>{likes} Me Gusta</span>
                </div> */}
                <p>{description}</p>
            </div>
        </div>
    )
}
