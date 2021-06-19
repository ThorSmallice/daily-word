/**
 * 获取路径下标
 * @param {*} rowNum 一行个数
 * @param {*} layer 层数
 */
function getPathArr(rowNum, layer = 0) {
  let maxLayer = Math.floor(rowNum / 2);
  let pathArr = [];
  while (maxLayer) {
    if (layer === maxLayer) {
      break;
    }

    // 上
    for (let index = layer * (rowNum + 1); index <= (rowNum - 1) * (layer + 1); index++) {
      pathArr.push(index);
    }

    // 右
    for (let index = 1; index < rowNum - layer * 2; index++) {
      pathArr.push((rowNum - 1) * (layer + 1) + index * rowNum);
    }

    // 下
    for (let index = rowNum * rowNum - 2 - layer * (rowNum + 1); index >= rowNum * (rowNum - layer - 1) + layer; index--) {
      pathArr.push(index);
    }

    // 左
    for (let index = 0; index < rowNum - (layer + 1) * 2; index++) {
      pathArr.push(rowNum * rowNum - rowNum * (layer + 2 + index) + layer);
    }
	
    layer++;
  }
  return pathArr;
}