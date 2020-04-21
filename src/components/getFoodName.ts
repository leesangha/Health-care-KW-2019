type FoodInfoType = {
  result: { food_name: string }[]
}

function getFoodInfo(): Promise<FoodInfoType> {
  return new Promise((resolve, reject) => {
    fetch("/food/name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res: Response) => res.json())
      .then((data: FoodInfoType) => {
        sessionStorage.setItem("foodInfo", JSON.stringify(data));
        resolve(data);
      })
      .catch((err: Error) => reject(err));
  })
}

export default async function getFoodName(foodNumber: number): Promise<string> {
  const foodInfo = sessionStorage.getItem('foodInfo');
  const _foodInfo: FoodInfoType = foodInfo === null ? await getFoodInfo() : JSON.parse(foodInfo);

  return _foodInfo.result[foodNumber].food_name;
}