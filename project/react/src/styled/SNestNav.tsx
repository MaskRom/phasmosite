import styled from 'styled-components';


export const SNestNav = styled.div`
  position: sticky;
  top: var(--top-hight);
  display: grid;
  grid-template-columns: 1fr minmax(0, var(--main-width)) 1fr;
  background-color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  z-index: 2;
  nav{
    display: flex;
    a{
      width: 100%;
      text-decoration: none;
      color: var(--deactive-fg);
      text-align: center;
      font-weight: 600;
      padding: 5px;
      &:hover{
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
    .active{
      border-bottom: solid var(--active-fg) 4px;
      color: var(--active-fg);
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
`;