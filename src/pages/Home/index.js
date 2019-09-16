import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';

export default function Home() {
  return (
    <ProductList>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-vr-caminhada-confortavel-detalhes-couro-masculino/04/E74-0413-304/E74-0413-304_detalhe2.jpg?ims=326x"
          alt="tênis"
        />
        <strong>Tenis</strong>
        <span>R$ 159,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 5
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-vr-caminhada-confortavel-detalhes-couro-masculino/04/E74-0413-304/E74-0413-304_detalhe2.jpg?ims=326x"
          alt="tênis"
        />
        <strong>Tenis</strong>
        <span>R$ 159,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 5
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-vr-caminhada-confortavel-detalhes-couro-masculino/04/E74-0413-304/E74-0413-304_detalhe2.jpg?ims=326x"
          alt="tênis"
        />
        <strong>Tenis</strong>
        <span>R$ 159,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 5
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-vr-caminhada-confortavel-detalhes-couro-masculino/04/E74-0413-304/E74-0413-304_detalhe2.jpg?ims=326x"
          alt="tênis"
        />
        <strong>Tenis</strong>
        <span>R$ 159,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 5
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-vr-caminhada-confortavel-detalhes-couro-masculino/04/E74-0413-304/E74-0413-304_detalhe2.jpg?ims=326x"
          alt="tênis"
        />
        <strong>Tenis</strong>
        <span>R$ 159,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 5
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
    </ProductList>
  );
}
