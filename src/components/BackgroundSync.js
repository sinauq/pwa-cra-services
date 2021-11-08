import React from "react";

const BackgroundSync = ({ sampleApi }) => {
  const userData = new FormData();

  function handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = (target.type = "text" ? target.value : target.files[0]);
    userData.append([name], value);
  }

  function onSubmit() {
    fetch(sampleApi, {
      method: "POST",
      body: userData,
    })
      .then(res => res.json())
      .then(res => console.log("success", res))
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
      <label>Last Name </label>
      <input type="text" name="last_name" onChange={handleInputChange} />
      <br/>
      <label>Email </label>
      <input type="email" name="email" onChange={handleInputChange} />
      <br/>
      <button onClick={onSubmit}>submit</button>
      <br />
    </div>
  );
};

export default BackgroundSync;
