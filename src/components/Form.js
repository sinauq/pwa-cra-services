import React from "react";
import TransferMessage from "./TransferMessage";
const broadcast = new BroadcastChannel("channel-123");

const Form = ({ sampleApi }) => {
  const userData = new FormData();

  function handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = (target.type === "text" ? target.value : target.files[0]);
    userData.append([name], value);
  }

  function handlePostMessage(msg) {
  console.log(msg);
  broadcast.postMessage({ type: "MSG_ID", msg: msg });
}

  function onSubmit() {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("progress", updateProgress);
    xhr.addEventListener("load", transferComplete);
    xhr.addEventListener("error", transferFailed);
    xhr.addEventListener("abort", transferCanceled);

    xhr.open("POST", sampleApi, true);

    xhr.onreadystatechange = function (e) {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 201) {
        handlePostMessage("connection ok");
      } else {
        handlePostMessage(`connection error`);
      }
    };
    xhr.send(userData);

    function updateProgress(oEvent) {
      if (oEvent.lengthComputable) {
        var percentComplete = (oEvent.loaded / oEvent.total) * 100;
        handlePostMessage(`upload progress: ${percentComplete}%`);
      } else {
        console.log("not able to show progress");
      }
    }

    function transferComplete(evt) {
      handlePostMessage(`The transfer is complete.`);
      console.log('response: ',xhr.response)
    }

    function transferFailed(evt) {
      handlePostMessage("connection error. transfer will continue after connectivity is restored.");
    }

    function transferCanceled(evt) {
      handlePostMessage("The transfer has been canceled by the user.");
    }
  }

  return (
    <div>
      <br />
      <label>Upload image </label>
      <input type="file" name="avatar" onChange={handleInputChange} />
      <br />
      <label>First Name </label>
      <input type="text" name="first_name" onChange={handleInputChange} />
      <br />
      <button onClick={onSubmit}>submit</button>
      <TransferMessage />
    </div>
  );
};

export default Form;
