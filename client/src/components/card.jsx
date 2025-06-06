import React from "react";

const Card = ({msg}) => {
   return <p>The message is: {msg && JSON.stringify(msg.message)} </p>
}

export default Card;