import React from "react";
import SettlementItem from "./SettlementItem";
import styled from "styled-components";

const Adapter = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

const SettlementAdapter = ({
  workers,
  handleClickOpen,
}) => {
  return (
    <Adapter>
      {workers.map((x, index) => (
        <SettlementItem
          index={index}
          address={workers[index][0]}
          name={workers[index][1]}
          //key={worker.id}
          handleClickOpen={handleClickOpen}
        />
      ))}
    </Adapter>
  );
};

export default SettlementAdapter;
