const csv = require('csv-parser');
const fs = require('fs');

const files = [1,2,3,4,5,6,7,8];
files.forEach(async (file) => {
  const stars = [];
  fs.createReadStream(`stars-sector${file}.csv`)
  .pipe(csv())
  .on('data', (row) => {
    if (row.phot_g_mean_mag <= 13) {
      const starInfo = 
        [
          parseFloat(row.b)+90.0,
          parseFloat(row.l),
          parseFloat(row.lum_val),
          parseFloat(row.radius_val),
          parseFloat(row.teff_val),
          parseFloat(row.phot_g_mean_mag)
        ];
      stars.push(starInfo);
    }
  })
  .on('end', () => {
    console.log(stars.length);
    fs.writeFileSync(`./src/stars-${file}.json`, JSON.stringify(stars));
  })
})
// const stars1 = [];
// const stars2 = [];
// const stars3 = [];
// const stars4 = [];
// const stars5 = [];
// const organizeCSV = (fileCount) => {
//   let count = 1;
//   fs.createReadStream(`stars-sector${fileCount}.csv`)
//     .pipe(csv())
//     .on('data', (row) => {
//       if (row.phot_g_mean_mag <= 15) {
//         const starInfo = 
//           [
//             parseFloat(row.b)+90.0,
//             parseFloat(row.l),
//             parseFloat(row.lum_val),
//             parseFloat(row.radius_val),
//             parseFloat(row.teff_val),
//             parseFloat(row.phot_g_mean_mag)
//           ];
//         stars1.push(starInfo);
//         // if (count === 2) {
//         //   stars2.push(starInfo);
//         //   count += 1;
//         // } else if (count === 3) {
//         //   stars3.push(starInfo);
//         //   count += 1;
//         // } else if (count === 4) {
//         //   stars4.push(starInfo);
//         //   count += 1;
//         // } else if (count === 5) {
//         //   stars5.push(starInfo);
//         //   count = 1;
//         // } else {
//         //   stars1.push(starInfo);
//         //   count += 1;
//         // }
//       }
//     })
//     .on('end', () => {
//       console.log(stars1.length,stars2.length,stars3.length,stars4.length,stars5.length)
//     })
// }
// [1,2,3,4,5,6,7,8
// ].forEach((fileCount) => {
//   organizeCSV(fileCount);
// });
// fs.writeFileSync(`stars-1.json`, JSON.stringify(stars1));
// fs.writeFileSync(`stars-2.json`, JSON.stringify(stars2));
// fs.writeFileSync(`stars-3.json`, JSON.stringify(stars3));
// fs.writeFileSync(`stars-4.json`, JSON.stringify(stars4));
// fs.writeFileSync(`stars-5.json`, JSON.stringify(stars5));

// // const organizeCSVByMagnitude = (fileCount) => {
// //   let count = 1;
// //   fs.createReadStream(`stars-sector${fileCount}.csv`)
// //     .pipe(csv())
// //     .on('data', (row) => {
// //       if (row.phot_g_mean_mag <= 15) {
// //         const starInfo = 
// //           [
// //             parseFloat(row.b)+90.0,
// //             parseFloat(row.l),
// //             parseFloat(row.lum_val),
// //             parseFloat(row.radius_val),
// //             parseFloat(row.teff_val),
// //             parseFloat(row.phot_g_mean_mag)
// //           ];
// //         if (count === 2) {
// //           stars2.push(starInfo);
// //           count += 1;
// //         } else if (count === 3) {
// //           stars3.push(starInfo);
// //           count += 1;
// //         } else if (count === 4) {
// //           stars4.push(starInfo);
// //           count += 1;
// //         } else if (count === 5) {
// //           stars5.push(starInfo);
// //           count = 1;
// //         } else {
// //           stars1.push(starInfo);
// //           count += 1;
// //         }
// //       }
// //     })
// //     .on('end', () => {
// //       console.log(stars1.length,stars2.length,stars3.length,stars4.length,stars5.length)
// //       fs.writeFileSync(`stars-${fileCount}-1.json`, JSON.stringify(stars1));
// //       fs.writeFileSync(`stars-${fileCount}-2.json`, JSON.stringify(stars2));
// //       fs.writeFileSync(`stars-${fileCount}-3.json`, JSON.stringify(stars3));
// //       fs.writeFileSync(`stars-${fileCount}-4.json`, JSON.stringify(stars4));
// //       fs.writeFileSync(`stars-${fileCount}-5.json`, JSON.stringify(stars5));
// //     })
// // }