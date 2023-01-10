// import { BigNumber } from "bignumber.js";

// export function formatBigNumberSignificant(value: BigNumber, digits = 6): string {
//   const number = value.toFormat({
//     prefix: "",
//     decimalSeparator: ".",
//     groupSeparator: "",
//     groupSize: 0,
//     secondaryGroupSize: 0,
//   });
//   if (number.length <= digits + 1) return number;
//   const [wholes, decimals] = number.split(".");
//   if (wholes.length >= digits) return wholes;
//   const pattern = new RegExp(
//     `^[0]*[0-9]{0,${digits - (wholes === "0" ? 0 : wholes.length)}}`
//   );

//   return `${wholes}.${decimals.match(pattern)?.[0]}`;
// }
