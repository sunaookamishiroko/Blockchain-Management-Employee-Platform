import React from "react";
import SettlementItem from "./SettlementItem";
import styled from "styled-components";

const Adapter = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

const SettlementAdapter = ({ workers, handleClickOpen }) => {
  return (
    <Adapter>
      {workers.map((worker) => (
        <SettlementItem
          worker={worker}
          key={worker.id}
          handleClickOpen={handleClickOpen}
        />
      ))}
    </Adapter>
  );
};

export default SettlementAdapter;
