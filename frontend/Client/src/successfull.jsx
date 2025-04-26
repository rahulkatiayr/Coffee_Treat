import { useLocation } from "react-router-dom";
import tm from "/assets/tm.png";
import "./success.css";

export default function Successfull() {
    const location = useLocation();
    console.log(location);
    return (
        <>
            <h1 className="fadeInText">Congratulation, you got your coffee treat!</h1>
            <h3 className="fadeInText">Order ID: {location.state?.orderId}</h3>
            <h2 className="fadeInText">Successfully Accepted with payment!</h2>

            <img
                src={tm}
                alt="unsplash coffee mug"
                className="ShakingMug"
                style={{ width: "400px", height: "auto", marginTop: "20px" }}
            />
        </>
    );
}
