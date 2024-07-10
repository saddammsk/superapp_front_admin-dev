"use client"

import { useEffect, useState } from "react"
import { getPreferences, createPreferences, updatePreferences } from '@/services/PreferencesService';
import { getDecodedToken } from "@/utils/utils";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

export default function Settings () {

    const [image, setImage] = useState(true);
    const [text, setText] = useState(true);
    const [signature, setSiganture] = useState(true);
    const [font, setFont] = useState('Arial');
    const [fontSize, setFontSize] = useState(12)
    const [createdId, setCreatedId] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        setLoading(true)
        getPreferences().then((response)=>{
            let data = response.data.find((item: any)=>item.type_preferences === 'signature')

            if(data){
                console.log(response.data)
                console.log(data)
                setCreatedId(data.id)
                setImage(data.settings.activated.image)
                setText(data.settings.activated.text)
                setSiganture(data.settings.activated.signature)
                setFont(data.settings.textProperties.letter)
                setFontSize(data.settings.textProperties.size)
            }
            setLoading(false)
            
        }).catch((error)=>{
            setCreatedId(null)
        })
    }, [])

    const handleSave = () => {
        if(createdId == null){
            const decodeToken = getDecodedToken();
            createPreferences({
                "acc_id":decodeToken.acc_id,
                "type_preferences": "signature",
                "settings":{
                    "activated":{
                        "image": image,
                        "text": text,
                        "signature": signature
                    },
                    "textProperties":{"letter":font, "size":fontSize}
                }
            }).then((response)=>{
                toast.success("Registrado correctamente")
            }).catch((error)=>{
                toast.error("Error al registrar")
            })
        } else {
            const decodeToken = getDecodedToken();
            updatePreferences({
                "type_preferences": "signature",
                "settings":{
                    "activated":{
                        "image": image,
                        "text": text,
                        "signature": signature
                    },
                    "textProperties":{"letter":font, "size":fontSize}
                }
            }, createdId).then((response)=>{
                toast.success("Registrado correctamente")
            }).catch((error)=>{
                toast.error("Error al registrar")
            })
        }
    }

    return <>{loading?<div className="flex items-center justify-center mb-4">
    <ClipLoader
      color={"#8049D7"}
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>:<div>
        <div className="mb-2">
            Modos de firma:
            <div>
                <input id="checkbox-1" type="checkbox" checked={image} onChange={(e)=>setImage(e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checkbox-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Imagen</label>
            </div>
            <div>
                <input id="checkbox-1" type="checkbox" checked={text} onChange={(e)=>setText(e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checkbox-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Texto</label>
            </div>
            <div>
                <input id="checkbox-1" type="checkbox" checked={signature} onChange={(e)=>setSiganture(e.target.checked)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checkbox-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Firma</label>
            </div>
        </div>
        <div>
            Fuente de texto de firma
            <div className="mb-5">
                <label htmlFor="font_types" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione un tipo de fuente</label>
                <select value={font} onChange={(e)=>setFont(e.target.value)} id="font_types" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={'Arial'}>Arial</option>
                </select>
            </div>
        </div>
        <div>
            Tamaño de texto de firma
            <div className="mb-5">
                <label htmlFor="font_size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese el tamaño de texto</label>
                <input value={fontSize} onChange={(e)=>setFontSize(Number(e.target.value))} type="number" id="font_size" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ejem. 12" required />
            </div>
        </div>
        <button onClick={handleSave} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar cambios</button>
    </div>}</>
}