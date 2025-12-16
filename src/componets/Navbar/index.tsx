import Style from "./Navbar.module.css";
import { useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import carrinho from "../../assets/axios_logo_icon_168545.ico";
import lupa from "../../assets/lupa.ico";
import linkedin from "../../assets/linkedin_logo_square_icon_134016.ico";
import github from "../../assets/github_icon-icons.com_60477.ico";
import whatsapp from "../../assets/whatsapp_logo_icon_153036.ico";

// Função para sanitizar entrada
function sanitizeInput(input: string): string | null {
  const s = input.trim();
  if (s.length === 0) return "";
  if (s.length > 200) return s.slice(0, 200);

  const patterns = [
    /</, />/, /<\//, /`/, /;|--/, /\/\*/, /\*\//, /\$/, /\%/,
    /\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|EXEC|UNION)\b/i
  ];

  if (patterns.some((rx) => rx.test(s))) return null;
  return s;
}

// Interface para tipar os produtos
interface Produto {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  link: string;
  desconto: string;
  preco: string;
  categoria: string;
}

function FormFiltrar() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produto, setProduto] = useState<string>("");
  const [resultados, setResultados] = useState<Produto[]>([]);
  const resultadosRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        resultadosRef.current &&
        !resultadosRef.current.contains(event.target as Node)
      ) {
        setResultados([]); // fecha ao clicar fora
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    fetch("/Dbjason/Produtosvariados.json")
      .then(response => response.json())
      .then(data => {
        setProdutos(data);
      })
      .catch(error => {
        console.error("Erro ao carregar produtos:", error);
      });
  }, []);

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

    const filtrados = produtos.filter(p =>
      p.titulo.toLowerCase().includes(sanitized.toLowerCase()) ||
      p.descricao.toLowerCase().includes(sanitized.toLowerCase())
    );

    setResultados(filtrados);

    if (filtrados.length === 0) {
      Swal.fire({
        title: 'Nenhum resultado',
        text: `Não encontramos produtos para "${sanitized}"`,
        icon: 'info'
      });
    }
  }

  return (
    <div className={Style.naotenhomaiscriatividade}>
      <form id="formulariofiltragem" className={Style.formefiltrar} onSubmit={filtrar}>
        <input
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          type="text"
          id="produto"
          placeholder="digite o produto desejado..."
          className={Style.textoforme}
        />
        <button type="submit" value="Pesquisar" className={Style.buttonforme}>
          <img src={lupa} alt="Pesquisar" />
        </button>
      </form>

      {resultados.length > 0 && (
        <div ref={resultadosRef} className={Style.resultados}>
          {resultados.map(r => (
            <div key={r.id} className={Style.resultadoItem}>
              <a href={r.link} target="_blank" rel="noopener noreferrer">
                <img src={r.imagem} alt={r.titulo} />
                <div className={Style.areatexto}>
                    <h3>{r.titulo}</h3>
                    <p>{r.descricao}</p>
                    <div className={Style.precoContainer}>
                        {r.desconto && <span className={Style.desconto}>{r.desconto}</span>}
                        <span className={Style.preco}>{r.preco}</span>
                    </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Navbar() {
  return (
    <div className={Style.Navbar}>
      <div className={Style.partedecima}>
        <div className={Style.logo}>
          <img src={carrinho} alt="Logo Loja Axios" />
          <a href="https://axiosn-oticias.vercel.app/">
            <h1>Loja Axios</h1>
          </a>
        </div>
        <div className={Style.pesquisa}>
          <FormFiltrar />
        </div>
        <div className={Style.links}>
          <a href="https://www.linkedin.com/in/ronaldo-reemias-b66b7a166/" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="LinkedIn" />
          </a>
          <a href="https://github.com/ronaldoreemias" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="GitHub" className={Style.github} />
          </a>
          <a href="https://chat.whatsapp.com/FivMCudmv1wENlalqeIth0" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp} alt="WhatsApp" className={Style.github} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;