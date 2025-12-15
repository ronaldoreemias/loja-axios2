import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loja from "./page/Loja";

function Approuter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Loja/>} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Approuter;