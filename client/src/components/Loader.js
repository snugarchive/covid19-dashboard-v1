import React from 'react'

const Loader = () => {
    return (
      <div className="spinner">
        <div
          className="spinner-border"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only"></span>
        </div>
        <div 
            className="spinner-message"
            style={{ margin: "2rem"}}
        >
          로딩하는 데 몇 초 간 소요될 수 있습니다.
        </div>
      </div>
    );
}

export default Loader;
