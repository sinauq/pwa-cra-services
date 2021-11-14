import React from "react";
import { TransferEvent } from "./project-events";
import { publish } from "./pubsub";
import TransferMessage from "./TransferMessage";

const Form = ({ sampleApi }) => {
  const userData = new FormData();

  function handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = (target.type === "text" ? target.value : target.files[0]);
    userData.append([name], value);
  }

  function handlePublish(msg) {
    publish(new TransferEvent({ msg: msg }));
    console.log(msg);
  }

  function onSubmit() {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("progress", updateProgress);
    xhr.addEventListener("load", transferComplete);
    xhr.addEventListener("error", transferFailed);
    xhr.addEventListener("abort", transferCanceled);

    xhr.open("POST", sampleApi);

    xhr.onreadystatechange = function (e) {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 201) {
        handlePublish("connection ok");
      } else {
        handlePublish(`connection error`);
      }
    };
    xhr.send(userData);

    function updateProgress(oEvent) {
      if (oEvent.lengthComputable) {
        var percentComplete = (oEvent.loaded / oEvent.total) * 100;
        handlePublish(`upload progress: ${percentComplete}%`);
      } else {
        console.log("not able to show progress");
      }
    }

    function transferComplete(evt) {
      handlePublish(`The transfer is complete.`);
      console.log('response: ',xhr.response)
    }

    function transferFailed(evt) {
      handlePublish("connection error. transfer will continue after connectivity is restored.");
    }

    function transferCanceled(evt) {
      handlePublish("The transfer has been canceled by the user.");
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
