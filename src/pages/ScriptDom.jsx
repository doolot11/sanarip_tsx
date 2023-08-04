import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

function ScriptDom() {
  const navigate = useNavigate();
  const creatLiHandler = () => {
    const ul = document.getElementsByClassName("ul_list")[0];
    const li = document.createElement("li");
    li.innerHTML = `item ${ul.childElementCount}`;
    ul.append(li);
  };

  return (
    <Wrapper>
      <span onClick={() => navigate(-1)}>{"<"} Назад</span>
      <ul className="ul_list">
        <span>Tag ul</span>
      </ul>
      <button onClick={creatLiHandler}>Добавить li</button>
    </Wrapper>
  );
}

export default ScriptDom;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  padding-top: 60px;
  gap: 35px;
  & > span {
    color: gray;
    cursor: pointer;
  }
  & > button {
    font-size: 15px;
    cursor: pointer;
    color: #fff;
    background-color: #fb6d56;
    border: none;
    border-radius: 15px;
    width: 200px;
    height: 45px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
  & > ul {
    font-weight: 600;
    font-size: 18px;
    margin: 0;
    height: 30px;
    width: 20%;
    border-bottom: 2px solid #fb6d56;
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 0 0 6px 10px;
    color: #fb6d56;
    & > li {
      font-weight: 400;
      list-style-type: none;
      padding: 8px 0 2px 15px;
      border-bottom: 1px solid rgba(251, 109, 86, 0.36);
    }
  }
`;
