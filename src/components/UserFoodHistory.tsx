import React, {useEffect, useState} from 'react';
import FoodHistory from "./FoodHistory";

type UserImageListType = {
  date: string;
  imgSrc: string[];
};

function UserFoodHistory({ userNumber }: { userNumber: number }) {
  const [userImageList, setUserImageList] = useState<UserImageListType[]>([]);

  useEffect(() => {
    fetch("/file/history", {
      method: "POST",
      body: JSON.stringify({ userNumber }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res: Response) => res.json())
      .then((data: UserImageListType[]) => setUserImageList(data.reverse()));
  }, [userNumber]);
  return (
    <section className="register-page">
      <article className="history-page">
        {userImageList.length !== 0 ? (
          userImageList.map(({ date, imgSrc }, index) => (
            <FoodHistory key={index} date={date} imgSrc={imgSrc} />
          ))
        ) : (
          <p>등록한 음식이 없어요.</p>
        )}
      </article>
    </section>
  );
};

export default UserFoodHistory;