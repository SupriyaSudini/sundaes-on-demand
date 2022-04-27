import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOption";
import ToppingOptions from "./ToppingOption";
import Row from "react-bootstrap/Row";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  // optiontype is 'scoops' or 'toppings'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        //TODO: handle error response
      });
  }, [optionType]);

  //replace 'null' with 'ToppingOption' when available
  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <Row> {optionItems} </Row>;
}
