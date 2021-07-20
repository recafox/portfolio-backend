import { useSelector } from "react-redux";

function getAlertFromState(alert) {
  if (alert) {
    return alert;
  }
  return null;
}

const Warning = () => {
  const alert = useSelector((state) => getAlertFromState(state.alert));

  function getClassName() {
    if (alert.isError) {
      return "is--error";
    }
    return "";
  }

  if (alert) {
    return (
      <div role="alert" className={getClassName()}>
        {alert.content}
      </div>
    );
  }
  return <div className="hidden"></div>;
};

export default Warning;
