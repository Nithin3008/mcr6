import React, { useContext, useState } from "react";
import { DataContext } from "./data";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import "./rest.css";
export const RestDetails = () => {
  const { restId } = useParams();
  const { changeData, setChange } = useContext(DataContext);
  const [showReview, setShow] = useState(false);
  const [newReview, setReview] = useState({
    revName: "Nithin",
    pp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoZ_Xg9XbpVTth91jSsUrrGzlx_v-YZ8pD4YLfGUR4CAdzq_D-DhN_&s=0",
  });
  const restData = changeData.find(({ id }) => id === Number(restId));
  const rating =
    restData.ratings.reduce((acc, val) => acc + val.rating, 0) /
    restData.ratings.length;
  function addReview(comment) {
    const x = { ...restData, ratings: [...restData.ratings, comment] };
    const y = changeData.filter(({ id }) => id !== Number(restId));
    const newData = [...y, x];
    setChange([...newData]);
    setShow(!showReview);
  }
  const nav = useNavigate();
  return (
    <>
      <h1 className="reDirect">
        <svg
          onClick={() => nav("/")}
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          stroke-width="2"
          stroke-linecap="square"
          stroke-linejoin="round"
        >
          <path d="M19 12H6M12 5l-7 7 7 7" />
        </svg>
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          //   gap: "50px",
        }}
      >
        <div>
          <h1>{restData.name}</h1>
          <p>Address: {restData.address}</p>
          <p>Phone: {restData.phone}</p>
          <p>Average Rating: {rating.toFixed(2)}</p>
        </div>
        <button style={{ height: "50px" }} onClick={() => setShow(!showReview)}>
          Add Review
        </button>
      </div>
      <hr></hr>
      <h2>Reviews</h2>
      <div className="userReviews">
        {restData.ratings.map((review) => (
          <ul>
            <li>
              <img src={review.pp}></img>
              <span>{review.revName}</span>
              <li>
                <p>{review.comment}</p>
              </li>
            </li>
            <li>
              <p>{review.rating}🌟</p>
            </li>
          </ul>
        ))}
      </div>

      <div
        className="reviewModal"
        style={{ display: showReview ? "block" : "none" }}
      >
        <div>
          <svg
            onClick={() => setShow(!showReview)}
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            stroke-width="2"
            stroke-linecap="square"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <p>
            Add Review:
            <input
              onChange={(event) =>
                setReview({ ...newReview, comment: event.target.value })
              }
              type="text"
              placeholder="enter review"
            ></input>
            <select
              onChange={(event) =>
                setReview({ ...newReview, rating: Number(event.target.value) })
              }
            >
              <option>Select Rating</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </p>
          <button onClick={() => addReview(newReview)}>Submit</button>
        </div>
      </div>
    </>
  );
};
