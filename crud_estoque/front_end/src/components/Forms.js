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
  width: 120px;
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
  background-color: #FF8C00;
  color: white;
  height: 40px;
`
const Form = ({ getProducts, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const product = ref.current;

      product.produto.value = onEdit.produto;
      product.valor.value = onEdit.valor;
      product.codigo.value = onEdit.codigo;

    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = ref.current;

    if (
      !product.produto.value ||
      !product.valor.value ||
      !product.codigo.value
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .patch("http://localhost:8800/" + onEdit.codigo, {
          produto: product.produto.value,
          valor: product.valor.value,
          codigo: product.codigo.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          produto: product.produto.value,
          valor: product.valor.value,
          codigo: product.codigo.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    product.produto.value = "";
    product.valor.value = "";
    product.codigo.value = "";

    setOnEdit(null);
    getProducts();
  };

  return (
    <FormContainer className={FormContainer}ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Produto</Label>
        <Input name="produto" />
      </InputArea>
      <InputArea>
        <Label>Valor</Label>
        <Input name="valor" />
      </InputArea>
      <InputArea>
        <Label>Código</Label>
        <Input name="codigo" />
      </InputArea>
      <Button type="submit">CADASTRAR</Button>
    </FormContainer>
  );
};

export default Form;




