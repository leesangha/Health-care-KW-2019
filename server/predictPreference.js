const { recommend } = require("./recommendation-model/recommend");

function quickSort(list, left = 0, right = list.length - 1) {
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);
  const pivot = list[mid].predicted_preference;
  const divide = (list, left, right, pivot) => {
    while (left <= right) {
      while (list[left].predicted_preference > pivot) {
        left++;
      }
      while (list[right].predicted_preference < pivot) {
        right--;
      }
      if (left <= right) {
        let swap = list[left];
        list[left] = list[right];
        list[right] = swap;
        left++;
        right--;
      }
    }
    return left;
  };
  const partition = divide(list, left, right, pivot);

  quickSort(list, left, partition - 1);
  quickSort(list, partition, right);

  return list;
}

async function predict(preference, foodNumberList, userNumber) {
  try {
    let predicted_preference = await recommend(preference, userNumber);

    predicted_preference = predicted_preference.map((item, index) => ({
      food_no: foodNumberList[index],
      predicted_preference: item
    }));

    return quickSort(predicted_preference);
  } catch (err) {
    console.error(err);
    // 에러 처리를 나중에 해야됩니다.
  }
}

module.exports.predictPreference = predict;
