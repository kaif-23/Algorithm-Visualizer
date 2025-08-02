// Linear Search Algorithm
export const linearSearch = async (array, searchTarget, setCurrentIndex, setSearchResult, isRunningRef, speedRef, sleep) => {
    const arr = [...array];

    for (let i = 0; i < arr.length && isRunningRef.current; i++) {
        setCurrentIndex(i);
        await sleep();

        if (arr[i] === searchTarget) {
            setSearchResult(i);
            return;
        }
    }

    setSearchResult(-1);
    setCurrentIndex(-1);
};

// Binary Search Algorithm (requires sorted array)
export const binarySearch = async (array, searchTarget, setArray, setCurrentIndex, setSearchResult, setComparing, isRunningRef, speedRef, sleep) => {
    // First sort the array for binary search
    const sortedArray = [...array].sort((a, b) => a - b);
    setArray(sortedArray);
    await sleep(500);

    let left = 0;
    let right = sortedArray.length - 1;

    while (left <= right && isRunningRef.current) {
        const mid = Math.floor((left + right) / 2);
        setCurrentIndex(mid);
        setComparing([left, right]);
        await sleep();

        if (sortedArray[mid] === searchTarget) {
            setSearchResult(mid);
            setComparing([]);
            return;
        } else if (sortedArray[mid] < searchTarget) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    setSearchResult(-1);
    setCurrentIndex(-1);
    setComparing([]);
};