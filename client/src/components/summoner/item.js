import React from "react";

const Item = props => {
  return (
    <div className="ui segment">
      <div className="ui tiny images centered">
        <img
          className="ui mini image"
          src={props.item[0].imageurl}
          alt={props.item[0].name}
        />
        <img
          className="ui mini image"
          src={props.item[1].imageurl}
          alt={props.item[1].name}
        />
        <img
          className="ui mini image"
          src={props.item[2].imageurl}
          alt={props.item[2].name}
        />
        <img
          className="ui mini image"
          src={props.item[3].imageurl}
          alt={props.item[3].name}
        />
      </div>
      <div className="ui tiny images centered">
        <img
          className="ui mini image"
          src={props.item[4].imageurl}
          alt={props.item[4].name}
        />
        <img
          className="ui mini image"
          src={props.item[5].imageurl}
          alt={props.item[5].name}
        />
        <img
          className="ui mini image"
          src={props.item[6].imageurl}
          alt={props.item[6].name}
        />
      </div>
    </div>
  );
};

export default Item;
