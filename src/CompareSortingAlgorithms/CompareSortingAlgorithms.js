// Export the function to make it available for import in other files
//This function is responsible for setting up and 
//initiating the sorting process by calling 
//mergeSortHelper with the correct initial parameters.
export function mergeSort(array){
    /*
                    [1, 5, 2, 3, 8, 4, 6, 7]
                    /                       \
              [1, 5, 2, 3]                 [8, 4, 6, 7]
            /             \                 /        \
         [1, 5]           [2, 3],        [8, 4]       [6, 7]
        /      \          /    \          /   \       /     \
        [1]    [5]       [2]    [3]     [8]    [4]   [6]     [7]
    */
    // Initialize an empty array to store the animations
    const animations = [];
    // If the input array has 1 or fewer elements, 
    //   it's already sorted, so return the array as is, which is 1
    if (array.length <= 1) return array;
    // Create a copy of the input array 
    //  to be used as an auxiliary array
    const auxiliaryArray = array.slice();
    // Call the helper function to perform 
    //  the merge sort and fill the animations array
    //mergeSortHelper is a helper function that performs 
    //the recursive merge sort algorithm. 
    //It's called with several arguments to initiate the sorting process.
    mergeSortHelper(
        //array: This is the main array that needs to be sorted. Initially, 
        //it's the entire array passed to the getMergeSortAnimations function.
        array, 
        //0: This is the starting index of the portion of 
        //the array that needs to be sorted. Initially, 
        //it's the first element of the array.
        0, 
        //array.length - 1: This is the ending index of the portion of 
        //the array that needs to be sorted. 
        //Initially, it's the last element of the array.
        array.length - 1, 
        //auxiliaryArray: This is the copy of 
        //the original array created using 
        auxiliaryArray, 
        //animations: This is the array that will store the sequence 
        //of animations or steps needed to visualize the merge sort. 
        //It starts as an empty array and gets populated during the 
        //sorting process.
        animations
    );
    // Return the array of
    //   animations generated during the merge sort
    return animations;
}
function mergeSortHelper(
    //Declaring what function that expects to recieve when called
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    // Base case: if the subarray has one or 
    //    zero elements, it's already sorted
    if(startIdx === endIdx) return;
    // Calculate the middle index to 
    //     split the array into two halves
    const middleIndx = Math.floor((startIdx+endIdx)/2);
    // Recursively sort the left half of the subarray
    mergeSortHelper(
                    auxiliaryArray, 
                    startIdx, //where it's start
                    middleIndx, //where it's end
                    mainArray, //from where
                    animations);
    // Recursively sort the right half of the subarray
    mergeSortHelper(
                    auxiliaryArray, 
                    middleIndx +1, //where it's start
                    endIdx, //where it's end
                    mainArray, //from where
                    animations);
    // Merge the two sorted halves back into the main array
    doMerge(        
                    mainArray, //from where
                    startIdx, //merge here
                    middleIndx, //merge from here
                    endIdx, // merege here too
                    auxiliaryArray, 
                    animations);
}
function doMerge(   mainArray, 
                    startIdx, 
                    middleIndx, 
                    endIdx, 
                    auxiliaryArray, 
                    animations)
    {
        let i = startIdx;
        let k = startIdx;
        let j = middleIndx + 1;

        while(i <= middleIndx && j <= endIdx){
            //Create an empty object to store animation data.
            const animation = {};
            //Record the indices being compared for visualization.
            // These are the values that we're comparing; we push them once
            // to change their color.
            animation.comparison = [i, j];
            if (auxiliaryArray[i] <= auxiliaryArray[j]){
                //is smaller or equal, store the swap operation 
                // (index k and value auxiliaryArray[i]) 
                //   in animation.
                animation.swap = [k, auxiliaryArray[i]];
                mainArray[k++] = auxiliaryArray[i++];
            } else{
                animation.swap = [k, auxiliaryArray[j]];
                mainArray[k++] = auxiliaryArray[j++];
            }
            //Add the animation object to the animations array.
            animations.push(animation)
        }
        // If there are remaining elements in the left subarray
        while(i <= middleIndx){
            animations.push({
                comparison: [i,i],
                swap: [k,auxiliaryArray[i]],
            });
            mainArray[k++] = auxiliaryArray[i++];
        }
        while (j <= endIdx){
            animations.push({
                comparison:[j,j],
                swap: [k,auxiliaryArray[j]],
            });
            mainArray[k++]= auxiliaryArray[j++]
        }
}

//______________________________________________________________________________________________________________________________________________________________________________

//______________________________________________________________________________________________________________________________________________________________________________

export function quickSort(array) {
    const animations = [];
    if (array.length <= 1) return array;

    quickSortHelper(array, 0, array.length - 1, animations);
    return animations; // Return animations array for visualization
}
function quickSortHelper(mainArray, startIdx, endIdx, animations) {
    if (startIdx <= endIdx) {
        let pivotIndex = partition(mainArray, startIdx, endIdx, animations);
        quickSortHelper(mainArray, startIdx, pivotIndex - 1, animations);
        quickSortHelper(mainArray, pivotIndex + 1, endIdx, animations);
    }
}
function partition(mainArray, startIdx, endIdx, animations) {
    const pivot = mainArray[endIdx];
    let i = startIdx - 1;


    for (let j = startIdx; j < endIdx; j++) {
        animations.push(['comparison', j, endIdx]); // Mark comparison for visualization
        // animations.push(['comparison', endIdx, endIdx]);
        if (mainArray[j] < pivot) {
            i++;
            animations.push(['comparison', i, j]); // Mark i and j comparison
            animations.push(['swap', i, j, mainArray[i], mainArray[j]]); // Mark swap for visualization
            // Swap elements in mainArray
            [mainArray[i], mainArray[j]] = [mainArray[j], mainArray[i]];
        } 
    }

    animations.push(['swap', i + 1, endIdx, mainArray[i + 1], mainArray[endIdx]]); // Mark final swap for visualization
    // Swap pivot element with element at i + 1
    [mainArray[i + 1], mainArray[endIdx]] = [mainArray[endIdx], mainArray[i + 1]];

    return i + 1; // Return the pivot index
}

//______________________________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________________________


export function heapSort(array) {
    const mainArray = array;
    const animations = [];
    const length = mainArray.length;


    // Build max heap
    let lastParentIndex = Math.floor(length / 2 - 1);
    for (let i = lastParentIndex; i >= 0; i--) {
        heapify(mainArray, length, i, animations);
    }

    // Extract elements from heap one by one
    for (let i = length - 1; i >= 0; i--) {
        animations.push(['swap', 0, i]);
        [mainArray[0], mainArray[i]] = [mainArray[i], mainArray[0]];
        
        //heapify the reduced heap
        heapify(mainArray, i, 0, animations); 
    }
    return animations;
}
function heapify(mainArray, length, parentIndex, animations) {
    let largest = parentIndex;
    const left = parentIndex * 2 + 1;
    const right = left + 1;

    if (left < length) {
        animations.push(['comparison', parentIndex, left]);
        if (mainArray[left] > mainArray[largest]) {
            largest = left;
        }
    }

    if (right < length) {
        animations.push(['comparison', largest, right]);
        if (mainArray[right] > mainArray[largest]) {
            largest = right;
        }
    }

    if (largest !== parentIndex) {
        animations.push(['swap', parentIndex, largest]);
        [mainArray[parentIndex], mainArray[largest]] = [mainArray[largest], mainArray[parentIndex]];
        heapify(mainArray, length, largest, animations);
    }
}

//______________________________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________________________


export function bubbleSort(array){
    const mainArray = array;
    const animations = [];
    for (let i = mainArray.length - 1; i >= 0; i--){
        for(let j = 0; j<i; j++){
            if(mainArray[j] > mainArray[j+1]){
                animations.push(['comparison', j, j+1]);
                animations.push(['swap', j, j+1, mainArray[j], mainArray[j+1]]);
                [mainArray[j], mainArray[j + 1]] = [mainArray[j +1], mainArray[j]];
            }
        }
    }
    return animations;
}

//______________________________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________________________


export function selectionSort(array){
    const mainArray = array;
    const animations = [];

    for(let i = 0; i<mainArray.length - 1; i++){
        let min = i
        for(let j = i+1; j<mainArray.length; j++){
            animations.push(['comparison', j, min]);
            if(mainArray[min] > mainArray[j]){
                min = j
            }
        }
        animations.push(['swap', i, min, mainArray[i], mainArray[min]]);
        [mainArray[i], mainArray[min]] = [mainArray[min], mainArray[i]];
    }
    return animations;
}

//______________________________________________________________________________________________________________________________________________________________________________
//______________________________________________________________________________________________________________________________________________________________________________


export function insertionSort(array){
    const mainArray = array;
    const animations = [];

    for(let i = 1; i<mainArray.length; i++){
        let temp = mainArray[i];
        let j = i -1
        animations.push(['comparison', i, j]);
        while(j >= 0 && mainArray[j] > temp){
            animations.push(['swap',j+1, j, mainArray[j], mainArray[j + 1]]);
            mainArray[j + 1] = mainArray[j];
            j--
        }
        animations.push(['insert', j + 1, temp]);
        mainArray[j+ 1] = temp;
        }
        return animations;
}


