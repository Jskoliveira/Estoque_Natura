import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Table = styled.table`
  width: 100%;
  background-color: #ccc;
  color: #1C1C1C;  
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-whidth: 800px;
  margin: 20px auto;
  word-break: break-all;
`
export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-botton: 5px;
  color: #FF8C00;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-button: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};  

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ products, setOnEdit, setProducts }) => {

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (codigo) => {
    await axios
      .delete("http://localhost:8800/" + codigo)
      .then(({ data }) => {
        const newArray = products.filter((product) => product.codigo !== codigo);

        setProducts(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Produto</Th>
          <Th onlyWeb>Valor</Th>
          <Th onlyWeb>Código</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((item, i) => (
          <Tr Key={i}>
            <Td width="40%">{item.produto}</Td>
            <Td width="20%" onlyWeb>{item.valor}</Td>
            <Td width="20%" onlyWeb>{item.codigo}</Td>
            <Td alignCenter width="5%">
              <FaTrash className="Icon" onClick={() => handleDelete(item.codigo)} />
            </Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default Grid
