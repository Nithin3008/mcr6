import React, { useContext, useState } from "react";
import { DataContext } from "./data";
import { useNavigate } from "react-router";
import "./home.css";
export const Home1 = () => {
  const { cuisineData, restaurantsData } = useContext(DataContext);
  const [restaurentList, setRestaurent] = useState([]);
  function selectRestar(id) {
    const list = restaurantsData.filter((val) => val.cuisine_id === id);
    console.log(list);
    setRestaurent([...list]);
  }
  const cuisine = [...cuisineData];
  const nav = useNavigate();
  return (
    <>
      <section>
        <h1>Food Ordering App</h1>
        <h2>Select your Cuisine</h2>
        <div className="cusinieList">
          {cuisine.map((val) => (
            <ul>
              <li onClick={() => selectRestar(val.id)}>{val.name}</li>
            </ul>
          ))}
        </div>
        <div className="restaurentList">
          {restaurentList.map((val) => (
            <ul className="restaurentList__details">
              <li>Dishes by{val.name}</li>
              <ul
                onClick={() => nav(`/RestDetails/${val.id}`)}
                className="details__data"
              >
                {val.menu.map((items) => (
                  <p>
                    <img src={items.imgSrc}></img>
                    <li>Name: {items.name}</li>
                    <li>Price: {items.price}</li>
                    <li>Quantity: {items.qty}</li>
                  </p>
                ))}
              </ul>
            </ul>
          ))}
        </div>
      </section>
    </>
  );
};
