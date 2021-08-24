# For the Record Code Test Implementation

Hi. This is my (Justin Marrington's) implementation of the For the Record code
test.

## Getting around

I've implemented both a simple React web application and a basic interactive 
CLI to the  specified functionality. This repository uses a few NPM workspaces
to manage the separate implementations and shared data layer.

The workspaces that contain my implementation code are under the `packages` directory:

```
ftr_code_test
  - packages
    - frequency-generator # Shared data layer - both UIs use this package
    - ui                  # React Web UI implementation
    - cli                 # Simple interactive TTY build on inquirer.js  
```

## Getting set up

Since I'm using npm workspaces, you'll need npm >= 7 - the easiest way is to
make sure  you're running Node 16 or above. Yarn workspaces will also work
with older Node versions  but you'll have no lockfile so I can't guarantee 
the dependencies will match perfectly.

Given the correct prerequisites, install all dependencies via npm:

```shell
npm install
```

## Accessing the UIs

The web UI is implemented over React Scripts for simplicity, so it's
straightforward to bring up a development webpack-dev-server:

```shell
npm start -w ui
```

The CLI is a naive interactive TTY, which must be transpiled one from
Typescript before running directly.

```shell
npm run build -w cli
npm start -w cli
```

## Running tests

I have suites of Jest tests for the web UI and shared layer, runnable via the
top package:

```shell
npm test # runs "npm test -w ui && npm test -w frequency-generator" 
```

## Part 2 Answers

### Implement a second UI

I've answered this question via an implementation. The nice thing about the
reducer function pattern as a data layer is that it's a pure function, so
by nature has no side effects and is very portable and reusable. While React
provides the `useReducer` hook for hooking a reducer up to UI components,
it was also trivial to wrap that same state tree and reducer into the plain
class-based CLI. My own `FrequencyReportingCLI.dispatch` method simply
executes the reducer with an action and holds onto the latest state object.

The first implementation of the test (just the Web UI) used simple `useState`
data layers within the application components, restructuring even this simple
state tree into a reducer pattern allowed me to share it with the secondary
UI.

Even in a non-trivial application, data layers that maintain functional purity
are a *good idea®*, since it separates the source of truth from the
asynchronous and environment-specific nature of e.g. API networking code.

### Making the application production ready

Even with a trivial web application with no persistent database has a long
list of requirements before I'd consider it 'safe to stick onto the public web'.

- Containerisation of the app with dependency and application layers
- Static build and deployment automation
- A CDN for static assets
- Health and load monitoring, with automated alerting
- Network load management

If I planned on the application having a diverse user base (as we all should),
I'd also want to test and extend the application as a minumum with:

- Reasonable accessibility, at least intelligible to screen readers and
  interactive via keyboard and keyboard-adjacent assistive technlogy
- Internationalisation for the regions I'd expect it to see use
