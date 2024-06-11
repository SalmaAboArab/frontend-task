import React from "react";

export default function Filter({ getItems}) {

  const getSearchValue = (input) => {
    getItems(input.target.value);
  };
  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  return (
    <div className="w-100">
      <div className="row mb-5 mt-3 ms-4 gx-0 justify-content-center">
        <div className="col-md-6 col-sm-8 ">
          <input
            type="text"
            className="form-control py-2"
            placeholder="Search by group name..."
            onChange={debounce(getSearchValue,500)}
          />
        </div>
      </div>
    </div>
  );
}
