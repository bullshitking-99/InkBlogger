/**
 * 二分查找，没找到就返回插入位置左侧的索引
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
export function searchInsert(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return right;
}
