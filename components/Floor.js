import Matter from "matter-js";
import React from "react";
import { View } from "react-native-web";

const Floor = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.postion.x - widthBody / 2;
  const yBody = props.body.postion.y - heightBody / 2;

  const color = props.color;
  return (
    <View
      style={{
        backgroundColor: color,
        postion: "absolute",
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    />
  );
};
export default (world, color, pos, size) => {
  const initialFloor = Matter.Bodies.rectangle(pos.x, pos.y, size.height, {
    label: "Floor",
    isStatic: true,
  });
  Matter.World.add(world, initialFloor);
  return {
    body: initialFloor,
    color,
    pos,
    renderer: <Floor />,
  };
};
