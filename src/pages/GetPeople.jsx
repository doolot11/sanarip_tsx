import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function GetPeople() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
        setSearchUser(data);
      } catch (error) {
        return error;
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (search) {
      const result = users.filter((i) => i.name.includes(search));
      setSearchUser(result);
    } else {
      setSearchUser(users);
    }
  }, [search]);

  const searchHandler = (e) => {
    const { value } = e.target;
    setSearch(value);
  };
  return (
    <Wrapper>
      <div className="header">
        <span onClick={() => navigate(-1)}>{"< Назад"}</span>
        <input
          value={search}
          className="search_input"
          onChange={searchHandler}
          placeholder="Поиск по имени... "
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>№:</th>
            <th>Имя</th>
            <th>Почта</th>
            <th>Город</th>
          </tr>
        </thead>
        <tbody>
          {searchUser.length > 0 ? (
            searchUser.map((e, index) => (
              <tr key={e.id}>
                <td>{index + 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.address?.city}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Пусто</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Wrapper>
  );
}

export default GetPeople;
const Table = styled.table`
  border-collapse: collapse;
  & thead > tr > th {
    text-align: left;
    padding: 5px 15px 5px 15px;
    color: #606060;
  }
  & tbody > tr > td {
    cursor: pointer;
    color: gray;
    padding: 5px 15px 5px 15px;
  }
  & tbody > tr:hover {
    background: #fb6c5613;
    border-radius: 10px;
  }
`;
const Wrapper = styled.div`
  padding-top: 35px;
  margin: 0 auto;
  width: 60%;
  & .search_input {
    width: 250px;
    height: 35px;
    border-radius: 15px;
    padding: 0 0 0 12px;
    border: 1px solid gray;
  }
  & .search_input:focus {
    outline: none !important;
    border: 1px solid #fb6c56;
  }
  & .header {
    display: flex;
    justify-content: space-between;
    & > span {
      color: gray;
      cursor: pointer;
    }
  }
  & .data_users {
    width: 60%;
  }
`;
