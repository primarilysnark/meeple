# Meeple

Meeple is a JavaScript library for interacting with the [Roll20](https://roll20.net/) Scripting API, focused on token behavior. Using Meeple, you can create a scene and then script tokens to interact with the scene as meeples.

## Example Usage
Meeple is designed to help reduce the overhead for scripting behavior. As an example, let's look at the "Patrolling Token" example given in the [Advanced Examples](https://wiki.roll20.net/API:Advanced_Examples) documentation for the Roll20 Scripting API. In the example, you're writing a script to simulate a guard patrolling back and forth in a hallway. Here's how you could do it with Meeple.

```JavaScript
// Grab Meeple and Scene from the library
import { Meeple, Scene } from 'meeple';

// Define our guard meeple we want to use
const guard = new Meeple('Guard A', function behavior() {

  // This function defines the guard's behavior. In this case
  // we want him to walk right for three steps and then walk
  // left for three steps.

  if (this.stepsTaken > 3) {
    this.walkingRight = !this.walkingRight;
    this.stepsTaken = 0;
  }
  
  if (this.walkingRight) {
    this.move(0, 1);
  } else {
    this.move(0, -1);
  }
  
  this.stepsTaken++;
});

// Make sure we start our step counter at 0
// and set our guard to walking right
guard.stepsTaken = 0;
guard.walkingRight = true;

// Now that we have our guard, we need a scene
const scene = new Scene([guard], {
  // We need to set how fast we want the scene to move
  clockSpeed: 5000,
});

// Finally, we start our scene
scene.start();
```
