import React, { useState } from "react";

const Servey = () => {
  const [onChangeInputMSG, setOnChangeInputMSG] = useState("");

  return (
    <div className="Servey">
      <h2>개선사항 또는 필요한 기능이 있으면 말씀해주세요</h2>
      <p>
        완전 익명으로 제출되며, local환경에서만 확인할 수 있어 제가 근무하는{" "}
        <b>8월 말</b>
        까지만 확인 가능해요
      </p>
      <form>
        <textarea
          onChange={(e) => setOnChangeInputMSG(e.target.value)}
          value={onChangeInputMSG}
        ></textarea>
        <br></br>
        <button
          onClick={(e) => {
            e.preventDefault();
            const userMessages = localStorage.getItem("userMessages");
            const date = new Date();
            const now = `${date.getFullYear()}년 ${
              date.getMonth() + 1
            }월 ${date.getDay()}일 ${date.getHours()}시 ${date.getMinutes()}분 `;
            if (userMessages) {
              const temp = JSON.parse(userMessages);
              localStorage.setItem(
                "userMessages",
                JSON.stringify([...temp, { time: now, msg: onChangeInputMSG }])
              );
              setOnChangeInputMSG("제출되었습니다!");
              return;
            }

            localStorage.setItem(
              "userMessages",
              JSON.stringify([{ time: new Date(), msg: onChangeInputMSG }])
            );
            setOnChangeInputMSG("제출되었습니다!");
          }}
        >
          제출하기
        </button>
      </form>
      <div className="notice">
        <h4>❕ 개선 사항</h4>
        <div>
          &nbsp; ✔ 2022.07.06 웹이 재시작되도 데이터가 유지되도록 변경 (메뉴의
          Reset으로 초기화)
        </div>
        <div>&nbsp; ✔ 2022.07.06 UI 개선</div>
        <div>&nbsp; ✔ 2022.07.06 웨이팅 카운터 기능 수정</div>
      </div>

      <div>
        <h4>❕ 기능 소개</h4>
        <div>&nbsp; ✔ 우클릭으로 지도의 색상 제거 가능합니다.</div>
        <div>
          &nbsp; ✔ 대기인원 많이 생기는 의자와 자판기부분에 웨이팅
          카운터있습니다. (좌우 클릭)
        </div>
        <div>&nbsp; ✔ 이용해주셔서 감사합니다.</div>
      </div>
    </div>
  );
};

export default Servey;
