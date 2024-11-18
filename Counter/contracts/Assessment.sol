// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CounterContract {
    int256 public counter; // Counter value

    /// Increment the counter
    function increment() public {
        require(counter < type(int256).max, "Counter overflow");
        counter++;
    }

    /// Decrement the counter
    function decrement() public {
        require(counter > type(int256).min, "Counter underflow");
        counter--;
    }

    /// Get the current counter value
    function getCounter() public view returns (int256) {
        return counter;
    }
}

