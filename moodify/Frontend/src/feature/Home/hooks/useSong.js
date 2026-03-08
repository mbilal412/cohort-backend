import { getSong } from "../services/song.api";
import { SongContext } from "../Song.context";
import { useContext } from "react";

export const useSong = () => {
 
    const {song, setSong, loading, setLoading} = useContext(SongContext)
    
    async function handleGetSong({mood}){
        try{
            setLoading(true)
            const response = await getSong({mood})
            console.log(response)
            setSong(response.song)
            setLoading(false)
        }catch(error){
            console.log(error.response.data)
        }
    }


    return {
        handleGetSong,
        song,
        loading
    }
}