import React, { useCallback, useEffect, useState } from "react";
import CountingMoney from "../components/CountingMoney";
import Memo from "../components/Memo";
import Modal from "../components/Modal";
import Servey from "../components/Servey";

const Home = () => {
  const [roomColorState, setRoomColorState] = useState(
    Array.from({ length: 23 }, () => Array.from({ length: 3 }, () => []))
  );

  const [paintColor, setPaintColor] = useState([
    "#AFEEC2",
    "#EEAFAF",
    "#B0AFEE",
  ]);
  const [currentColor, setCurrentColor] = useState("#AFEEC2");
  const [meaningText_0, setMeaningText_0] = useState("");
  const [meaningText_1, setMeaningText_1] = useState("");
  const [meaningText_2, setMeaningText_2] = useState("");
  const [waitingCounter, setWaitingCounter] = useState(1);
  const [isOpendMenu, setIsOpendMenu] = useState(true);
  const [isOpeendCountingMoney, setIsOpendCountingMoney] = useState(false);
  const [isOpendServeyForm, setIsOpendServeyForm] = useState(false);
  const [isOpendMemoForm, setIsOpendMemoForm] = useState(false);

  useEffect(() => {
    const roomColors = localStorage.getItem("roomColors");
    const meaningText = localStorage.getItem("meaningText");
    const paintColors = localStorage.getItem("paintColors");

    if (roomColors) {
      setRoomColorState(JSON.parse(roomColors));
    }

    if (meaningText) {
      const tempText = JSON.parse(meaningText);
      setMeaningText_0(tempText.meaningText_0);
      setMeaningText_1(tempText.meaningText_1);
      setMeaningText_2(tempText.meaningText_2);
    }

    if (paintColors) {
      setPaintColor(JSON.parse(paintColors));
    }

    console.log(
      `                                       
      %c██╗   ██╗ ██████╗ ██╗   ██╗███╗   ██╗ ██████╗          ██╗ █████╗ ███████╗
      %c╚██╗ ██╔╝██╔═══██╗██║   ██║████╗  ██║██╔════╝          ██║██╔══██╗██╔════╝
      %c ╚████╔╝ ██║   ██║██║   ██║██╔██╗ ██║██║  ███╗         ██║███████║█████╗  
      %c  ╚██╔╝  ██║   ██║██║   ██║██║╚██╗██║██║   ██║    ██   ██║██╔══██║██╔══╝  
      %c   ██║   ╚██████╔╝╚██████╔╝██║ ╚████║╚██████╔╝    ╚█████╔╝██║  ██║███████╗
      %c   ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝      ╚════╝ ╚═╝  ╚═╝╚══════╝  
      
      %chttps://github.com/Lee-Young-Jae`,
      "color: #4527dd",
      "color: #4932b8",
      "color: #493a92",
      "color: #40376d",
      "color: #2c283e",
      "color: #0c0c0e",
      "background-color: #eeeeee; font-size:22px; border-radius: 15px"
    );

    console.log();
  }, []);

  const onClickColorFormItem = useCallback(
    (event, roomNumber, index) => {
      event.target.style.background = currentColor;
      const tempRoomColorState = [...roomColorState].map((e, i) => {
        if (i === roomNumber) {
          const temp = e.map((e, i) => {
            if (i === index) {
              // return e === currentColor ? [] : currentColor;
              if (e === currentColor) {
                event.target.style.background = "";
                return [];
              }
              return currentColor;
            }
            return e;
          });
          return temp;
        }
        return e;
      });
      setRoomColorState(tempRoomColorState);
      localStorage.setItem("roomColors", JSON.stringify(tempRoomColorState));
    },
    [currentColor, roomColorState]
  );

  const onRightClickColorFormItem = useCallback(
    (event, roomNumber, index) => {
      event.preventDefault();
      event.target.style.background = "";
      const tempRoomColorState = [...roomColorState].map((e, i) => {
        if (i === roomNumber) {
          const temp = e.map((e, i) => {
            if (i === index) {
              return [];
            }
            return e;
          });
          return temp;
        }
        return e;
      });
      setRoomColorState(tempRoomColorState);
      localStorage.setItem("roomColors", JSON.stringify(tempRoomColorState));
    },
    [roomColorState]
  );

  const onClickWaitingDiv = useCallback(
    (e) => {
      setWaitingCounter(waitingCounter + 1);

      e.target.innerText = "waiting " + waitingCounter;
    },
    [waitingCounter]
  );

  const onLightClickWaitngDiv = useCallback((e) => {
    e.preventDefault();
    // if (waitingCounter > 0) {
    //   setWaitingCounter(waitingCounter - 1);
    //   console.log(waitingCounter);
    //   e.target.innerText = "waiting " + waitingCounter;
    //   return;
    // }
    e.target.innerText = "";
  }, []);

  const onChangeMeaningText = useCallback(
    (e, index) => {
      const currentText = { meaningText_0, meaningText_1, meaningText_2 };
      if (index === 0) {
        setMeaningText_0(e.target.value);
        currentText.meaningText_0 = e.target.value;
      } else if (index === 1) {
        setMeaningText_1(e.target.value);
        currentText.meaningText_1 = e.target.value;
      } else if (index === 2) {
        setMeaningText_2(e.target.value);
        currentText.meaningText_2 = e.target.value;
      }
      localStorage.setItem("meaningText", JSON.stringify(currentText));
    },
    [
      setMeaningText_0,
      setMeaningText_1,
      setMeaningText_2,
      meaningText_0,
      meaningText_1,
      meaningText_2,
    ]
  );

  const onChangeCurrentColor = useCallback(
    (e) => {
      if (!e.target.value) return;
      setCurrentColor(e.target.value);
    },
    [setCurrentColor]
  );

  const onClickSetCurrentColor = useCallback(
    (e) => {
      e.preventDefault();
      setPaintColor([...paintColor, currentColor]);
      localStorage.setItem(
        "paintColors",
        JSON.stringify([...paintColor, currentColor])
      );
    },
    [setPaintColor, paintColor, currentColor]
  );

  const setThisPaintToCurrentColor = useCallback((e) => {
    setCurrentColor(e.target.id);
  }, []);

  const setThisPaintRemove = useCallback(
    (e) => {
      e.preventDefault();
      const tempRemoveColor = paintColor.filter(
        (element) => e.target.id !== element
      );
      setPaintColor(tempRemoveColor);
      localStorage.setItem("paintColors", JSON.stringify(tempRemoveColor));
    },
    [paintColor]
  );

  const onClickDataReset = useCallback(() => {
    localStorage.removeItem("paintColors");
    localStorage.removeItem("roomColors");
    localStorage.removeItem("meaningText");
    setRoomColorState(
      Array.from({ length: 23 }, () => Array.from({ length: 3 }, () => []))
    );
    setPaintColor(["#AFEEC2"]);
    setCurrentColor("#AFEEC2");
    setMeaningText_0("");
    setMeaningText_1("");
    setMeaningText_2("");
    setWaitingCounter(1);
    setIsOpendMenu(true);
    setIsOpendCountingMoney(false);

    const $waitingDiv = Array.from(document.querySelectorAll(".waitingDiv"));
    $waitingDiv.map((e) => {
      e.innerText = "";
      return e;
    });
  }, []);

  useEffect(() => {
    const $countingMoney = document.querySelector(".menuItem-1");
    const $Servey = document.querySelector(".menuItem-3");
    const $Memo = document.querySelector(".menuItem-4");

    if (isOpeendCountingMoney) {
      $countingMoney.classList.add("active");
    } else if ($countingMoney) {
      $countingMoney.classList.remove("active");
    }

    if (isOpendServeyForm && $Servey !== null) {
      $Servey.classList.add("active");
    } else if ($Servey) {
      $Servey.classList.remove("active");
    }

    if (isOpendMemoForm && $Memo !== null) {
      $Memo.classList.add("active");
    } else if ($Memo) {
      $Memo.classList.remove("active");
    }
  }, [isOpeendCountingMoney, isOpendServeyForm, isOpendMemoForm]);

  const onClickModal = useCallback((e) => {
    if (e.target.className === "Modal") {
      setIsOpendCountingMoney(false);
      setIsOpendMemoForm(false);
      setIsOpendServeyForm(false);
    }
  }, []);

  return (
    <div className="HomePage">
      {isOpeendCountingMoney && (
        <Modal
          parentProps={<CountingMoney></CountingMoney>}
          onClick={onClickModal}
        ></Modal>
      )}
      {isOpendServeyForm && (
        <Modal parentProps={<Servey></Servey>} onClick={onClickModal}>
          {" "}
        </Modal>
      )}
      {isOpendMemoForm && (
        <Modal parentProps={<Memo></Memo>} onClick={onClickModal}></Modal>
      )}
      <div className="map">
        <div className="mapCol">
          <div className="mapItem">
            <p>4번방</p>
            <div className="colorForm">
              <div
                style={{ background: `${roomColorState[3][0]}` }}
                className="colorFormItem"
                onClick={(event) => onClickColorFormItem(event, 3, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 3, 0)
                }
              ></div>
              <div
                style={{ background: `${roomColorState[3][1]}` }}
                className="colorFormItem"
                onClick={(event) => onClickColorFormItem(event, 3, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 3, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[3][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 3, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 3, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem">
            <p>3번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[2][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 2, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 2, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[2][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 2, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 2, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[2][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 2, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 2, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem">
            <p>2번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[1][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 1, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 1, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[1][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 1, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 1, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[1][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 1, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 1, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem">
            <p>1번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[0][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 0, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 0, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[0][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 0, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 0, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[0][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 0, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 0, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem"></div>
          <div className="mapItem doubleHeightItem">카운터</div>
        </div>
        <div className="mapCol">
          <div className="mapItem"></div>
          <div className="mapItem"></div>
          <div className="mapItem">
            <div
              className="waitingDiv"
              onClick={onClickWaitingDiv}
              onContextMenu={onLightClickWaitngDiv}
            ></div>
            <div
              className="waitingDiv"
              onClick={onClickWaitingDiv}
              onContextMenu={onLightClickWaitngDiv}
            ></div>
          </div>
          <div className="mapItem">
            <div
              className="waitingDiv"
              onClick={onClickWaitingDiv}
              onContextMenu={onLightClickWaitngDiv}
            ></div>
            <div
              className="waitingDiv"
              onClick={onClickWaitingDiv}
              onContextMenu={onLightClickWaitngDiv}
            ></div>
          </div>
          <div className="mapItem"></div>
          <div className="mapItem">
            <div
              className="waitingDiv"
              onClick={onClickWaitingDiv}
              onContextMenu={onLightClickWaitngDiv}
            ></div>
            <div
              className="waitingDiv"
              onClick={onClickWaitingDiv}
              onContextMenu={onLightClickWaitngDiv}
            ></div>
          </div>
          <div className="mapItem"></div>
        </div>
        <div className="mapCol">
          <div className="mapItem">
            <p>5번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[4][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 4, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 4, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[4][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 4, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 4, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[4][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 4, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 4, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem"></div>
          <div className="mapItem">
            <p>18번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[17][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 17, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 17, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[17][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 17, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 17, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[17][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 17, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 17, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem">
            <p>17번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[16][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 16, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 16, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[16][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 16, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 16, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[16][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 16, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 16, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem">
            <div
              className="waitingDiv"
              onClick={onClickWaitingDiv}
              onContextMenu={onLightClickWaitngDiv}
            ></div>
            <div
              className="waitingDiv"
              onClick={onClickWaitingDiv}
              onContextMenu={onLightClickWaitngDiv}
            ></div>
          </div>
          <div className="mapItem">
            <div
              className="waitingDiv"
              onClick={onClickWaitingDiv}
              onContextMenu={onLightClickWaitngDiv}
            ></div>
            <div
              className="waitingDiv"
              onClick={onClickWaitingDiv}
              onContextMenu={onLightClickWaitngDiv}
            ></div>
          </div>
          <div className="mapItem">
            <div
              className="waitingDiv"
              onClick={onClickWaitingDiv}
              onContextMenu={onLightClickWaitngDiv}
            ></div>
            <div
              className="waitingDiv"
              onClick={onClickWaitingDiv}
              onContextMenu={onLightClickWaitngDiv}
            ></div>
          </div>
        </div>
        <div className="mapCol">
          <div className="mapItem">
            <p>6번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[5][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 5, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 5, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[5][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 5, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 5, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[5][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 5, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 5, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem"></div>
          <div className="mapItem">
            <p>19번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[18][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 18, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 18, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[18][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 18, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 18, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[18][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 18, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 18, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem">
            <p>16번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[15][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 15, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 15, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[15][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 15, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 15, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[15][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 15, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 15, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem"></div>
          <div className="mapItem doubleHeightItem">
            23번방
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[22][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 22, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 22, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[22][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 22, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 22, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[22][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 22, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 22, 2)
                }
              ></div>
            </div>
          </div>
        </div>
        <div className="mapCol">
          <div className="mapItem">
            <p>7번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[6][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 6, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 6, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[6][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 6, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 6, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[6][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 6, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 6, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem"></div>
          <div className="mapItem">
            <p>20번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[19][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 19, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 19, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[19][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 19, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 19, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[19][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 19, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 19, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem">
            <p>15번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[14][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 14, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 14, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[14][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 14, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 14, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[14][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 14, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 14, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem"></div>
          <div className="mapItem">
            <p>22번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[21][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 21, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 21, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[21][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 21, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 21, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[21][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 21, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 21, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem">
            <p>21번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[20][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 20, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 20, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[20][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 20, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 20, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[20][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 20, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 20, 2)
                }
              ></div>
            </div>
          </div>
        </div>
        <div className="mapCol">
          <div className="mapItem"></div>
          <div className="mapItem"></div>
          <div className="mapItem"></div>
          <div className="mapItem"></div>
          <div className="mapItem"></div>
          <div className="mapItem"></div>
          <div className="mapItem"></div>
        </div>
        <div className="mapCol">
          <div className="mapItem">
            <p>8번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[7][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 7, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 7, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[7][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 7, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 7, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[7][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 7, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 7, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem">
            <p>9번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[8][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 8, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 8, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[8][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 8, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 8, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[8][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 8, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 8, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem">
            <p>10번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[9][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 9, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 9, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[9][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 9, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 9, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[9][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 9, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 9, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem">
            <p>11번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[10][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 10, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 10, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[10][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 10, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 10, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[10][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 10, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 10, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem">
            <p>12번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[11][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 11, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 11, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[11][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 11, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 11, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[11][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 11, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 11, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem">
            <p>13번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[12][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 12, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 12, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[12][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 12, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 12, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[12][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 12, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 12, 2)
                }
              ></div>
            </div>
          </div>
          <div className="mapItem">
            <p>14번방</p>
            <div className="colorForm">
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[13][0]}` }}
                onClick={(event) => onClickColorFormItem(event, 13, 0)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 13, 0)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[13][1]}` }}
                onClick={(event) => onClickColorFormItem(event, 13, 1)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 13, 1)
                }
              ></div>
              <div
                className="colorFormItem"
                style={{ background: `${roomColorState[13][2]}` }}
                onClick={(event) => onClickColorFormItem(event, 13, 2)}
                onContextMenu={(event) =>
                  onRightClickColorFormItem(event, 13, 2)
                }
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="colorFormMeaningBox">
        <span>버튼 의미</span>
        <div className="colorFormMeaning">
          <div
            onClick={(e) => {
              if (e.target.type !== "text") {
                e.target.style.background = currentColor;
                return;
              }
              e.target.parentElement.style.background = currentColor;
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              e.target.style.background = "";
            }}
          >
            <input
              onChange={(event) => {
                onChangeMeaningText(event, 0);
              }}
              value={meaningText_0}
            ></input>
          </div>
          <div
            onClick={(e) => {
              if (e.target.type !== "text") {
                e.target.style.background = currentColor;
                return;
              }
              e.target.parentElement.style.background = currentColor;
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              e.target.style.background = "";
            }}
          >
            <input
              onChange={(event) => {
                onChangeMeaningText(event, 1);
              }}
              value={meaningText_1}
            ></input>
          </div>
          <div
            onClick={(e) => {
              if (e.target.type !== "text") {
                e.target.style.background = currentColor;
                return;
              }
              e.target.parentElement.style.background = currentColor;
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              e.target.style.background = "";
            }}
          >
            <input
              onChange={(event) => {
                onChangeMeaningText(event, 2);
              }}
              value={meaningText_2}
            ></input>
          </div>
        </div>
      </div>
      <div className="setColorBox">
        <div className="CurrentColor">
          <span>Current Color</span>{" "}
          <span className="setColorBoxHiddenText">
            (선택을 누르면 현재 색상으로 지정되고 팔레트에 색상이 추가됩니다)
          </span>
          <form>
            <input
              type="color"
              value={currentColor}
              onChange={onChangeCurrentColor}
            ></input>
            <button
              className="choiceCurrentColorBtn"
              onClick={onClickSetCurrentColor}
            >
              선택
            </button>
          </form>
        </div>
        <div className="Palette">
          <span>Palette</span>
          <span className="setColorBoxHiddenText">
            (좌클릭 - 현재 색상으로 선택, 우클릭 - 팔레트 색상 삭제)
          </span>
          <div className="paintColorList">
            {paintColor.map((e, i) => {
              return (
                <div
                  key={i}
                  id={e}
                  style={{ background: `${e}` }}
                  onClick={setThisPaintToCurrentColor}
                  onContextMenu={setThisPaintRemove}
                >
                  {e}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {isOpendMenu ? (
        <div className="Menu">
          <div
            className="menuItem menuItem-1"
            onClick={() => setIsOpendCountingMoney((prev) => !prev)}
          >
            CountingMoney
          </div>
          <div className="menuItem menuItem-2" onClick={onClickDataReset}>
            Data Reset
          </div>

          <div
            className="menuItem menuItem-3"
            onClick={() => setIsOpendServeyForm((prev) => !prev)}
          >
            Survey
          </div>

          <div
            className="menuItem menuItem-4"
            onClick={() => setIsOpendMemoForm((prev) => !prev)}
          >
            Memo
          </div>
          <div
            className="menuItem"
            onClick={(e) => {
              setIsOpendMenu(false);
              setIsOpendCountingMoney(false);
              setIsOpendServeyForm(false);
            }}
          >
            Close Menu
          </div>
        </div>
      ) : (
        <div className="ClosedMenu">
          <div
            className="menuItem"
            onClick={(e) => {
              setIsOpendMenu(true);
            }}
          >
            Menu
          </div>
        </div>
      )}
      <footer>@2022 YoungJae https://github.com/Lee-Young-Jae</footer>
    </div>
  );
};

export default Home;
