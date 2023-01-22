const fR = {
  "#": "[0-9]",
  a: "[A-Za-z]",
  "*": "[A-Za-z0-9]",
};

// const oP = [
//   {
//     mask: "Q",
//     regex: /:/gim,
//     val: ":",
//   },
//   {
//     mask: "T",
//     regex: /\//gim,
//     val: "/",
//   },
//   {
//     mask: "S",
//     regex: /-/gim,
//     val: "-",
//   },
//   {
//     mask: "L",
//     regex: /\(/gim,
//     val: "(",
//   },
//   {
//     mask: "R",
//     regex: /\)/gim,
//     val: ")",
//   },
//   {
//     mask: "P",
//     regex: /\+/gim,
//     val: "+",
//   },
// ];

const useInputMask = () => {
  const cRx = (sp = "", fr) => sp.match(fr);

  const maskedText = (mask, text = "") => {
    if (typeof mask !== "string") {
      throw new Error(
        `mask property expected a string value but got ${typeof mask} ...`
      );
    }

    let sM = mask.split("");
    let sP = text.split("");

    for (let i = 0; i < sM.length; i++) {
      const el = sM[i];

      if (el === "?") {
        if (!sP[i]) {
          break;
        }
      } else {
        if (sP.length > 0) {
          if (!fR[el]) {
            if (sP[i] !== el) {
              sP.splice(i, 0, el);
            }
          } else {
            if (!fR[el] && !sP[i]) {
              sP[i] !== el && sP.splice(i, 0, el);
            } else if (sP[i]) {
              if (!cRx(sP[i], fR[el])) {
                sP[i] = "";
              }
            }
            if (!sP[i]) {
              break;
            }
          }
        } else {
          sP = [];
          break;
        }
      }
    }

    for (let index = 0; index < sP.length; index++) {
      if (sP[index] === " ") {
        if (sM[index] === "?") sP[index] = "";
      }
    }

    return sP.join().replace(/,/gim, "").trim().substring(0, sM.length);
  };

  return maskedText;
};

export default useInputMask;
