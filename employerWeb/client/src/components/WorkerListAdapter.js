import React from "react";
import WorkerListItem from "./WorkerListItem";
import styled from "styled-components";

const Adapter = styled.div`
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`;

const WorkerListAdapter = ({
  workers,
  handleClickOpen,
}) => {
  return (
    <Adapter>
      {workers.map((x, index) => (
        <WorkerListItem
          index={index}
          address={workers[index][0]}
          name={workers[index][1]}
          handleClickOpen={handleClickOpen}
        />
      ))}
    </Adapter>
  );
};

export default WorkerListAdapter;
