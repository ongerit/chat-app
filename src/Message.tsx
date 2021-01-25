import React, { FunctionComponent } from "react";
import { MessagesType } from "./App";

interface IProps {
  data: MessagesType;
  activeMessage: string | undefined;
  setActive: (activeMessage: string) => void;
  text: string;
}

const Message: FunctionComponent<IProps> = ({
  activeMessage,
  data,
  setActive,
  text
}) => {
  const blurMessages = () => {
    if (!activeMessage) return "";
    return activeMessage === data.id ? "" : "blur";
  };

  return (
    <>
      <div
        key={data.id}
        onClick={() => setActive(data.id)}
        className={`message ${blurMessages()}`}
      >
        {text}
      </div>
      {data.replies &&
        data.replies.map((m, idx) => (
          <div key={idx} className="message replied">
            {m}
          </div>
        ))}
    </>
  );
};

export default Message;
