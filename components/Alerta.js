
export const Alerta = ({ alerta }) => {
    return (
        <div className={`${alerta.alerta ? 'bg-red-500' : 'bg-green-500'} w-full text-center p-3 rounded mb-3`}>
            <p className="text-white">{alerta.msg}</p>
        </div>
    )
}
