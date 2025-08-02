export const sortingAlgorithms = [
  { value: 'bubble', label: 'Bubble Sort' },
  { value: 'quick', label: 'Quick Sort' },
  { value: 'selection', label: 'Selection Sort' },
  { value: 'insertion', label: 'Insertion Sort' }
];

export const searchingAlgorithms = [
  { value: 'linear', label: 'Linear Search' },
  { value: 'binary', label: 'Binary Search' }
];

export const getComplexityInfo = (algorithmType, currentAlgorithm) => {
  if (algorithmType === 'sorting') {
    switch (currentAlgorithm) {
      case 'bubble':
        return {
          time: 'O(n²) average and worst case, O(n) best case',
          space: 'O(1)'
        };
      case 'quick':
        return {
          time: 'O(n log n) average, O(n²) worst case',
          space: 'O(log n) average case'
        };
      case 'selection':
        return {
          time: 'O(n²) all cases',
          space: 'O(1)'
        };
      case 'insertion':
        return {
          time: 'O(n²) worst case, O(n) best case',
          space: 'O(1)'
        };
      default:
        return { time: '', space: '' };
    }
  } else {
    switch (currentAlgorithm) {
      case 'linear':
        return {
          time: 'O(n) all cases',
          space: 'O(1)'
        };
      case 'binary':
        return {
          time: 'O(log n) average case',
          space: 'O(1)'
        };
      default:
        return { time: '', space: '' };
    }
  }
};

export const getCodeImplementation = (algorithmType, currentAlgorithm) => {
  if (algorithmType === 'sorting') {
    switch (currentAlgorithm) {
      case 'bubble':
        return `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr[j], arr[j+1]);
            }
        }
    }
}`;
      case 'quick':
        return `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`;
      case 'selection':
        return `void selectionSort(int arr[], int n) {
    int i, j, min_idx;
    for (i = 0; i < n-1; i++) {
        min_idx = i;
        for (j = i+1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;
        swap(arr[min_idx], arr[i]);
    }
}`;
      case 'insertion':
        return `void insertionSort(int arr[], int n) {
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`;
      default:
        return '';
    }
  } else {
    switch (currentAlgorithm) {
      case 'linear':
        return `int linearSearch(int arr[], int n, int x) {
    for (int i = 0; i < n; i++)
        if (arr[i] == x)
            return i;
    return -1;
}`;
      case 'binary':
        return `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x)
            return m;
        if (arr[m] < x)
            l = m + 1;
        else
            r = m - 1;
    }
    return -1;
}`;
      default:
        return '';
    }
  }
};