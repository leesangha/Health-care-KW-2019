import React from "react";

function RegisterWelcome({ mouseOver }: { mouseOver: boolean }) {
  return (
    <>
      <div className="welcome">
        {mouseOver ? (
          <i className="far fa-surprise fa-2x" />
        ) : (
          <i className="far fa-meh-blank fa-2x" />
        )}
      </div>
      <div className="welcome">
        <p>오늘 먹은 식단을 등록해보세요!</p>
      </div>
    </>
  );
}

export default RegisterWelcome;
