import React, {useCallback, useEffect, useState} from 'react';
import FoodHistory from "./FoodHistory";

type UserImageListType = {
  date: string;
  imgSrc: string[];
};

type PropsType = {
  userNumber: number,
  uploadState: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ]
}

function UserFoodHistory({ userNumber, uploadState} : PropsType) {
  const [userImageList, setUserImageList] = useState<UserImageListType[]>([]);

  const getUserFoodHistory = useCallback(() => {
    fetch("/file/history", {
      method: "POST",
      body: JSON.stringify({ userNumber }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res: Response) => res.json())
      .then((data: UserImageListType[]) => setUserImageList(data.reverse()));
  }, [userNumber]);

  useEffect(getUserFoodHistory, [getUserFoodHistory]);

  useEffect(() => {
    if (uploadState[0]) {
      getUserFoodHistory()
    }
  }, [getUserFoodHistory, uploadState]);

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
}

export default UserFoodHistory;