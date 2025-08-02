// Bubble Sort Algorithm
export const bubbleSort = async (array, setArray, setComparing, setSorted, isRunningRef, speedRef, sleep) => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1 && isRunningRef.current; i++) {
        for (let j = 0; j < n - i - 1 && isRunningRef.current; j++) {
            setComparing([j, j + 1]);
            await sleep();

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                setArray([...arr]);
                await sleep();
            }
        }
        setSorted(prev => [...prev, n - 1 - i]);
    }
    if (isRunningRef.current) {
        setSorted(prev => [...prev, 0]);
    }
    setComparing([]);
};

// Quick Sort Algorithm
export const quickSort = async (array, setArray, setComparing, setSorted, isRunningRef, speedRef, sleep) => {
    const arr = [...array];

    const partition = async (arr, low, high) => {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high && isRunningRef.current; j++) {
            setComparing([j, high]);
            await sleep();

            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setArray([...arr]);
                await sleep();
            }
        }

        if (isRunningRef.current) {
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            setArray([...arr]);
            setSorted(prev => [...prev, i + 1]);
            await sleep();
        }

        return i + 1;
    };

    const quickSortHelper = async (arr, low = 0, high = array.length - 1) => {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSortHelper(arr, low, pi - 1);
            await quickSortHelper(arr, pi + 1, high);
        }
        return arr;
    };

    await quickSortHelper(arr);
    setComparing([]);
};

// Selection Sort Algorithm
export const selectionSort = async (array, setArray, setComparing, setSorted, setCurrentIndex, isRunningRef, speedRef, sleep) => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1 && isRunningRef.current; i++) {
        let minIdx = i;
        setCurrentIndex(i);

        for (let j = i + 1; j < n && isRunningRef.current; j++) {
            setComparing([minIdx, j]);
            await sleep();

            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i && isRunningRef.current) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            setArray([...arr]);
            await sleep();
        }

        setSorted(prev => [...prev, i]);
    }
    if (isRunningRef.current) {
        setSorted(prev => [...prev, n - 1]);
    }
    setComparing([]);
    setCurrentIndex(-1);
};

// Insertion Sort Algorithm
export const insertionSort = async (array, setArray, setComparing, setSorted, setCurrentIndex, isRunningRef, speedRef, sleep) => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n && isRunningRef.current; i++) {
        const key = arr[i];
        let j = i - 1;

        setCurrentIndex(i);

        while (j >= 0 && arr[j] > key && isRunningRef.current) {
            setComparing([j, j + 1]);
            await sleep();

            arr[j + 1] = arr[j];
            setArray([...arr]);
            j--;
            await sleep();
        }

        if (isRunningRef.current) {
            arr[j + 1] = key;
            setArray([...arr]);
            setSorted(prev => [...prev, i]);
            await sleep();
        }
    }
    if (isRunningRef.current) {
        setSorted(prev => [...prev, 0]);
    }
    setComparing([]);
    setCurrentIndex(-1);
};