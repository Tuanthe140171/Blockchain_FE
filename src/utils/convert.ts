import BigNumber from "bignumber.js";

export const toPercent = (num: BigNumber) => {
    return num.multipliedBy(100).toFixed(4);
}