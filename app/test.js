function Password() {
  console.log("dd");
  var key = "怎么回事ee4a24c2-634d-4b12-ab66-4cc7e6e928911678181618opentiger",
    currentValue,
    startIndex,
    keyIndex = 0,
    keyLenth = key.length,
    blocks = new Uint32Array(17),
    buffer8 = new Uint8Array(68),
    unknowArr = [0, 8, 16, 24];
  var start = 0,
    hashed = true,
    lastByteIndex = 0,
    bytes = 0,
    hBytes = 0;

  function hash() {}
  while (keyIndex < keyLenth) {
    if (
      (hashed &&
        ((hashed = !1),
        (blocks[0] = blocks[16]),
        (blocks[16] =
          blocks[1] =
          blocks[2] =
          blocks[3] =
          blocks[4] =
          blocks[5] =
          blocks[6] =
          blocks[7] =
          blocks[8] =
          blocks[9] =
          blocks[10] =
          blocks[11] =
          blocks[12] =
          blocks[13] =
          blocks[14] =
          blocks[15] =
            0)),
      undefined)
    ) {
      if (true)
        for (
          startIndex = start; // 0
          keyIndex < keyLenth && startIndex < 40;
          ++keyIndex
        )
          buffer8[startIndex++] = key[keyIndex];
      else
        for (
          startIndex = start;
          keyIndex < keyLenth && startIndex < 0x40;
          ++keyIndex
        )
          blocks[startIndex >> 2] |=
            key[keyIndex] << unknowArr[3 & startIndex++];
    } else {
      if (true)
        for (
          startIndex = start;
          keyIndex < keyLenth && startIndex < 0x40;
          ++keyIndex
        )
          (currentValue = key.charCodeAt(keyIndex)),
            currentValue < 0x80
              ? (buffer8[startIndex++] = currentValue)
              : currentValue < 0x800
              ? ((buffer8[startIndex++] = 0xc0 | (currentValue >> 6)),
                (buffer8[startIndex++] = 0x80 | (0x3f & currentValue)))
              : currentValue < 0xd800 || currentValue >= 0xe000
              ? ((buffer8[startIndex++] = 0xe0 | (currentValue >> 12)),
                (buffer8[startIndex++] = 0x80 | ((currentValue >> 6) & 0x3f)),
                (buffer8[startIndex++] = 0x80 | (0x3f & currentValue)))
              : ((currentValue =
                  0x10000 +
                  (((0x3ff & currentValue) << 10) |
                    (0x3ff & key.charCodeAt(++keyIndex)))),
                (buffer8[startIndex++] = 0xf0 | (currentValue >> 0x12)),
                (buffer8[startIndex++] = 0x80 | ((currentValue >> 12) & 0x3f)),
                (buffer8[startIndex++] = 0x80 | ((currentValue >> 6) & 0x3f)),
                (buffer8[startIndex++] = 0x80 | (0x3f & currentValue)));
      else
        for (
          startIndex = start;
          keyIndex < keyLenth && startIndex < 0x40;
          ++keyIndex
        )
          (currentValue = key.charCodeAt(keyIndex)),
            currentValue < 0x80
              ? (blocks[startIndex >> 2] |=
                  currentValue << unknowArr[3 & startIndex++])
              : currentValue < 0x800
              ? ((blocks[startIndex >> 2] |=
                  (0xc0 | (currentValue >> 6)) << unknowArr[3 & startIndex++]),
                (blocks[startIndex >> 2] |=
                  (0x80 | (0x3f & currentValue)) <<
                  unknowArr[3 & startIndex++]))
              : currentValue < 0xd800 || currentValue >= 0xe000
              ? ((blocks[startIndex >> 2] |=
                  (0xe0 | (currentValue >> 12)) << unknowArr[3 & startIndex++]),
                (blocks[startIndex >> 2] |=
                  (0x80 | ((currentValue >> 6) & 0x3f)) <<
                  unknowArr[3 & startIndex++]),
                (blocks[startIndex >> 2] |=
                  (0x80 | (0x3f & currentValue)) <<
                  unknowArr[3 & startIndex++]))
              : ((currentValue =
                  0x10000 +
                  (((0x3ff & currentValue) << 10) |
                    (0x3ff & key.charCodeAt(++keyIndex)))),
                (blocks[startIndex >> 2] |=
                  (0xf0 | (currentValue >> 0x12)) <<
                  unknowArr[3 & startIndex++]),
                (blocks[startIndex >> 2] |=
                  (0x80 | ((currentValue >> 12) & 0x3f)) <<
                  unknowArr[3 & startIndex++]),
                (blocks[startIndex >> 2] |=
                  (0x80 | ((currentValue >> 6) & 0x3f)) <<
                  unknowArr[3 & startIndex++]),
                (blocks[startIndex >> 2] |=
                  (0x80 | (0x3f & currentValue)) <<
                  unknowArr[3 & startIndex++]));
    }
    (lastByteIndex = startIndex),
      (bytes += startIndex - start),
      startIndex >= 0x40
        ? ((start = startIndex - 0x40), hash(), (hashed = !0))
        : (start = startIndex);
  }
  return (
    bytes > 0xffffffff &&
      ((hBytes += (bytes / 0x100000000) << 0), (bytes = bytes % 0x100000000)),
    {
      keyLenth: keyLenth,
      keyIndex: keyIndex,
      startIndex: startIndex,
      currentValue: currentValue,
      buffer8: buffer8,
      key: key,
      blocks: blocks,
    }
  );
}
Password.prototype.hex = function () {
  var arr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  this.finalize();
  var h0 = this["h0"],
    h1 = this["h1"],
    h3 = this["h2"],
    h4 = this["h3"];
  return (
    arr[(h0 >> 0x4) & 0xf] +
    arr[0xf & h0] +
    arr[(h0 >> 0xc) & 0xf] +
    arr[(h0 >> 0x8) & 0xf] +
    arr[(h0 >> 0x14) & 0xf] +
    arr[(h0 >> 0x10) & 0xf] +
    arr[(h0 >> 0x1c) & 0xf] +
    arr[(h0 >> 0x18) & 0xf] +
    arr[(h1 >> 0x4) & 0xf] +
    arr[0xf & h1] +
    arr[(h1 >> 0xc) & 0xf] +
    arr[(h1 >> 0x8) & 0xf] +
    arr[(h1 >> 0x14) & 0xf] +
    arr[(h1 >> 0x10) & 0xf] +
    arr[(h1 >> 0x1c) & 0xf] +
    arr[(h1 >> 0x18) & 0xf] +
    arr[(h3 >> 0x4) & 0xf] +
    arr[0xf & h3] +
    arr[(h3 >> 0xc) & 0xf] +
    arr[(h3 >> 0x8) & 0xf] +
    arr[(h3 >> 0x14) & 0xf] +
    arr[(h3 >> 0x10) & 0xf] +
    arr[(h3 >> 0x1c) & 0xf] +
    arr[(h3 >> 0x18) & 0xf] +
    arr[(h4 >> 0x4) & 0xf] +
    arr[0xf & h4] +
    arr[(h4 >> 0xc) & 0xf] +
    arr[(h4 >> 0x8) & 0xf] +
    arr[(h4 >> 0x14) & 0xf] +
    arr[(h4 >> 0x10) & 0xf] +
    arr[(h4 >> 0x1c) & 0xf] +
    arr[(h4 >> 0x18) & 0xf]
  );
};

var data = new Password()["hex"]();

console.log("data", data);

// const params = {
//   prompt: "怎么回事",
//   conversation_id: "ee4a24c2-634d-4b12-ab66-4cc7e6e92891",
//   timestamp: "1678181618",
//   sign: "63aa8595579e7929",
// };

// // -
// keyLenth: 59
// keyIndex: 0
// startIndex: undefined
// currentValue: undefined
// _0x34162e: undefined
// buffer8: Uint8Array(68) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, buffer: ArrayBuffer(68), byteLength: 68, byteOffset: 0, length: 68, Symbol(Symbol.toStringTag): 'Uint8Array']
// key: "怎么回事ee4a24c2-634d-4b12-ab66-4cc7e6e928911678181618opentiger"
// _0x316349: ƒ (_0x20fe03,_0x5f03ea)
// blocks: Uint32Array(17) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, buffer: ArrayBuffer(68), byteLength: 68, byteOffset: 0, length: 17, Symbol(Symbol.toStringTag): 'Uint32Array']
