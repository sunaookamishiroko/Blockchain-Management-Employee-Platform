import React from "react";
import "../resources/css/Main.scss";

const Main = () => {
  return (
    <div class="Container">
      <div class="Left-Sidebar">
        <button>근로자 등록</button>
        <button>근로자 목록</button>
        <button>급여 정산</button>
        <button>급여 지급</button>
        <button>매장</button>
      </div>
      <div class="Contents">
        <h1>컨테이너</h1>
      </div>
    </div>
  );
};

export default Main;
