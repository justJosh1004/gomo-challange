# gomo-challenge

## Description
gomo video tracks the users experience of a particular video to a very granular level of detail. The result is a record for each “fragment” of video watched, detailing at which point in the video the viewed fragment began and at which point it ended.

One way we try to make sense of this data is the concept of “unique view time”, or UVT: that is, a metric that can answer the question, “How much of a given video has this user watched at least once?”. For example, if I watch the first two minutes of the video and then go back and rewatch seconds 30 through 45, the UVT is still two minutes. Conversely, if I watch the first minute and the last minute of a two-hour video, my UVT is also two minutes.

Your objective is to write a program that accepts a collection of viewed fragments as input and outputs the UVT. Viewed Fragments will consist of the start and ending time in ms of a given watched fragment of video. (It is up to you how to represent viewed fragments in your code.)

You may choose to write a command-line program accepting the fragments as input, though if you prefer to write a browser-driven interface, or something else we haven’t thought of, that is also acceptable. You should not assume that the input is sorted in any particular way. This code may be written in a language of your choice, with the development environment of your choice.

### How to run the the projects
Two main things in the repo: a JavaScript file called Challange.js and a gomo folder containing a Reactjs project

#### The JavaScript File
The Challenge.js is a direct response to the challenge and prints out the UVT in the console. Viewing times can be change in the times array at the beginning of the file

#### The React Project
To run the React project, navigate to the gomo folder through the command line. Once in the folder, run `npm install` to install all the the neccessary module. Once this is done run `npm start` to start a local server to view the project. Here, you can add and delete viewing times then caluclate the UVT

##### The Deployed project
This may be the easiest way to view the project.
The React project is also deployed to GitHub Pages and can be accessed through this link: [Gomo Coding Challenge](https://justjosh1004.github.io/gomo-challenge/)
