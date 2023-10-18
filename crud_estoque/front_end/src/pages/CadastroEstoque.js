import React from "react";
import axios from "axios";
import GlobalStyle from "../styles/global";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Form from "../components/FormsEstoque";
import Grid from "../components/GridEstoque";
import "react-toastify/dist/ReactToastify.css"

const Container = styled.div`  
  max-whidth: 1000px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;  
`

const Title = styled.h2`
color: #FFFAFA;
margin-top: 15px;
`;

function Estoque() {

  const [productsEstoque, setProductsEstoque] = useState([]);
  const [onEditEstoque, setOnEditEstoque] = useState(null);

  const getProductsEstoque = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setProductsEstoque(res.data.sort((a, b) => (a.produto > b.produto ? 1 : -1)));
    } catch (error) {
      console.log(error)
      toast.error(error);
    }
  };

  useEffect(() => {
    getProductsEstoque();
  }, [setProductsEstoque]);

  return (
    <>
      <Title>Cadastro de Itens em Estoque</Title>

      <Container>
        <Form onEdit={onEditEstoque} setOnEdit={setOnEditEstoque} getProductsEstoque={getProductsEstoque} />
        <Grid setOnEdit={setOnEditEstoque} products={productsEstoque} setProducts={setProductsEstoque} />
      </Container>

      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
      <GlobalStyle />
    </>
  );
}

export default Estoque;
