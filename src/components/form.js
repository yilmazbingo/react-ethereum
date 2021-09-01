import React, { useState } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";

export const LotteryForm = ({ lotteryInstance, web3 }) => {
  // text input always string
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const onEnter = async (event) => {
    event.preventDefault();

    // when we send the transaction, we have to retrieve our list of accounts from web3 obj
    const accounts = await web3.eth.getAccounts();

    setMessage("waiting on transaction sucess...");
    await lotteryInstance.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(amount, "ether"),
    });

    setMessage("You have been entered!");
  };
  return (
    <div>
      <Form onSubmit={onEnter}>
        <FormGroup>
          <Form.Label>Amount of ether to enter</Form.Label>
          <Form.Control
            id="amount"
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </FormGroup>
        <Button className="mt-1" variant="primary" type="submit">
          Enter
        </Button>
      </Form>
      <hr />
      <h2>{message}</h2>
    </div>
  );
};
