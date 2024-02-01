import { data } from "autoprefixer";
import React from "react";

const Test = () => {
 fetch("https://crossorigin.me/https://fcarena-2-0-server.vercel.app")
   .then((res) => res.json())
   .then((data) => console.log(data))
   .catch((error) => console.error("Error fetching data:", error));


  return <div>{data}</div>;
};

export default Test;
