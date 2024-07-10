export function removeDuplicates(array, key) {
    // Set to keep track of unique keys
    let seen = new Set();

    // Filter out duplicate objects
    return array.filter((obj) => {
      // If the key value is already in the set, return false to filter it out
      if (seen.has(obj[key])) {
        return false;
      } else {
        // Add the key value to the set and return true to keep this object
        seen.add(obj[key]);
        return true;
      }
    });
}