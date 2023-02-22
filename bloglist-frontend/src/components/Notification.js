import React from "react";
import { useSelector } from "react-redux";

// const Notification = ({ message, type }) => {
//   if (message === null) {
//     return null;
//}

const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  //console.log(notification,"notification")
  if (notification.message === null) {
    return null;
  }

  return (
    <div className={notification.type === "update" ? "update" : "error"}>
      {notification.message}
    </div>
  );
};
export default Notification;
