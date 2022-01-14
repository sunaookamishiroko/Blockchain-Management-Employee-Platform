import React from "react";
import WorkerListItem from "./WorkerListItem";
import styled from "styled-components";

const Adapter = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

const WorkerAdapter = ({ workers }) => {
  return (
    <Adapter>
      {workers.map((worker) => (
        <WorkerListItem worker={worker} key={worker.id} />
      ))}
    </Adapter>
  );
};

export default WorkerAdapter;
