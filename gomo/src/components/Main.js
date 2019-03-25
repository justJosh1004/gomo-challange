import React, { Component } from 'react';
import {
  Container,
  Input,
  Button,
  Form,
  Grid,
  Divider,
  List,
  Header
} from 'semantic-ui-react';

class Main extends Component {
  state = {
    UVT: 0,
    times: [],
    start: 0,
    end: 1,
    count: 0
  };

  onChange = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let id = this.state.count;

    let times = this.state.times;
    times.push({
      start: Number(this.state.start),
      end: Number(this.state.end),
      id: id
    });

    this.setState({ ...this.state, count: id + 1 });

    console.log(this.state);
  };

  renderTimeInput = () => {
    return (
      <Grid centered style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field style={{ minWidth: '300px' }}>
            <Input
              name="start"
              value={this.state.start}
              onChange={this.onChange}
              type="number"
              min="0"
              label={{ basic: true, content: 'Start Time in milliseconds' }}
              labelPosition="left"
              placeholder="Start time in milliseconds"
            />
          </Form.Field>
          <Form.Field style={{ minWidth: '300px' }}>
            <Input
              name="end"
              value={this.state.end}
              onChange={this.onChange}
              type="number"
              min={this.state.start}
              label={{ basic: true, content: 'End Time in milliseconds' }}
              labelPosition="left"
              placeholder="End time in milliseconds"
            />
          </Form.Field>
          <Button
            type="Submit"
            // onClick={() => this.addTime()}
            inverted
            color="green"
            style={{ minWidth: '200px' }}>
            Add Time
          </Button>
        </Form>
      </Grid>
    );
  };

  deleteTime = id => {
    let times = this.state.times;

    times.splice(
      times.findIndex(i => {
        return i.id === id;
      }),
      1
    );

    this.setState({ ...this.state, times: times });
  };

  renderTimesList = () => {
    return (
      <List animated>
        {this.state.times.map(time => (
          <List.Item key={time.id}>
            <List.Content>
              Start Time: {time.start}. End Time: {time.end}
              <Button
                onClick={() => this.deleteTime(time.id)}
                inverted
                color="red"
                style={{ marginLeft: '20px' }}>
                Remove
              </Button>
            </List.Content>
          </List.Item>
        ))}
      </List>
    );
  };

  // Calculations
  calculateUVT = () => {
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

    sorted = sortTimes(this.state.times);

    // calculateUVT(sorted);
    checkGaps(sorted);
    // console.log('UVT Array');
    // console.log(UVTChunks);
    let updatedUVT = overlapFix(UVTChunks);
    // console.log('Updated UVT Array');
    // console.log(updatedUVT);
    // console.log(UVTChunks);
    UVT = getUVT(updatedUVT);
    console.log(UVT);

    this.setState({ ...this.state, UVT: UVT });
  };

  render() {
    return (
      <Container>
        <h2>The UVT: {this.state.UVT}</h2>
        <Button
          onClick={() => this.calculateUVT()}
          inverted
          color="orange"
          style={{ marginTop: '20px' }}>
          Calculate UVT
        </Button>
        <Divider />
        <Header size="medium">
          Enter in the start and end time in milliseconds
        </Header>
        {this.renderTimeInput()}
        <Divider />
        {this.renderTimesList()}
      </Container>
    );
  }
}

export default Main;
