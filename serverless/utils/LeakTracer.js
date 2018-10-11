"use strict"
require("leaked-handles").set({
    // Use full stack traces
    fullStack: true,
    // Run every 30 seconds instead of 5.
    timeout: 10000,
    // Pretty print tcp thrown exceptions.
    debugSockets: true
});
