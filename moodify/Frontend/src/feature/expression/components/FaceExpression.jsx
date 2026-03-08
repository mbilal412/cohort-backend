import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/util";
import '../styles/FaceExpression.scss';

export default function FaceExpression({ onClick }){
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Detecting...");

    const handleClick = ()=>{
        const expression = detect({ videoRef, landmarkerRef, setExpression })
        console.log(expression)
        onClick(expression)
    }



    useEffect(() => {


        init({
            videoRef,
            landmarkerRef,
            streamRef
        });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <div className="face-expression-container">
            <video
                ref={videoRef}
                className="camera-feed"
                playsInline
            />
            <h2 className="expression-title">{expression}</h2>
            <button className="detect-btn" onClick={handleClick} >Detect expression</button>
        </div>
    );
}