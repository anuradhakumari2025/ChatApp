import React from "react";

const LayoutLoaders = () => {
  return (
    <div
      style={{
        // backgroundColor: "red",
        height: "100vh",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "0.9fr 1.3fr 0.7fr",
        gap: "25px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(43, 43, 43, 0.3)",
          height: "100%",
          boxShadow: "0px 4px 20px rgba(73, 71, 71, 0.8)",
        }}
      ></div>
      <div
        style={{
          // paddingTop:"25px",
          // backgroundColor: "yellow",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        {Array(7)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              style={{
                padding: "30px 0px",
                backgroundColor: "rgba(43, 43, 43, 0.3)",
                boxShadow: "0px 4px 13px rgba(73, 71, 71, 0.8)",
              }}
            ></div>
          ))}
      </div>
      <div
        style={{
          backgroundColor: "rgba(43, 43, 43, 0.3)",
          boxShadow: "0px 4px 20px rgba(73, 71, 71, 0.8)",
        }}
      ></div>
    </div>
  );
};

export default LayoutLoaders;
