import React from "react";

import { ThreeDots, Watch } from "react-loader-spinner";

export default function Loading() {
  return (
    <>
      <div className=" loader w-100 vh-100 d-flex justify-content-center align-items-center">
        <ThreeDots
          visible={true}
          // height="35"
          // width="5%"
          color="black"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}
