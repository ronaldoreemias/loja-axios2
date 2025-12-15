import { useState } from "react";
import Navbar from "../../componets/Navbar/index";
import Style from "./Loja.module.css";
import ImageSlider from "../Slide/index";
import imagemlateralsegunda from "../../assets/slide/seguranca.jpg";
import segura from "../../assets/slide/E-commerce.jpg";
import celular from "../../assets/iconesbutton/mobile_102860.ico";
import notebook from "../../assets/iconesbutton/notebook_computer_laptop_icon_185946.ico";
import computador from "../../assets/iconesbutton/computer_115306.ico";
import monitor from "../../assets/iconesbutton/monitor_icon-icons.com_74441.ico";
import teclado from "../../assets/iconesbutton/keyboardbasicflat_106016.ico";
import mouse from "../../assets/iconesbutton/mousemachd_106073.ico";
import filt from "../../assets/iconesbutton/filtering_icon_246394.ico";


const produtos = [
  {
    "id": 1,
    "titulo": "Celular Samsung Galaxy A16",
    "descricao": "Celular Samsung Galaxy A16 4G, 256gb + 8gb Ram, Câmera De Até 50mp",
    "imagem": "https://images.kabum.com.br/produtos/fotos/sync_mirakl/729972/xlarge/Celular-Samsung-Galaxy-A16-256gb-8GB-Ram-C-mera-De-At-50mp-Tela-6-7-Nfc-Ip54-Bateria-5000-Mah-Preto-256-Gb-Bi-volt_1761270516.jpg",
    "link": "https://mercadolivre.com/sec/1mLn2HC",
    "desconto": "37% OFF",
    "preco": "R$ 1.169,90",
    "categoria": "Celular"
  },
  {
    "id": 2,
    "titulo": "Celular Samsung Galaxy S24",
    "descricao": "Celular Samsung Galaxy S24, Galaxy Ai, Câmera Tripla Traseira De Até 50mp",
    "imagem": "https://m.media-amazon.com/images/I/710BXPlJ65L.jpg",
    "link": "",
    "desconto": "43% OFF",
    "preco": "R$ 3.332,90",
    "categoria": "Celular"
  },
  {
    "id": 3,
    "titulo": "Smart TV Samsung 43",
    "descricao": "Smart TV Samsung 43 Full HD Led 110v/220v",
    "imagem": "https://http2.mlstatic.com/D_NQ_NP_735669-MLB93316833678_092025-O.webp",
    "link": "https://mercadolivre.com/sec/2YoCyWX",
    "desconto": "46% OFF",
    "preco": "R$ 1.598,90",
    "categoria": "Monitor"
  },
  {
    "id": 4,
    "titulo": "Monitor Gamer LG 24MS500-B",
    "descricao": "Monitor Gamer LG 24MS500-B 24ms Ips Fullhd 100hz",
    "imagem": "https://assets.pechinchou.com.br/media/img/products/social/fba59fb8-8533-4adb-92d8-455ab1562930.jpg",
    "link": "https://mercadolivre.com/sec/2rqgpsq",
    "desconto": "",
    "preco": "R$ 550,00",
    "categoria": "Monitor"
  },
  {
    "id": 5,
    "titulo": "Notebook ASUS Vivobook S14",
    "descricao": "Notebook ASUS Vivobook S14 Intel Core i5 13420H 16GB Ram 512GB SSD",
    "imagem": "https://imgs.extra.com.br/1575318746/1xg.jpg?imwidth=500",
    "link": "https://mercadolivre.com/sec/1RTqzHB",
    "desconto": "20% OFF",
    "preco": "R$ 3.692,00",
    "categoria": "Notebook"
  },
  {
    "id": 6,
    "titulo": "Computador Gamer Completo",
    "descricao": "Computador Gamer Completo Branco i5 16GB Monitor Teclado Mouse",
    "imagem": "https://down-br.img.susercontent.com/file/sg-11134201-7rd72-m6qwlu077qbwf7",
    "link": "https://s.shopee.com.br/10ubXyTiQT",
    "desconto": "60% OFF",
    "preco": "R$ 1.528,00",
    "categoria": "Computador"
  },
];

function Loja() {
  const [filtro, setFiltro] = useState("Todos");
  const [produtosFiltrados, setProdutosFiltrados] = useState(produtos);

  function filtrar(categoria: string) {
    setFiltro(categoria);
    
    if (categoria === "Todos") {
      setProdutosFiltrados(produtos);
    } else {
      const produtosFiltrados = produtos.filter(produto => 
        produto.categoria === categoria
      );
      setProdutosFiltrados(produtosFiltrados);
    }
  }

  return (
    <div className={Style.Bodyloja}>
      <Navbar />
      <div className={Style.Body}>
        <div className={Style.container}>
          <div className={Style.header}>
            <div className={Style.containerbaner}>
              <div className={Style.headerbaner}>
                
              </div>
              <div className={Style.menubaner}>
                <img src={segura} alt="Banner e-commerce" />
                <br />
                <img src={imagemlateralsegunda} alt="Banner e-commerce 2" />
              </div>
              <div className={Style.contentbaner}>
                <ImageSlider />
              </div>
              <div className={Style.footerbaner}>
                <button onClick={() => filtrar("Todos")}>
                  <img src={filt} alt="Notebook" className={Style.todos} />
                </button>
                <button onClick={() => filtrar("Celular")}>
                  <img src={celular} alt="Celular" />
                  Celular
                </button>
                <button onClick={() => filtrar("Notebook")}>
                  <img src={notebook} alt="Notebook" />
                  Notebook
                </button>
                <button onClick={() => filtrar("Computador")}>
                  <img src={computador} alt="Computador" />
                  Computador
                </button>
                <button onClick={() => filtrar("Monitor")}>
                  <img src={monitor} alt="Monitor" />
                  Monitor
                </button>
                <button onClick={() => filtrar("Teclado")}>
                  <img src={teclado} alt="Teclado" />
                  Teclado
                </button>
                <button onClick={() => filtrar("Mouse")}>
                  <img src={mouse} alt="Mouse" />
                  Mouse
                </button>
              </div>
            </div>
          </div>
          
          <div className={Style.Produtos}>
            <div className={Style.containerprodutos}>
              {produtosFiltrados.length > 0 ? (
                produtosFiltrados.map((produto) => (
                  <div key={produto.id} className={Style.produtoCard}>
                    <div className={Style.produtoImagemContainer}>
                      <img 
                        src={produto.imagem} 
                        alt={produto.titulo}
                        className={Style.produtoImagem}
                      />
                      {produto.desconto && (
                        <span className={Style.descontoTag}>{produto.desconto}</span>
                      )}
                    </div>
                    <div className={Style.produtoInfo}>
                      <h4 className={Style.produtoTitulo}>{produto.titulo}</h4>
                      <p className={Style.produtoDescricao}>{produto.descricao}</p>
                      <div className={Style.produtoPreco}>
                        <span>{produto.preco}</span>
                      </div>
                      <button 
                        className={Style.botaoComprar}
                        onClick={() => {
                          if (produto.link) {
                            window.open(produto.link, '_blank');
                          }
                        }}
                        disabled={!produto.link}
                      >
                        {produto.link ? "Comprar Agora" : "Indisponível"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className={Style.semProdutos}>
                  <p>Nenhum produto encontrado na categoria "{filtro}"</p>
                </div>
              )}
            </div>
          </div>
          
          <div className={Style.Footer}>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loja;