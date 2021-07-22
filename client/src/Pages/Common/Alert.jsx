import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Alert = styled.div`
  position: fixed;
  background-color: ${(props) =>
    props.isError ? "red" : props.theme.secondaryColor};

  color: #fff;
  right: 0;
  padding: 15px;
  border-radius: 4px 0 0 4px;
  top: 30%;
  transform: translateX(100%);
  transition: 0.3s transform ease-in-out;

  &.is--displaying {
    transform: translateX(0);
  }
`;

function getAlertFromState(alert) {
  if (alert) {
    return alert;
  }
  return null;
}

const Warning = () => {
  const displayClass = "is--displaying";
  const time = 3000; // 3 secs
  const [displaying, setDisplaying] = useState(false);
  const alert = useSelector((state) => getAlertFromState(state.alert));

  useEffect(() => {
    setDisplaying(true);
    let timer = window.setTimeout(function () {
      setDisplaying(false);
    }, time);

    return () => {
      window.clearTimeout(timer);
    };
  }, [alert]);

  if (alert) {
    return (
      <Alert
        role="alert"
        className={displaying ? displayClass : ""}
        isError={alert.isError}
      >
        {alert.content}
      </Alert>
    );
  }
  return <div className="hidden"></div>;
};

export default Warning;
