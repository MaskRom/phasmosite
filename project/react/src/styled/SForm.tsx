import styled from 'styled-components';


export const SForm = styled.div`

  form{
    padding: 20px 10%;
    font-size: 15px;
    font-weight: 900;
    input {
      width: 100%;
      padding: 5px;
      margin: 5px auto;
      border-radius: 5px;
      outline: 2px solid #bbb;
      font-size: 1rem;
      border: none;
    }
    input[type="text"]:focus,
    input[type="password"]:focus {
      outline: solid 2px deepskyblue;
    }
    input[type="submit"] {
      background: #333;
      color: white;
      margin-top: 24px;
      border-radius: 5px;
      padding: 6px;
      cursor: pointer;
    }
  }
  .under_text {
    margin-bottom: 20px;
    font-size: 16px;
    display: block;
    text-align: center;
    color: rgb(30, 155, 240);
    text-decoration: underline;
    cursor: pointer;
  }
`;