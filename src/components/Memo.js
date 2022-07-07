import React, { useCallback, useEffect, useState } from "react";
import MemoItem from "./MemoItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

const Memo = () => {
  const [memos, setMemos] = useState([]); // 전체 메모
  const [currentMonthMemos, setCurrentMonthMemos] = useState([]);
  const [memoText, setMemoText] = useState("");
  const [curDate, setCurDate] = useState(new Date());
  const [isWriteMemoFormOpend, setIsWriteMemoFormOpend] = useState(false);
  const [keywordSearchText, setKeywordSearchText] = useState("");
  const [emptySearchResult, setEmptySearchResult] = useState(false);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `GawangMap - 메모`;

    setMemos(JSON.parse(localStorage.getItem("memos")));
  }, []);

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 `;
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  useEffect(() => {
    if (memos !== null && memos.length >= 1) {
      //해당 달의 1일
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      // 해당 달의 마지막 일
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setCurrentMonthMemos(
        memos.filter((e) => {
          return (
            firstDay <= new Date(e.date).getTime() &&
            new Date(e.date).getTime() <= lastDay
          );
        })
      );
    }
  }, [curDate, memos]);

  const onChageMemoText = useCallback((e) => {
    setMemoText(e.target.value);
  }, []);

  const onSubmitMemo = useCallback(() => {
    if (memoText.length < 5) {
      alert("내용을 5글자 이상 입력해주세요");
      return;
    }
    let lastMemo = memos;
    if (lastMemo !== null) {
      const tempMemo = [
        {
          id: memos[0].id + 1,
          date: curDate,
          text: memoText,
          Available: true,
        },
        ...memos,
      ];
      setMemoText("");
      setMemos(tempMemo);
      localStorage.setItem("memos", JSON.stringify(tempMemo));
      setIsWriteMemoFormOpend(false);
      return;
    }
    //첫 작성이면
    setMemos([{ id: 1, date: curDate, text: memoText, Available: true }]);
    setMemoText("");
    localStorage.setItem(
      "memos",
      JSON.stringify([
        { id: 1, date: curDate, text: memoText, Available: true },
      ])
    );
    setIsWriteMemoFormOpend(false);
  }, [curDate, memoText, memos]);

  const onRemoveMemo = useCallback(
    (id) => {
      const tempMemos = memos.map((e, i) => {
        if (e.id === id) {
          e.Available = false;
        }
        return e;
      });
      setMemos(tempMemos);
      localStorage.setItem("memos", JSON.stringify(tempMemos));
    },
    [memos]
  );

  const onChageKeywordSearch = useCallback((e) => {
    setKeywordSearchText(e.target.value);
    setMemos(JSON.parse(localStorage.getItem("memos")));
    setEmptySearchResult(false);
  }, []);

  useEffect(() => {
    if (
      keywordSearchText.length <= 0 ||
      keywordSearchText === " " ||
      keywordSearchText === "" ||
      keywordSearchText === null
    ) {
      setMemos(JSON.parse(localStorage.getItem("memos")));
    } else {
      const tempMemo = [...memos].filter((e) => {
        if (e.text.includes(keywordSearchText)) {
        }
        return e.text.includes(keywordSearchText);
      });
      if (tempMemo.length === 0) {
        setEmptySearchResult(true);
      }
      setMemos(tempMemo);
    }
  }, [keywordSearchText]);

  return (
    <div className="Memo">
      <div className="memoHeader">
        <MyHeader
          headText={headText}
          leftChild={<MyButton text={"<"} onClick={decreaseMonth}></MyButton>}
          rightChild={<MyButton text={">"} onClick={increaseMonth}></MyButton>}
        ></MyHeader>
      </div>
      <div className="memoControlMenu">
        {isWriteMemoFormOpend ? (
          <>
            <textarea value={memoText} onChange={onChageMemoText}></textarea>
            <button onClick={onSubmitMemo}>등록</button>
            <button onClick={() => setIsWriteMemoFormOpend((prev) => !prev)}>
              취소
            </button>
          </>
        ) : (
          <div className="memoControl">
            <div>
              <input
                placeholder="키워드 검색"
                onChange={onChageKeywordSearch}
                value={keywordSearchText}
              ></input>
            </div>
            {emptySearchResult && <p>검색결과 없음</p>}
            <button onClick={() => setIsWriteMemoFormOpend((prev) => !prev)}>
              메모 쓰기
            </button>
          </div>
        )}
      </div>

      <div className="MemoList">
        <ul>
          {currentMonthMemos &&
            currentMonthMemos.map((e, i) => {
              if (e.Available === true) {
                return (
                  <MemoItem
                    key={e.id}
                    data={e}
                    onRemoveMemo={onRemoveMemo}
                  ></MemoItem>
                );
              }
              return null;
            })}
        </ul>
      </div>
    </div>
  );
};

export default Memo;
