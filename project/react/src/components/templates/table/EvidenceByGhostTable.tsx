import { EvidenceItem } from '../../parts/item/EvidenceItem';
import { BsCheckLg } from "react-icons/bs";
import styled from 'styled-components';
import React from 'react';



type TEvidenceByGhostTable = {
  evidence: Array<{
    slug: string;
    name: string;
    possibility: number;
    confirm: boolean;
  }>
};

export const EvidenceByGhostTable = (props: TEvidenceByGhostTable) => {
  return (
    <SEvidenceByGhostTable>
      <table>
        <thead>
          <tr>
            <td className='td_con'>確定</td>
            <td className='td_evi'>証拠</td>
          </tr>
        </thead>
        <tbody>
          {props.evidence.length &&
            props.evidence.map((item, index) => {
              return (
                <tr key={index}>
                  <td className='td_con'>{item.confirm ? <BsCheckLg /> : ''}</td>
                  <td className='td_evi'><EvidenceItem slug={item.slug} name={item.name} /></td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </SEvidenceByGhostTable>
  );
};


const SEvidenceByGhostTable = styled.div`
  margin: 5px;
  table{
    padding: 5px;
   
    svg{
      color: #19bd03;
      font-size: 20px;
    }
    .td_evi{
      width: 300px;
    }
    .td_con{
      width: 48px;
    }

  }
`;