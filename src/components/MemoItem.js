import React, { useState } from "react";

const MemoItem = ({ data, onRemoveMemo }) => {
  const itemDate = new Date(data.date);
  const Days = ["일", "월", "화", "수", "목", "금", "토"];
  const itemTitle = `${itemDate.getMonth() + 1}월 ${itemDate.getDate()}일 ${
    Days[itemDate.getDay()]
  }요일의 메모입니다.`;

  const [isOpenedContent, setIsOpenedContent] = useState(false);

  const onClickOpenContent = (e) => {
    if (e.target.tagName === "LI") setIsOpenedContent((prev) => !prev);
  };

  return (
    <li className="MemoItem" onClick={onClickOpenContent}>
      {itemTitle}
      {isOpenedContent && <textarea defaultValue={data.text}></textarea>}
      <button
        onClick={() => {
          onRemoveMemo(data.id);
        }}
      >
        삭제
      </button>
    </li>
  );
};

export default MemoItem;
