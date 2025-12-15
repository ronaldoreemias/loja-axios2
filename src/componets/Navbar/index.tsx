import Style from "./Navbar.module.css";
import { useState } from "react";
import type { FormEvent } from "react";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import carrinho from "../../assets/axios.ico";
import lupa from "../../assets/lupa.ico";
import linkedin from "../../assets/linkedin_logo_square_icon_134016.ico";
import github from "../../assets/github_icon-icons.com_60477.ico";
import whatsapp from "../../assets/whatsapp_logo_icon_153036.ico";


function sanitizeInput(input: string): string | null {
    const s = input.trim();
    if (s.length === 0) return "";
    if (s.length > 200) return s.slice(0, 200);

    const patterns = [
        /</, />/, /<\//, /`/, /;|--/, /\/\*/, /\*\//, /\$/,/\%/,
        /\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|EXEC|UNION)\b/i
    ];

    if (patterns.some((rx) => rx.test(s))) return null;
    return s;
}

function FormFiltrar() {
    const [produto, setProduto] = useState("");

    function filtrar(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const sanitized = sanitizeInput(produto);

        if (sanitized === null) {
            Swal.fire({
                title: 'Entrada inválida',
                text: 'Foram detectados caracteres suspeitos na sua pesquisa.',
                icon: 'error'
            });
            return;
        }

        if (!sanitized) {
            Swal.fire({
                title: 'Ops',
                text: 'Digite algo para pesquisar',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5600,
        });

        Toast.fire({ icon: 'info', title: 'Pesquisando...' });

    }

    return (
        <form id="formulariofiltragem" className={Style.formefiltrar} onSubmit={filtrar}>
            <input
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                type="text"
                id="produto"
                placeholder="digite o produto desejado..."
                className={Style.textoforme}
            />
            <button value="Pesquisar" className={Style.buttonforme} >
                <img src={lupa} />
            </button>
        </form>
    );
}

function Navbar(){
    return(
        <div className={Style.Navbar}>
            <div className={Style.partedecima}>
                <div className={Style.logo}>
                    <img src={carrinho} />
                    <a href="https://axiosn-oticias.vercel.app/">
                        <h1>Loja Axios</h1>
                    </a>
                </div>
                <div className={Style.pesquisa}>
                    <FormFiltrar />
                </div>
                <div className={Style.links}>
                    <a href="https://www.linkedin.com/in/ronaldo-reemias-b66b7a166/">
                        <img src={linkedin} />
                    </a>
                    <a href="https://github.com/ronaldoreemias" >
                        <img src={github} className={Style.github} />
                    </a>
                    <a href="https://chat.whatsapp.com/FivMCudmv1wENlalqeIth0">
                        <img src={whatsapp} className={Style.github} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;