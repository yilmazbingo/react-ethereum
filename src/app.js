import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import lottery from "./lottery";
import web3 from "./web3";
import { LotteryForm } from "./components/form";

const App = () => {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [message, setMessage] = useState("");

  // useEffect doesn't expect the callback function to return Promise,
  useEffect(() => {
    const getManager = async () => {
      // we dont need this call({from:accounts[]}). default is the first account of metamask
      const manager = await lottery.methods.manager().call();
      const lotteryPlayers = await lottery.methods.getPlayers().call();
      // balance is not a number. it is in object
      const balance = await web3.eth.getBalance(lottery.options.address);
      setManager(manager);
      setPlayers(lotteryPlayers);
      setBalance(balance);
    };
    try {
      getManager();
    } catch (error) {
      console.log(error);
    }
  }, [web3, balance, players, manager]);

  const onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    setMessage("Waiting on transacion success...");
    // when we send a transaction we do not get any value back
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    setMessage("Winner has been picked");
  };
  return (
    <Container>
      <Row>
        <Col>
          <h2>Lottery Contract</h2>

          <p> Contract Manager: {manager} </p>
          <p>
            There are {players.length} people entered competing to win{" "}
            {web3.utils.fromWei(balance, "ether")} ether!
          </p>
          <LotteryForm lotteryInstance={lottery} web3={web3} />
          <hr />
          <h4>Ready to pick a winner</h4>
          <button disabled={!players.length} onClick={onClick}>
            Pick a winner
          </button>
          <h4>{message}</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
