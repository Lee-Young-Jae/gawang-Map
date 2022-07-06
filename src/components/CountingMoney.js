import React, { useCallback, useEffect, useState } from "react";

const CountingMoney = () => {
  const [fiftyThousandWon, setFiftyThousandWon] = useState(1);
  const [tenThousandWon, setTenThousandWon] = useState(20);
  const [fiveThousandWon, setFiveThousandWon] = useState(9);
  const [oneThousandWon, setOneThousandWon] = useState(4);
  const [fiveHundredWon, setFiveHundredWon] = useState(2);
  const [oneHundredWon, setOneHundredWon] = useState(0);
  const [totalAmount, settotalAmount] = useState("");

  useEffect(() => {
    let tempTotal =
      fiftyThousandWon * 50000 +
      tenThousandWon * 10000 +
      fiveThousandWon * 5000 +
      oneThousandWon * 1000 +
      fiveHundredWon * 500 +
      oneHundredWon * 100;

    settotalAmount(
      tempTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원"
    );
  }, [
    fiftyThousandWon,
    tenThousandWon,
    fiveThousandWon,
    oneThousandWon,
    fiveHundredWon,
    oneHundredWon,
  ]);

  const rerenderMoney = useCallback(
    (e) => {
      let tempTotal =
        fiftyThousandWon * 50000 +
        tenThousandWon * 10000 +
        fiveThousandWon * 5000 +
        oneThousandWon * 1000 +
        fiveHundredWon * 500 +
        oneHundredWon * 100;
      settotalAmount(
        tempTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원"
      );
    },
    [
      fiftyThousandWon,
      tenThousandWon,
      fiveThousandWon,
      oneThousandWon,
      fiveHundredWon,
      oneHundredWon,
    ]
  );

  const onChangeFiftyThousandWon = useCallback(
    (e) => {
      setFiftyThousandWon(e.target.value);
      rerenderMoney();
    },
    [rerenderMoney]
  );
  const onChangeTenTousandWon = useCallback(
    (e) => {
      setTenThousandWon(e.target.value);
      rerenderMoney();
    },
    [rerenderMoney]
  );
  const onChangeFiveThousandWon = useCallback(
    (e) => {
      setFiveThousandWon(e.target.value);
      rerenderMoney();
    },
    [rerenderMoney]
  );
  const onChangeOneThousandWon = useCallback(
    (e) => {
      setOneThousandWon(e.target.value);
      rerenderMoney();
    },
    [rerenderMoney]
  );
  const onChangeFiveHundredWon = useCallback(
    (e) => {
      setFiveHundredWon(e.target.value);
      rerenderMoney();
    },
    [rerenderMoney]
  );
  const onChangeOneHundredWon = useCallback(
    (e) => {
      setOneHundredWon(e.target.value);
      rerenderMoney();
    },
    [rerenderMoney]
  );

  return (
    <div className="CountingMoney">
      <div className="moneyInputForm">
        <div>
          <label>50000</label>
          <input
            type={"number"}
            value={fiftyThousandWon}
            onChange={onChangeFiftyThousandWon}
            min={0}
          ></input>
        </div>
        <div>
          <label>10000</label>
          <input
            type={"number"}
            value={tenThousandWon}
            onChange={onChangeTenTousandWon}
            min={0}
          ></input>
        </div>
        <div>
          <label>5000</label>
          <input
            type={"number"}
            value={fiveThousandWon}
            onChange={onChangeFiveThousandWon}
            min={0}
          ></input>
        </div>
        <div>
          <label>1000</label>
          <input
            type={"number"}
            value={oneThousandWon}
            onChange={onChangeOneThousandWon}
            min={0}
          ></input>
        </div>
        <div>
          <label>500</label>
          <input
            type={"number"}
            value={fiveHundredWon}
            onChange={onChangeFiveHundredWon}
            min={0}
          ></input>
        </div>
        <div>
          <label>100</label>
          <input
            type={"number"}
            value={oneHundredWon}
            onChange={onChangeOneHundredWon}
            min={0}
          ></input>
        </div>
        <div>
          <input className="resultAmount" readOnly value={totalAmount}></input>
        </div>
      </div>
    </div>
  );
};

export default CountingMoney;
