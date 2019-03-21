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
    end: 10
  },
  {
    start: 8,
    end: 15
  }
];

let sorted;
let UVTChunks;

// Take the time inputs and sort them in ascending order based on the start times
const sortTimes = times => {
  return times.sort((a, b) => {
    return a.start - b.start;
  });
};

// Once sorted, check to see if there are any gaps
const checkGaps = sorted => {
  // If there is a gap, splice out the ranges
  sorted.map((time, i, sorted) => {
    // console.log(sorted.length);
    console.log(
      `The time range is ${time.start}-${time.end}. this is number ${i +
        1} on the list.`
    );
    // console.log(sorted[i + 1].end);
    if (sorted[i + 1]) {
      if (time.end > sorted[i + 1].start) {
        console.log('There is no gap');
      } else {
        console.log('There is a gap');
      }
    }
    console.log('');
  });
};

sorted = sortTimes(times);

checkGaps(sorted);
