import axios from "axios";
import GlobalStyle from "../styles/global";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Form from "../components/Forms";
import Grid from "../components/Grid";
import "react-toastify/dist/ReactToastify.css"

const Container = styled.div`
  width: 100%;
  max-whidth: 800px;
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

function App() {

  const [products, setProducts] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getProducts = async () => {    
    try {    
      const res = await axios.get("http://localhost:8800");       
      setProducts(res.data.sort((a, b) => (a.produto > b.produto ? 1 : -1)));           
    } catch (error) {
      console.log(error)
      toast.error(error);
    }
  };
  
  useEffect(() => {
    getProducts();
  }, [setProducts]);

  return (
    <>
      <Title>Cadastro de Produtos</Title>
      <Container>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getProducts={getProducts} />
        <Grid setOnEdit={setOnEdit} products={products} setProducts={setProducts} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
      <GlobalStyle />
    </>
  );
}

export default App;
