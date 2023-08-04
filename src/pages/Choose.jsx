import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

function Choose() {
  const navigate = useNavigate();
  const toInner = (e) => {
    navigate(e);
  };
  return (
    <Wrapper>
      <button onClick={() => toInner("script")}>Добавить tag "li" </button>
      <button onClick={() => toInner("users")}>Использование AJAX</button>
      <button onClick={() => toInner("weather")}>Погода </button>
    </Wrapper>
  );
}

export default Choose;

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding-top: 80px;
  & > button {
    font-size: 15px;
    cursor: pointer;
    color: #fff;
    background-color: #fb6d56;
    border: none;
    border-radius: 15px;
    width: 200px;
    height: 60px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
`;
