times = [
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

const sortTimes = times => {
  return times.sort((a, b) => {
    return a.start - b.start;
  });
};

let sorted = sortTimes(times);

console.log(sorted);
