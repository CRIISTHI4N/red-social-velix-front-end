import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const Post = ({ publicacion, URL_BACK_END }) => {

    const url = (publicacion.imgUrl.slice(29));
    const [asd, setAsd] = useState('')

    const asdf = async () => {
        const response = await axios.get(`${URL_BACK_END}/images/${url}`, {
            responseType: 'arraybuffer',
        })

        const imageData = response.data;
        const imageBlob = new Blob([imageData], { type: 'image/png' });
        const imageUrl = URL.createObjectURL(imageBlob);
        setAsd(imageUrl)
    }

    useEffect(() => {
        asdf();
    }, [])

    return (
        <div
            className="w-full bg-slate-900 relative group"
        >
            {asd ? (

                <Image
                    src={`${asd}`}
                    alt=""
                    width={400}
                    height={200}
                    className="w-full group-hover:opacity-60 object-cover aspect-square"
                />
            )
                : 'cargando...'
            }

            <p className="opacity-0 absolute top-[45%] left-[40%] font-bold text-xl text-white transition duration-0 ease-in-out group-hover:opacity-100 flex gap-2">
                <span>{publicacion.likes}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            </p>
        </div>
    )
}
