```js
contract Numbers{
    int[] public numbers;

    function Number() public {
        numbers.push(20);
        numbers.push(32);
        int[] storage myArray=numbers
    }
}
```

- numbers refers to array of integers that stored inside of the contract. When we use the "Storage", it changes the way in which "myArray" works. "storage" makes "myArray" points directly at the exact same location that the "numbers" variable is pointing at.
- if we use "memory" instead of "storage", we will take the "numbers" array, we would make a copy of it and place it into memory. "myArray" will no longer points to "number" inside storage. Instead "myArray" will point to new copy sitting inside memory.

```js
contract Numbers{
    int[] public numbers;

    function Number() public {
        numbers.push(20);
        numbers.push(32);
        // we are passing the copy of the numbers
        // function arguments automatically assumed to be memory type variables.
        changeArray(numbers)
    }
    function changeArray(int[] myArray) private {
        myArray[0]=1
    }
}
```

- by defauld changeArray args are memory. we can cahnge it

  ```js
  function changeArray(int[] storage myArray) private {
        myArray[0]=1
    }
  ```
