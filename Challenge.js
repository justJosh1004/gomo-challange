const times = [
  {
    start: 19,
    end: 30
  },
  {
    start: 2,
    end: 7
  },
  {
    start: 17,
    end: 25
  },
  {
    start: 6,
    end: 20
  },
  {
    start: 8,
    end: 14
  },
  {
    start: 40,
    end: 45
  },
  {
    start: 24,
    end: 28
  }
];

const state = {
  currentMax: 0
};

let sorted;
let UVTChunks = [];
let fixedUVT = [];
let UVT = 0;

// Take the time inputs and sort them in ascending order based on the start times
const sortTimes = times => {
  return times.sort((a, b) => {
    return a.start - b.start;
  });
};

// Once sorted, check to see if there are any gaps
const checkGaps = sorted => {
  let tempUVT = [];
  sorted.map((time, i, sorted) => {
    if (sorted[i + 1]) {
      // Add times to temp array if there are no gaps
      if (time.end > sorted[i + 1].start) {
        tempUVT.push(time);
      } else {
        // If there is a gap, add the last time and add the temp array to UVTChunk
        tempUVT.push(time);
        UVTChunks.push(tempUVT);
        tempUVT = []; // Clear temp array
      }
    }
    // Add the final time
    if (i === sorted.length - 1) {
      tempUVT.push(time);
      UVTChunks.push(tempUVT);
    }
  });
};

// Combine chunks that overlap
const overlapFix = UVTChunks => {
  UVTChunks.map((chunk, i, UVTChunks) => {
    let currentMax = 0;
    let nextMin;
    currentMax = Math.max(...chunk.map(o => o.end), 0);
    nextMin = UVTChunks[i + 1]
      ? Math.min(...UVTChunks[i + 1].map(o => o.start))
      : null;

    // Check if the current chuck max is greater than the next chunk's min
    if (currentMax > nextMin && nextMin) {
      // Combine chunks if they overlap
      fixedUVT.push(chunk.concat(UVTChunks[i + 1]));
      // Take out combined chunks from original
      UVTChunks.splice(i, 2);
    }
  });
  // Combine fixed chunks with updated array
  return fixedUVT.concat(UVTChunks);
};

// Add the total number to get the UVT
const getUVT = UVTChunks => {
  let UVT = 0;
  UVTChunks.map(chunk => {
    let max = 0;
    let min = 0;
    max = Math.max(...chunk.map(o => o.end), 0); // Get the latest ending time in the array
    min = Math.min(...chunk.map(o => o.start)); // Get the earliest start time in the array
    console.log(`Min: ${min}. Max: ${max}`);
    UVT = UVT + (max - min);
  });
  return UVT;
};

sorted = sortTimes(times);

// calculateUVT(sorted);
checkGaps(sorted);
console.log('UVT Array');
console.log(UVTChunks);
updatedUVT = overlapFix(UVTChunks);
console.log('Updated UVT Array');
console.log(updatedUVT);
// console.log(UVTChunks);
UVT = getUVT(updatedUVT);
console.log(UVT);
