function add(numbers) {
    if (!numbers) return 0;

    const numberList = numbers.split(/,|\n/).map(n => parseInt(n, 10));

    const sum = numberList.reduce((total, num) => total + num, 0);

    return sum;
}

// Cases
console.log(add(""));      // Output: 0
console.log(add("1"));     // Output: 1
console.log(add("1,5"));  // Output: 6
console.log(add("1\n2,3"));  // Output: 6
console.log(add("4\n5\n6")); // Output: 15