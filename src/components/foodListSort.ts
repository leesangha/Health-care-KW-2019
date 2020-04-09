type ListType = {
  food_no: number;
  result: number;
}[];

function quickSort(list: ListType, left = 0, right = list.length - 1): ListType | undefined {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  const pivot = list[mid].result;
  const divide = (
    list: ListType,
    left: number,
    right: number,
    pivot: number
  ) => {
    while (left <= right) {
      while (list[left].result > pivot) {
        left++;
      }
      while (list[right].result < pivot) {
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

export {quickSort as foodListSort}