import React, { useState } from "react";
import { findIndex } from "lodash";
import Message from "./Message";
import "./App.css";

export type MessagesType = {
  id: string; // this would be set with a date (new Date()).getTime()
  userMessage: string;
  replies: string[];
};

const App: React.FunctionComponent = () => {
  // new way to set message
  const [message, setNewMessages] = useState<MessagesType[]>([]);
  const [activeMessage, setActive] = useState<string | undefined>(undefined);
  const [inputText, setInputText] = useState<string>("");
  // const [replyText, setReplyText] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const addNewMessage = (mess: string) => {
    setNewMessages((message: any) => [
      ...message,
      {
        id: new Date().getTime(),
        userMessage: mess,
        replies: []
      }
    ]);
  };

  const addReplies = (mess: string, id: string) => {
    // TODO: remove any
    setNewMessages((message: any) => {
      //message.d.replies.push(mess);
      const index = findIndex(message, (v: any) => v.id === id);
      // mutation on state, this causes double entrie
      // fix bug here.
      message[index].replies.push(mess);
      return [...message];
    });
  };

  const submitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Resets the reply props
    setActive(undefined);

    if (activeMessage) {
      // Add reply to message
      setInputText("");
      return addReplies(inputText, activeMessage);
    }

    // Add new message
    addNewMessage(inputText);

    if (!inputText) return;
    setInputText("");
  };

  const messagesMarkup = message.map((m) => (
    <Message
      activeMessage={activeMessage}
      data={m}
      setActive={setActive}
      key={m.id}
      text={m.userMessage}
    />
  ));

  return (
    <div className="chat-app">
      <div className="user-input">
        Enter User Name:
        <input type="text" onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div className="chat-wrapper">
        <div className="user">
          <h3 className="user__name">{userName}</h3>
        </div>
        <div className="messages">{messagesMarkup}</div>
        <div className="submit-wrapper">
          <form onSubmit={submitMessage}>
            <input
              value={inputText}
              type="text"
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
