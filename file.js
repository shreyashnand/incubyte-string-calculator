function add(numbers) {
    if (!numbers) return 0;

    let delimiterPattern = /,|\n/;
    let numberString = numbers;
    
    if (numbers.startsWith("//")) {
        const delimiterEndIndex = numbers.indexOf("\n");
        const customDelimiter = numbers.slice(2, delimiterEndIndex);

        // Escape special regex characters in delimiter
        const escapedDelimiter = customDelimiter.replace(/[[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        delimiterPattern = new RegExp(escapedDelimiter);

        // Get the actual numbers part of the string
        numberString = numbers.slice(delimiterEndIndex + 1);
    }

    const numberList = numberString.split(delimiterPattern).map(n => parseInt(n, 10));

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
console.log(add("1,-2,3"));       // Should throw: "negative numbers not allowed: -2"
console.log(add("1,-2,-3,4"));    // Should throw: "negative numbers not allowed: -2,-3"