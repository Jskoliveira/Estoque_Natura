import { React, useRef, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";


const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #ccc;
  color: #363636;
  padding: 20px;  
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: #FFA500;
`;

const Input = styled.input`
  width: 80px;
  padding: 0 10px;
  border: none;
  border-radius: 5px;
  height: 40px;
`
const InputDescription = styled.input`
  width: 200px;
  padding: 0 10px;
  border: none;
  border-radius: 5px;
  height: 40px;
`
const Label = styled.label``

const Button = styled.button`
  margin-top: 24px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: red;
  color: white;
  height: 40px;
`


const Form = ({ getProductsEstoque, onEdit, setOnEdit }) => {

  const ref = useRef();
  const product = ref.current

  const onBlur = async () => {
    const codigo = product.codigo.value
    const res = await axios.get("http://localhost:8800/" + codigo)
    try {
      product.produto.value = res.data[0].produto
      product.valor.value = res.data[0].valor
    }
    catch (error) {
      console.log(error)
      toast.error(error);
    }
  };


  useEffect(() => {
    if (onEdit) {
      const product = ref.current;

      product.codigo.value = onEdit.codigo;
      product.produto.value = onEdit.produto;
      product.quantidade.value = onEdit.quantidade;
      product.valor.value = onEdit.valor;
    }
  }, [onEdit]);


  const handlePesquisar = async (e) => {
    e.preventDefault();

    if (!product.codigo.value) {
      return toast.warn("Informe o código para prosseguir!");
    }

    if (onEdit) {
      await axios
        .patch("http://localhost:8800/" + onEdit.codigo, {
          codigo: product.codigo.value,
          quantidade: product.quantidade.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          codigo: product.codigo.value,
          quantidade: product.quantidade.value

        })
        .then(() => toast.success("Produto Cadastrado com Sucesso"))
        .catch(({ data }) => toast.error(data));
    }
    product.produto.value = "";
    product.valor.value = "";
    product.codigo.value = "";
    product.quantidade.value = "";

    setOnEdit(null);
    getProductsEstoque();
  };


  return (
    <>
      <FormContainer className={FormContainer} ref={ref} onSubmit={handlePesquisar}>
        <InputArea>
          <Label>Código</Label>
          <Input name="codigo" onBlur={onBlur} />
        </InputArea>
        <InputArea>
          <Label>Produto</Label>
          <InputDescription disabled name="produto" />
        </InputArea>
        <InputArea>
          <Label>Valor</Label>
          <Input disabled name="valor" />
        </InputArea>
        <InputArea>
          <Label>Quantidade</Label>
          <Input name="quantidade" />
        </InputArea>
        <Button type="submit">CADASTRAR</Button>
      </FormContainer>
    </>
  );
};

export default Form;
