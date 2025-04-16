function add(numbers) {
    if (!numbers) return 0;

    let delimiterPattern = /,|\n/;
    let numberString = numbers;
    
    if (numbers.startsWith("//")) {
        const delimiterEndIndex = numbers.indexOf("\n");
        const customDelimiter = numbers.slice(2, delimiterEndIndex);

        delimiterPattern = new RegExp(customDelimiter.replace(/[[\]{}()*+?.,\\^$|#\s]/g, '\\$&'));
        numberString = numbers.slice(delimiterEndIndex + 1);  // Get the numbers part
    }

    const numberList = numberString.split(delimiterPattern).map(num => {
        const parsed = parseInt(num, 10);
        if (isNaN(parsed)) {
            throw new Error(`Invalid number: ${num}`);
        }
        return parsed;
    });


    const negativeNum = numberList.filter(num => num < 0);

    if (negativeNum.length > 0) {
        throw new Error(`negative numbers not allowed: ${negativeNum.join(",")}`);
    }

    const sum = numberList.reduce((total, num) => total + num, 0);

    return sum;
}

// Cases
console.log(add(""));      // Output: 0
console.log(add("1"));     // Output: 1
console.log(add("1,5"));  // Output: 6
console.log(add("1\n2,3"));  // Output: 6
console.log(add("4\n5\n6")); // Output: 15
console.log(add("//;\n1;2"));   // Output: 3
console.log(add("//|\n4|5|6")); // Output: 15
console.log(add("//;\n1;2,a"));   // Output: 3
console.log(add("//;\n1;b,2,a"));   // Throws: Invalid number: {num}
// console.log(add("1,-2,3"));       // Throws: "negative numbers not allowed: -2"
// console.log(add("1,-2,-3,4"));    // Throws : "negative numbers not allowed: -2,-3"