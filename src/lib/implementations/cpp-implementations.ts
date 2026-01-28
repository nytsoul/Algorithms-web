/**
 * C++ Algorithm Implementations
 * Comprehensive collection of all algorithm implementations in C++
 */

export interface CppImplementation {
  algorithm: string;
  code: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export const CPP_IMPLEMENTATIONS: Record<string, CppImplementation> = {
  "linear-search": {
    algorithm: "Linear Search",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <iterator>

/**
 * Perform linear search to find target in array.
 * 
 * @param arr Vector to search in
 * @param target Element to find
 * @return Iterator to target if found, end() otherwise
 */
template<typename T>
typename std::vector<T>::const_iterator linear_search(
    const std::vector<T>& arr, const T& target) {
    
    return std::find(arr.begin(), arr.end(), target);
}

/**
 * Linear search returning index instead of iterator.
 */
template<typename T>
int linear_search_index(const std::vector<T>& arr, const T& target) {
    auto it = std::find(arr.begin(), arr.end(), target);
    
    if (it != arr.end()) {
        return std::distance(arr.begin(), it);
    }
    
    return -1; // Not found
}

/**
 * Linear search with custom predicate function.
 */
template<typename T, typename Predicate>
typename std::vector<T>::const_iterator linear_search_if(
    const std::vector<T>& arr, Predicate pred) {
    
    return std::find_if(arr.begin(), arr.end(), pred);
}

/**
 * Manual implementation without STL algorithms.
 */
template<typename T>
int linear_search_manual(const std::vector<T>& arr, const T& target) {
    for (size_t i = 0; i < arr.size(); ++i) {
        if (arr[i] == target) {
            return static_cast<int>(i);
        }
    }
    return -1;
}

/**
 * Print vector utility function.
 */
template<typename T>
void print_vector(const std::vector<T>& vec) {
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) std::cout << ", ";
    }
    std::cout << "]" << std::endl;
}

int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    int target = 22;
    
    std::cout << "Array: ";
    print_vector(numbers);
    
    // Using STL find
    auto it = linear_search(numbers, target);
    if (it != numbers.end()) {
        int index = std::distance(numbers.begin(), it);
        std::cout << "STL find: Element " << target << " found at index " << index << std::endl;
    } else {
        std::cout << "STL find: Element " << target << " not found" << std::endl;
    }
    
    // Using index version
    int result = linear_search_index(numbers, target);
    if (result != -1) {
        std::cout << "Index version: Element " << target << " found at index " << result << std::endl;
    }
    
    // Using manual implementation
    int manual_result = linear_search_manual(numbers, target);
    std::cout << "Manual: Element " << target << " found at index " << manual_result << std::endl;
    
    // Using predicate (find even numbers)
    auto even_it = linear_search_if(numbers, [](int x) { return x % 2 == 0; });
    if (even_it != numbers.end()) {
        int index = std::distance(numbers.begin(), even_it);
        std::cout << "First even number: " << *even_it << " at index " << index << std::endl;
    }
    
    // Example with strings
    std::vector<std::string> words = {"apple", "banana", "cherry", "date"};
    std::string target_word = "cherry";
    
    std::cout << "\\nString vector: ";
    print_vector(words);
    
    int word_result = linear_search_index(words, target_word);
    std::cout << "Word '" << target_word << "' found at index: " << word_result << std::endl;
    
    return 0;
}`,
    explanation: "Linear search sequentially checks each element until the target is found or the container ends.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)"
  },

  "binary-search": {
    algorithm: "Binary Search",
    code: `#include <iostream>
#include <vector>
#include <algorithm>

/**
 * Iterative binary search implementation.
 * 
 * @param arr Sorted vector to search in
 * @param target Element to find
 * @return Index of target if found, -1 otherwise
 */
template<typename T>
int binary_search(const std::vector<T>& arr, const T& target) {
    int left = 0;
    int right = static_cast<int>(arr.size()) - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2; // Prevent overflow
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1; // Not found
}

/**
 * Recursive binary search implementation.
 */
template<typename T>
int binary_search_recursive(const std::vector<T>& arr, const T& target, 
                           int left, int right) {
    if (left > right) {
        return -1;
    }
    
    int mid = left + (right - left) / 2;
    
    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] < target) {
        return binary_search_recursive(arr, target, mid + 1, right);
    } else {
        return binary_search_recursive(arr, target, left, mid - 1);
    }
}

/**
 * STL binary search implementations.
 */
template<typename T>
class BinarySearchSTL {
public:
    // Check if element exists
    static bool contains(const std::vector<T>& arr, const T& target) {
        return std::binary_search(arr.begin(), arr.end(), target);
    }
    
    // Find iterator to first occurrence
    static typename std::vector<T>::const_iterator lower_bound(
        const std::vector<T>& arr, const T& target) {
        return std::lower_bound(arr.begin(), arr.end(), target);
    }
    
    // Find iterator to first element greater than target
    static typename std::vector<T>::const_iterator upper_bound(
        const std::vector<T>& arr, const T& target) {
        return std::upper_bound(arr.begin(), arr.end(), target);
    }
    
    // Get range of equal elements
    static std::pair<typename std::vector<T>::const_iterator,
                    typename std::vector<T>::const_iterator>
    equal_range(const std::vector<T>& arr, const T& target) {
        return std::equal_range(arr.begin(), arr.end(), target);
    }
    
    // Find index using STL lower_bound
    static int find_index(const std::vector<T>& arr, const T& target) {
        auto it = std::lower_bound(arr.begin(), arr.end(), target);
        
        if (it != arr.end() && *it == target) {
            return std::distance(arr.begin(), it);
        }
        
        return -1;
    }
};

/**
 * Binary search with custom comparator.
 */
template<typename T, typename Compare>
int binary_search_with_comparator(const std::vector<T>& arr, const T& target, 
                                 Compare comp) {
    int left = 0;
    int right = static_cast<int>(arr.size()) - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (!comp(arr[mid], target) && !comp(target, arr[mid])) {
            return mid; // Elements are equivalent
        } else if (comp(arr[mid], target)) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

/**
 * Print vector utility function.
 */
template<typename T>
void print_vector(const std::vector<T>& vec) {
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) std::cout << ", ";
    }
    std::cout << "]" << std::endl;
}

int main() {
    std::vector<int> numbers = {11, 12, 22, 25, 34, 64, 90}; // Must be sorted
    int target = 25;
    
    std::cout << "Sorted array: ";
    print_vector(numbers);
    
    // Iterative binary search
    int result = binary_search(numbers, target);
    std::cout << "Iterative: Element " << target << " found at index " << result << std::endl;
    
    // Recursive binary search
    int result_rec = binary_search_recursive(numbers, target, 0, 
                                           static_cast<int>(numbers.size()) - 1);
    std::cout << "Recursive: Element " << target << " found at index " << result_rec << std::endl;
    
    // STL binary search
    bool exists = BinarySearchSTL<int>::contains(numbers, target);
    std::cout << "STL contains: " << (exists ? "true" : "false") << std::endl;
    
    int stl_index = BinarySearchSTL<int>::find_index(numbers, target);
    std::cout << "STL index: " << stl_index << std::endl;
    
    // Custom comparator example (case-insensitive string search)
    std::vector<std::string> words = {"Apple", "Banana", "Cherry", "Date"};
    std::sort(words.begin(), words.end(), [](const std::string& a, const std::string& b) {
        std::string a_lower = a, b_lower = b;
        std::transform(a_lower.begin(), a_lower.end(), a_lower.begin(), ::tolower);
        std::transform(b_lower.begin(), b_lower.end(), b_lower.begin(), ::tolower);
        return a_lower < b_lower;
    });
    
    std::cout << "\\nSorted words: ";
    print_vector(words);
    
    auto case_insensitive_comp = [](const std::string& a, const std::string& b) {
        std::string a_lower = a, b_lower = b;
        std::transform(a_lower.begin(), a_lower.end(), a_lower.begin(), ::tolower);
        std::transform(b_lower.begin(), b_lower.end(), b_lower.begin(), ::tolower);
        return a_lower < b_lower;
    };
    
    std::string target_word = "cherry";
    int word_result = binary_search_with_comparator(words, target_word, case_insensitive_comp);
    std::cout << "Case-insensitive search for '" << target_word << "': index " << word_result << std::endl;
    
    return 0;
}`,
    explanation: "Binary search efficiently finds elements in sorted containers by repeatedly dividing the search space.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1) iterative, O(log n) recursive"
  },

  "bubble-sort": {
    algorithm: "Bubble Sort",
    code: `#include <iostream>
#include <vector>
#include <algorithm>

/**
 * Sort vector using bubble sort algorithm.
 * 
 * @param arr Vector to be sorted
 */
template<typename T>
void bubble_sort(std::vector<T>& arr) {
    size_t n = arr.size();
    
    for (size_t i = 0; i < n - 1; ++i) {
        bool swapped = false;
        
        // Last i elements are already sorted
        for (size_t j = 0; j < n - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        // If no swapping occurred, array is sorted
        if (!swapped) {
            break;
        }
    }
}

/**
 * Bubble sort with custom comparator.
 */
template<typename T, typename Compare>
void bubble_sort_with_comparator(std::vector<T>& arr, Compare comp) {
    size_t n = arr.size();
    
    for (size_t i = 0; i < n - 1; ++i) {
        bool swapped = false;
        
        for (size_t j = 0; j < n - i - 1; ++j) {
            if (comp(arr[j + 1], arr[j])) { // If arr[j+1] should come before arr[j]
                std::swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        
        if (!swapped) {
            break;
        }
    }
}

/**
 * Bubble sort that counts comparisons and swaps.
 */
template<typename T>
struct SortStats {
    size_t comparisons = 0;
    size_t swaps = 0;
};

template<typename T>
SortStats<T> bubble_sort_with_stats(std::vector<T>& arr) {
    SortStats<T> stats;
    size_t n = arr.size();
    
    for (size_t i = 0; i < n - 1; ++i) {
        bool swapped = false;
        
        for (size_t j = 0; j < n - i - 1; ++j) {
            stats.comparisons++;
            
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                stats.swaps++;
                swapped = true;
            }
        }
        
        if (!swapped) {
            break;
        }
    }
    
    return stats;
}

/**
 * Bidirectional bubble sort (Cocktail shaker sort).
 */
template<typename T>
void cocktail_shaker_sort(std::vector<T>& arr) {
    bool swapped = true;
    size_t start = 0;
    size_t end = arr.size() - 1;
    
    while (swapped) {
        swapped = false;
        
        // Forward pass
        for (size_t i = start; i < end; ++i) {
            if (arr[i] > arr[i + 1]) {
                std::swap(arr[i], arr[i + 1]);
                swapped = true;
            }
        }
        
        if (!swapped) {
            break;
        }
        
        --end;
        swapped = false;
        
        // Backward pass
        for (size_t i = end; i > start; --i) {
            if (arr[i] < arr[i - 1]) {
                std::swap(arr[i], arr[i - 1]);
                swapped = true;
            }
        }
        
        ++start;
    }
}

/**
 * Print vector utility function.
 */
template<typename T>
void print_vector(const std::vector<T>& vec, const std::string& label = "") {
    if (!label.empty()) {
        std::cout << label << ": ";
    }
    
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) std::cout << ", ";
    }
    std::cout << "]" << std::endl;
}

/**
 * Create a copy of vector.
 */
template<typename T>
std::vector<T> copy_vector(const std::vector<T>& original) {
    return std::vector<T>(original);
}

int main() {
    std::vector<int> original = {64, 34, 25, 12, 22, 11, 90};
    
    print_vector(original, "Original");
    
    // Standard bubble sort
    auto numbers1 = copy_vector(original);
    bubble_sort(numbers1);
    print_vector(numbers1, "Bubble sort");
    
    // Bubble sort with stats
    auto numbers2 = copy_vector(original);
    auto stats = bubble_sort_with_stats(numbers2);
    print_vector(numbers2, "Bubble sort with stats");
    std::cout << "Comparisons: " << stats.comparisons << ", Swaps: " << stats.swaps << std::endl;
    
    // Cocktail shaker sort
    auto numbers3 = copy_vector(original);
    cocktail_shaker_sort(numbers3);
    print_vector(numbers3, "Cocktail shaker sort");
    
    // Custom comparator (descending order)
    auto numbers4 = copy_vector(original);
    bubble_sort_with_comparator(numbers4, std::greater<int>());
    print_vector(numbers4, "Descending order");
    
    // String example
    std::vector<std::string> words = {"banana", "apple", "cherry", "date"};
    print_vector(words, "\\nOriginal strings");
    
    bubble_sort(words);
    print_vector(words, "Sorted strings");
    
    // Case-insensitive string sorting
    std::vector<std::string> words2 = {"Banana", "apple", "Cherry", "date"};
    print_vector(words2, "\\nMixed case strings");
    
    bubble_sort_with_comparator(words2, [](const std::string& a, const std::string& b) {
        std::string a_lower = a, b_lower = b;
        std::transform(a_lower.begin(), a_lower.end(), a_lower.begin(), ::tolower);
        std::transform(b_lower.begin(), b_lower.end(), b_lower.begin(), ::tolower);
        return a_lower < b_lower;
    });
    
    print_vector(words2, "Case-insensitive sorted");
    
    return 0;
}`,
    explanation: "Bubble sort repeatedly compares adjacent elements and swaps them if they're in the wrong order.",
    timeComplexity: "O(n²) worst/average, O(n) best",
    spaceComplexity: "O(1)"
  },

  "quick-sort": {
    algorithm: "Quick Sort",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <random>
#include <chrono>

/**
 * Sort vector using quick sort algorithm.
 * 
 * @param arr Vector to be sorted
 */
template<typename T>
void quick_sort(std::vector<T>& arr) {
    if (!arr.empty()) {
        quick_sort_helper(arr, 0, static_cast<int>(arr.size()) - 1);
    }
}

/**
 * Recursive quick sort helper function.
 */
template<typename T>
void quick_sort_helper(std::vector<T>& arr, int low, int high) {
    if (low < high) {
        // Partition the array and get pivot index
        int pivot_index = partition(arr, low, high);
        
        // Recursively sort elements before and after partition
        quick_sort_helper(arr, low, pivot_index - 1);
        quick_sort_helper(arr, pivot_index + 1, high);
    }
}

/**
 * Partition function using Lomuto partition scheme.
 */
template<typename T>
int partition(std::vector<T>& arr, int low, int high) {
    // Choose rightmost element as pivot
    T pivot = arr[high];
    
    // Index of smaller element
    int i = low - 1;
    
    for (int j = low; j < high; ++j) {
        // If current element is smaller than or equal to pivot
        if (arr[j] <= pivot) {
            ++i;
            std::swap(arr[i], arr[j]);
        }
    }
    
    // Place pivot in correct position
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

/**
 * Randomized quick sort for better average performance.
 */
template<typename T>
void quick_sort_randomized(std::vector<T>& arr) {
    if (!arr.empty()) {
        std::random_device rd;
        std::mt19937 gen(rd());
        quick_sort_randomized_helper(arr, 0, static_cast<int>(arr.size()) - 1, gen);
    }
}

template<typename T>
void quick_sort_randomized_helper(std::vector<T>& arr, int low, int high, 
                                  std::mt19937& gen) {
    if (low < high) {
        // Randomize pivot selection
        randomize_pivot(arr, low, high, gen);
        
        int pivot_index = partition(arr, low, high);
        
        quick_sort_randomized_helper(arr, low, pivot_index - 1, gen);
        quick_sort_randomized_helper(arr, pivot_index + 1, high, gen);
    }
}

/**
 * Randomize pivot selection to avoid worst-case scenarios.
 */
template<typename T>
void randomize_pivot(std::vector<T>& arr, int low, int high, std::mt19937& gen) {
    std::uniform_int_distribution<int> dist(low, high);
    int random_index = dist(gen);
    std::swap(arr[random_index], arr[high]);
}

/**
 * Quick sort with custom comparator.
 */
template<typename T, typename Compare>
void quick_sort_with_comparator(std::vector<T>& arr, Compare comp) {
    if (!arr.empty()) {
        quick_sort_comparator_helper(arr, 0, static_cast<int>(arr.size()) - 1, comp);
    }
}

template<typename T, typename Compare>
void quick_sort_comparator_helper(std::vector<T>& arr, int low, int high, Compare comp) {
    if (low < high) {
        int pivot_index = partition_with_comparator(arr, low, high, comp);
        
        quick_sort_comparator_helper(arr, low, pivot_index - 1, comp);
        quick_sort_comparator_helper(arr, pivot_index + 1, high, comp);
    }
}

template<typename T, typename Compare>
int partition_with_comparator(std::vector<T>& arr, int low, int high, Compare comp) {
    T pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; ++j) {
        if (!comp(pivot, arr[j])) { // arr[j] <= pivot using comparator
            ++i;
            std::swap(arr[i], arr[j]);
        }
    }
    
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

/**
 * Three-way quick sort for handling duplicates efficiently.
 */
template<typename T>
void quick_sort_3way(std::vector<T>& arr) {
    if (!arr.empty()) {
        quick_sort_3way_helper(arr, 0, static_cast<int>(arr.size()) - 1);
    }
}

template<typename T>
void quick_sort_3way_helper(std::vector<T>& arr, int low, int high) {
    if (low >= high) return;
    
    int lt = low; // arr[low..lt-1] < pivot
    int i = low + 1; // arr[lt..i-1] == pivot
    int gt = high; // arr[gt+1..high] > pivot
    T pivot = arr[low];
    
    while (i <= gt) {
        if (arr[i] < pivot) {
            std::swap(arr[lt++], arr[i++]);
        } else if (arr[i] > pivot) {
            std::swap(arr[i], arr[gt--]);
        } else {
            ++i;
        }
    }
    
    // Recursively sort partitions
    quick_sort_3way_helper(arr, low, lt - 1);
    quick_sort_3way_helper(arr, gt + 1, high);
}

/**
 * Print vector utility function.
 */
template<typename T>
void print_vector(const std::vector<T>& vec, const std::string& label = "") {
    if (!label.empty()) {
        std::cout << label << ": ";
    }
    
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) std::cout << ", ";
    }
    std::cout << "]" << std::endl;
}

/**
 * Measure sorting time.
 */
template<typename T, typename SortFunc>
void measure_sort_time(std::vector<T> arr, SortFunc sort_func, 
                      const std::string& sort_name) {
    auto start = std::chrono::high_resolution_clock::now();
    sort_func(arr);
    auto end = std::chrono::high_resolution_clock::now();
    
    auto duration = std::chrono::duration_cast<std::chrono::microseconds>(end - start);
    std::cout << sort_name << " took: " << duration.count() << " microseconds" << std::endl;
}

int main() {
    std::vector<int> original = {64, 34, 25, 12, 22, 11, 90};
    
    print_vector(original, "Original");
    
    // Standard quick sort
    auto numbers1 = original;
    quick_sort(numbers1);
    print_vector(numbers1, "Quick sort");
    
    // Randomized quick sort
    auto numbers2 = original;
    quick_sort_randomized(numbers2);
    print_vector(numbers2, "Randomized quick sort");
    
    // Three-way quick sort
    auto numbers3 = original;
    quick_sort_3way(numbers3);
    print_vector(numbers3, "Three-way quick sort");
    
    // Custom comparator (descending order)
    auto numbers4 = original;
    quick_sort_with_comparator(numbers4, std::greater<int>());
    print_vector(numbers4, "Descending order");
    
    // String example
    std::vector<std::string> words = {"banana", "apple", "cherry", "date"};
    print_vector(words, "\\nOriginal strings");
    
    quick_sort(words);
    print_vector(words, "Sorted strings");
    
    // Performance comparison with larger dataset
    std::cout << "\\nPerformance comparison with 10000 random numbers:" << std::endl;
    
    std::vector<int> large_data(10000);
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<int> dist(1, 10000);
    
    for (auto& num : large_data) {
        num = dist(gen);
    }
    
    measure_sort_time(large_data, [](std::vector<int>& arr) { 
        quick_sort(arr); 
    }, "Standard quick sort");
    
    measure_sort_time(large_data, [](std::vector<int>& arr) { 
        quick_sort_randomized(arr); 
    }, "Randomized quick sort");
    
    measure_sort_time(large_data, [](std::vector<int>& arr) { 
        quick_sort_3way(arr); 
    }, "Three-way quick sort");
    
    measure_sort_time(large_data, [](std::vector<int>& arr) { 
        std::sort(arr.begin(), arr.end()); 
    }, "STL std::sort");
    
    return 0;
}`,
    explanation: "Quick sort uses divide-and-conquer by selecting a pivot and partitioning the array around it.",
    timeComplexity: "O(n log n) average, O(n²) worst",
    spaceComplexity: "O(log n) average, O(n) worst"
  },

  "merge-sort": {
    algorithm: "Merge Sort",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>

/**
 * Merge two sorted halves of the vector.
 */
template<typename T>
void merge(std::vector<T>& arr, int left, int mid, int right) {
    std::vector<T> leftArr(arr.begin() + left, arr.begin() + mid + 1);
    std::vector<T> rightArr(arr.begin() + mid + 1, arr.begin() + right + 1);
    
    size_t i = 0, j = 0;
    int k = left;
    
    while (i < leftArr.size() && j < rightArr.size()) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            ++i;
        } else {
            arr[k] = rightArr[j];
            ++j;
        }
        ++k;
    }
    
    while (i < leftArr.size()) {
        arr[k] = leftArr[i];
        ++i;
        ++k;
    }
    
    while (j < rightArr.size()) {
        arr[k] = rightArr[j];
        ++j;
        ++k;
    }
}

/**
 * Recursive merge sort helper function.
 */
template<typename T>
void merge_sort_helper(std::vector<T>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        merge_sort_helper(arr, left, mid);
        merge_sort_helper(arr, mid + 1, right);
        
        merge(arr, left, mid, right);
    }
}

/**
 * Sort vector using merge sort algorithm.
 * 
 * @param arr Vector to be sorted
 */
template<typename T>
void merge_sort(std::vector<T>& arr) {
    if (!arr.empty()) {
        merge_sort_helper(arr, 0, static_cast<int>(arr.size()) - 1);
    }
}

/**
 * Merge sort with custom comparator.
 */
template<typename T, typename Compare>
void merge_with_comparator(std::vector<T>& arr, int left, int mid, int right, Compare comp) {
    std::vector<T> leftArr(arr.begin() + left, arr.begin() + mid + 1);
    std::vector<T> rightArr(arr.begin() + mid + 1, arr.begin() + right + 1);
    
    size_t i = 0, j = 0;
    int k = left;
    
    while (i < leftArr.size() && j < rightArr.size()) {
        if (!comp(rightArr[j], leftArr[i])) { // leftArr[i] <= rightArr[j]
            arr[k] = leftArr[i];
            ++i;
        } else {
            arr[k] = rightArr[j];
            ++j;
        }
        ++k;
    }
    
    while (i < leftArr.size()) {
        arr[k] = leftArr[i];
        ++i;
        ++k;
    }
    
    while (j < rightArr.size()) {
        arr[k] = rightArr[j];
        ++j;
        ++k;
    }
}

template<typename T, typename Compare>
void merge_sort_helper_with_comparator(std::vector<T>& arr, int left, int right, Compare comp) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        merge_sort_helper_with_comparator(arr, left, mid, comp);
        merge_sort_helper_with_comparator(arr, mid + 1, right, comp);
        
        merge_with_comparator(arr, left, mid, right, comp);
    }
}

template<typename T, typename Compare>
void merge_sort_with_comparator(std::vector<T>& arr, Compare comp) {
    if (!arr.empty()) {
        merge_sort_helper_with_comparator(arr, 0, static_cast<int>(arr.size()) - 1, comp);
    }
}

/**
 * Bottom-up iterative merge sort (no recursion).
 */
template<typename T>
void merge_sort_iterative(std::vector<T>& arr) {
    int n = static_cast<int>(arr.size());
    
    // Size of subarrays to be merged starts from 1
    for (int curr_size = 1; curr_size < n; curr_size *= 2) {
        // Pick starting point of different subarrays of current size
        for (int left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
            int mid = std::min(left_start + curr_size - 1, n - 1);
            int right_end = std::min(left_start + 2 * curr_size - 1, n - 1);
            
            merge(arr, left_start, mid, right_end);
        }
    }
}

/**
 * Print vector utility function.
 */
template<typename T>
void print_vector(const std::vector<T>& vec, const std::string& label = "") {
    if (!label.empty()) {
        std::cout << label << ": ";
    }
    
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) std::cout << ", ";
    }
    std::cout << "]" << std::endl;
}

int main() {
    std::vector<int> original = {64, 34, 25, 12, 22, 11, 90};
    
    print_vector(original, "Original");
    
    // Recursive merge sort
    auto numbers1 = original;
    merge_sort(numbers1);
    print_vector(numbers1, "Merge sort");
    
    // Iterative merge sort
    auto numbers2 = original;
    merge_sort_iterative(numbers2);
    print_vector(numbers2, "Iterative merge sort");
    
    // Custom comparator (descending order)
    auto numbers3 = original;
    merge_sort_with_comparator(numbers3, std::greater<int>());
    print_vector(numbers3, "Descending order");
    
    // String example
    std::vector<std::string> words = {"banana", "apple", "cherry", "date"};
    print_vector(words, "\\nOriginal strings");
    
    merge_sort(words);
    print_vector(words, "Sorted strings");
    
    // Case-insensitive string sorting
    std::vector<std::string> words2 = {"Banana", "apple", "Cherry", "date"};
    print_vector(words2, "\\nMixed case strings");
    
    merge_sort_with_comparator(words2, [](const std::string& a, const std::string& b) {
        std::string a_lower = a, b_lower = b;
        std::transform(a_lower.begin(), a_lower.end(), a_lower.begin(), ::tolower);
        std::transform(b_lower.begin(), b_lower.end(), b_lower.begin(), ::tolower);
        return a_lower > b_lower; // For ascending, we check if a should come after b
    });
    
    print_vector(words2, "Case-insensitive sorted");
    
    return 0;
}`,
    explanation: "Merge sort divides the array into halves, recursively sorts them, then merges the sorted halves.",
    timeComplexity: "O(n log n) in all cases",
    spaceComplexity: "O(n)"
  },

  "dijkstra": {
    algorithm: "Dijkstra's Algorithm",
    code: `#include <iostream>
#include <vector>
#include <queue>
#include <limits>
#include <algorithm>
#include <unordered_map>

/**
 * Edge structure for representing weighted edges.
 */
struct Edge {
    int destination;
    int weight;
    
    Edge(int dest, int w) : destination(dest), weight(w) {}
};

/**
 * Graph class using adjacency list representation.
 */
class Graph {
private:
    int vertices;
    std::vector<std::vector<Edge>> adjacency_list;
    
public:
    Graph(int v) : vertices(v) {
        adjacency_list.resize(v);
    }
    
    void add_edge(int source, int destination, int weight) {
        adjacency_list[source].emplace_back(destination, weight);
    }
    
    int get_vertices() const { return vertices; }
    
    const std::vector<Edge>& get_neighbors(int vertex) const {
        return adjacency_list[vertex];
    }
    
    void print_graph() const {
        std::cout << "Graph adjacency list:" << std::endl;
        for (int i = 0; i < vertices; ++i) {
            std::cout << "Vertex " << i << ": ";
            for (const auto& edge : adjacency_list[i]) {
                std::cout << "(" << edge.destination << "," << edge.weight << ") ";
            }
            std::cout << std::endl;
        }
    }
};

/**
 * Priority queue node for Dijkstra's algorithm.
 */
struct PQNode {
    int vertex;
    int distance;
    
    PQNode(int v, int d) : vertex(v), distance(d) {}
    
    // For min-heap (priority queue with smallest distance first)
    bool operator>(const PQNode& other) const {
        return distance > other.distance;
    }
};

/**
 * Dijkstra's algorithm implementation.
 */
class DijkstraAlgorithm {
public:
    /**
     * Find shortest paths from source to all vertices.
     * 
     * @param graph The weighted graph
     * @param source Starting vertex
     * @return Vector of shortest distances
     */
    static std::vector<int> dijkstra(const Graph& graph, int source) {
        int vertices = graph.get_vertices();
        std::vector<int> distances(vertices, std::numeric_limits<int>::max());
        std::vector<int> previous(vertices, -1);
        std::vector<bool> visited(vertices, false);
        
        distances[source] = 0;
        
        // Priority queue to store vertices with their distances
        std::priority_queue<PQNode, std::vector<PQNode>, std::greater<PQNode>> pq;
        pq.emplace(source, 0);
        
        while (!pq.empty()) {
            PQNode current = pq.top();
            pq.pop();
            
            int current_vertex = current.vertex;
            
            // Skip if already visited
            if (visited[current_vertex]) {
                continue;
            }
            
            visited[current_vertex] = true;
            
            // Check all neighbors
            for (const auto& edge : graph.get_neighbors(current_vertex)) {
                int neighbor = edge.destination;
                int weight = edge.weight;
                int new_distance = distances[current_vertex] + weight;
                
                // If found shorter path, update
                if (new_distance < distances[neighbor]) {
                    distances[neighbor] = new_distance;
                    previous[neighbor] = current_vertex;
                    pq.emplace(neighbor, new_distance);
                }
            }
        }
        
        return distances;
    }
    
    /**
     * Get shortest path from source to destination.
     */
    static std::vector<int> get_shortest_path(const Graph& graph, int source, int destination) {
        int vertices = graph.get_vertices();
        std::vector<int> distances(vertices, std::numeric_limits<int>::max());
        std::vector<int> previous(vertices, -1);
        std::vector<bool> visited(vertices, false);
        
        distances[source] = 0;
        
        std::priority_queue<PQNode, std::vector<PQNode>, std::greater<PQNode>> pq;
        pq.emplace(source, 0);
        
        while (!pq.empty()) {
            PQNode current = pq.top();
            pq.pop();
            
            int current_vertex = current.vertex;
            
            if (visited[current_vertex]) {
                continue;
            }
            
            visited[current_vertex] = true;
            
            // Early termination if we reached destination
            if (current_vertex == destination) {
                break;
            }
            
            for (const auto& edge : graph.get_neighbors(current_vertex)) {
                int neighbor = edge.destination;
                int weight = edge.weight;
                int new_distance = distances[current_vertex] + weight;
                
                if (new_distance < distances[neighbor]) {
                    distances[neighbor] = new_distance;
                    previous[neighbor] = current_vertex;
                    pq.emplace(neighbor, new_distance);
                }
            }
        }
        
        // Reconstruct path
        std::vector<int> path;
        if (distances[destination] == std::numeric_limits<int>::max()) {
            return path; // No path exists
        }
        
        int current = destination;
        while (current != -1) {
            path.push_back(current);
            current = previous[current];
        }
        
        std::reverse(path.begin(), path.end());
        return path;
    }
    
    /**
     * Print shortest distances from source.
     */
    static void print_distances(const std::vector<int>& distances, int source) {
        std::cout << "Shortest distances from vertex " << source << ":" << std::endl;
        std::cout << "Destination\\tDistance" << std::endl;
        
        for (size_t i = 0; i < distances.size(); ++i) {
            std::cout << i << "\\t\\t";
            if (distances[i] == std::numeric_limits<int>::max()) {
                std::cout << "INF" << std::endl;
            } else {
                std::cout << distances[i] << std::endl;
            }
        }
    }
    
    /**
     * Print path from source to destination.
     */
    static void print_path(const std::vector<int>& path, int source, int destination) {
        if (path.empty()) {
            std::cout << "No path from " << source << " to " << destination << std::endl;
            return;
        }
        
        std::cout << "Path from " << source << " to " << destination << ": ";
        for (size_t i = 0; i < path.size(); ++i) {
            std::cout << path[i];
            if (i < path.size() - 1) {
                std::cout << " -> ";
            }
        }
        std::cout << std::endl;
    }
};

/**
 * Advanced Dijkstra implementation with additional features.
 */
template<typename T>
class AdvancedDijkstra {
private:
    struct Node {
        T vertex;
        int distance;
        
        Node(T v, int d) : vertex(v), distance(d) {}
        
        bool operator>(const Node& other) const {
            return distance > other.distance;
        }
    };
    
public:
    /**
     * Generic Dijkstra with custom vertex type and hash function.
     */
    template<typename Hash = std::hash<T>>
    static std::unordered_map<T, int> dijkstra_generic(
        const std::unordered_map<T, std::vector<std::pair<T, int>>>& graph,
        const T& source,
        Hash hasher = Hash{}) {
        
        std::unordered_map<T, int> distances;
        std::unordered_map<T, bool> visited;
        
        // Initialize distances
        for (const auto& pair : graph) {
            distances[pair.first] = std::numeric_limits<int>::max();
            visited[pair.first] = false;
        }
        distances[source] = 0;
        
        std::priority_queue<Node, std::vector<Node>, std::greater<Node>> pq;
        pq.emplace(source, 0);
        
        while (!pq.empty()) {
            Node current = pq.top();
            pq.pop();
            
            if (visited[current.vertex]) {
                continue;
            }
            
            visited[current.vertex] = true;
            
            auto it = graph.find(current.vertex);
            if (it != graph.end()) {
                for (const auto& edge : it->second) {
                    T neighbor = edge.first;
                    int weight = edge.second;
                    int new_distance = distances[current.vertex] + weight;
                    
                    if (new_distance < distances[neighbor]) {
                        distances[neighbor] = new_distance;
                        pq.emplace(neighbor, new_distance);
                    }
                }
            }
        }
        
        return distances;
    }
};

int main() {
    // Create a sample graph
    Graph graph(5);
    
    // Add edges (source, destination, weight)
    graph.add_edge(0, 1, 4);
    graph.add_edge(0, 2, 2);
    graph.add_edge(1, 2, 1);
    graph.add_edge(1, 3, 5);
    graph.add_edge(2, 3, 8);
    graph.add_edge(2, 4, 10);
    graph.add_edge(3, 4, 2);
    
    std::cout << "Sample Graph:" << std::endl;
    graph.print_graph();
    std::cout << std::endl;
    
    int source = 0;
    
    // Find shortest distances
    auto distances = DijkstraAlgorithm::dijkstra(graph, source);
    DijkstraAlgorithm::print_distances(distances, source);
    std::cout << std::endl;
    
    // Find shortest paths to all destinations
    for (int dest = 1; dest < graph.get_vertices(); ++dest) {
        auto path = DijkstraAlgorithm::get_shortest_path(graph, source, dest);
        DijkstraAlgorithm::print_path(path, source, dest);
    }
    
    // Example with string vertices
    std::cout << "\\nString vertex example:" << std::endl;
    
    std::unordered_map<std::string, std::vector<std::pair<std::string, int>>> string_graph;
    
    string_graph["A"] = {{"B", 4}, {"C", 2}};
    string_graph["B"] = {{"C", 1}, {"D", 5}};
    string_graph["C"] = {{"D", 8}, {"E", 10}};
    string_graph["D"] = {{"E", 2}};
    string_graph["E"] = {};
    
    auto string_distances = AdvancedDijkstra<std::string>::dijkstra_generic(string_graph, "A");
    
    std::cout << "Shortest distances from A:" << std::endl;
    for (const auto& pair : string_distances) {
        std::cout << "To " << pair.first << ": ";
        if (pair.second == std::numeric_limits<int>::max()) {
            std::cout << "INF" << std::endl;
        } else {
            std::cout << pair.second << std::endl;
        }
    }
    
    return 0;
}`,
    explanation: "Dijkstra's algorithm finds shortest paths from a source vertex to all other vertices in a weighted graph.",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)"
  },

  "insertion-sort": {
    algorithm: "Insertion Sort",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>
#include <chrono>

/**
 * Sort vector using insertion sort algorithm.
 * 
 * @param arr Vector to be sorted
 */
template<typename T>
void insertion_sort(std::vector<T>& arr) {
    for (size_t i = 1; i < arr.size(); ++i) {
        T key = arr[i];
        int j = static_cast<int>(i) - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            --j;
        }
        
        arr[j + 1] = key;
    }
}

/**
 * Insertion sort with custom comparator.
 */
template<typename T, typename Compare>
void insertion_sort_custom(std::vector<T>& arr, Compare comp) {
    for (size_t i = 1; i < arr.size(); ++i) {
        T key = arr[i];
        int j = static_cast<int>(i) - 1;
        
        while (j >= 0 && comp(key, arr[j])) {
            arr[j + 1] = arr[j];
            --j;
        }
        
        arr[j + 1] = key;
    }
}

/**
 * Generic insertion sort using iterators.
 */
template<typename Iterator>
void insertion_sort_iterators(Iterator first, Iterator last) {
    if (first == last) return;
    
    for (auto it = std::next(first); it != last; ++it) {
        auto key = *it;
        auto insert_pos = std::upper_bound(first, it, key);
        std::rotate(insert_pos, it, std::next(it));
    }
}

/**
 * Print vector utility function.
 */
template<typename T>
void print_vector(const std::vector<T>& vec, const std::string& label = "") {
    if (!label.empty()) {
        std::cout << label << ": ";
    }
    
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) std::cout << ", ";
    }
    std::cout << "]" << std::endl;
}

int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    print_vector(numbers, "Original");
    
    // Basic insertion sort
    auto numbers_copy = numbers;
    insertion_sort(numbers_copy);
    print_vector(numbers_copy, "Insertion sort");
    
    // Custom comparator (descending order)
    auto numbers_desc = numbers;
    insertion_sort_custom(numbers_desc, std::greater<int>());
    print_vector(numbers_desc, "Descending order");
    
    // String example
    std::vector<std::string> words = {"banana", "apple", "cherry", "date"};
    print_vector(words, "\nOriginal strings");
    
    insertion_sort(words);
    print_vector(words, "Sorted strings");
    
    // Sort by string length
    std::vector<std::string> words_by_length = {"a", "hello", "hi", "world"};
    print_vector(words_by_length, "\nOriginal (by length)");
    
    insertion_sort_custom(words_by_length, [](const std::string& a, const std::string& b) {
        return a.length() < b.length();
    });
    print_vector(words_by_length, "Sorted by length");
    
    return 0;
}`,
    explanation: "Insertion sort builds the final sorted array one item at a time by inserting each element into its proper position.",
    timeComplexity: "O(n²) worst/average, O(n) best",
    spaceComplexity: "O(1)"
  },

  "selection-sort": {
    algorithm: "Selection Sort",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>

/**
 * Sort vector using selection sort algorithm.
 * 
 * @param arr Vector to be sorted
 */
template<typename T>
void selection_sort(std::vector<T>& arr) {
    for (size_t i = 0; i < arr.size(); ++i) {
        size_t min_index = i;
        
        // Find minimum element in remaining unsorted array
        for (size_t j = i + 1; j < arr.size(); ++j) {
            if (arr[j] < arr[min_index]) {
                min_index = j;
            }
        }
        
        // Swap found minimum element with first element
        if (min_index != i) {
            std::swap(arr[i], arr[min_index]);
        }
    }
}

/**
 * Selection sort with custom comparator.
 */
template<typename T, typename Compare>
void selection_sort_custom(std::vector<T>& arr, Compare comp) {
    for (size_t i = 0; i < arr.size(); ++i) {
        size_t selected_index = i;
        
        for (size_t j = i + 1; j < arr.size(); ++j) {
            if (comp(arr[j], arr[selected_index])) {
                selected_index = j;
            }
        }
        
        if (selected_index != i) {
            std::swap(arr[i], arr[selected_index]);
        }
    }
}

/**
 * Generic selection sort using iterators.
 */
template<typename Iterator>
void selection_sort_iterators(Iterator first, Iterator last) {
    for (auto it = first; it != last; ++it) {
        auto min_it = std::min_element(it, last);
        if (min_it != it) {
            std::swap(*it, *min_it);
        }
    }
}

template<typename T>
void print_vector(const std::vector<T>& vec, const std::string& label = "") {
    if (!label.empty()) {
        std::cout << label << ": ";
    }
    
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) std::cout << ", ";
    }
    std::cout << "]" << std::endl;
}

int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    print_vector(numbers, "Original");
    
    selection_sort(numbers);
    print_vector(numbers, "Sorted");
    
    // Custom example with pairs
    std::vector<std::pair<std::string, int>> students = {
        {"Alice", 85}, {"Bob", 92}, {"Charlie", 78}
    };
    
    std::cout << "\nOriginal students:\n";
    for (const auto& student : students) {
        std::cout << student.first << ": " << student.second << std::endl;
    }
    
    // Sort by grade (descending)
    selection_sort_custom(students, [](const auto& a, const auto& b) {
        return a.second > b.second;
    });
    
    std::cout << "\nSorted by grade (descending):\n";
    for (const auto& student : students) {
        std::cout << student.first << ": " << student.second << std::endl;
    }
    
    return 0;
}`,
    explanation: "Selection sort repeatedly selects the minimum element from the unsorted portion and places it at the beginning.",
    timeComplexity: "O(n²) in all cases",
    spaceComplexity: "O(1)"
  },

  "heap-sort": {
    algorithm: "Heap Sort",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>

/**
 * Heapify a subtree rooted with node i.
 * 
 * @param arr Vector to heapify
 * @param n Size of heap
 * @param i Root index of subtree
 */
template<typename T>
void heapify(std::vector<T>& arr, int n, int i) {
    int largest = i;         // Initialize largest as root
    int left = 2 * i + 1;    // left child
    int right = 2 * i + 2;   // right child
    
    // If left child exists and is greater than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    // If right child exists and is greater than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    // If largest is not root
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        
        // Recursively heapify the affected subtree
        heapify(arr, n, largest);
    }
}

/**
 * Sort vector using heap sort algorithm.
 * 
 * @param arr Vector to be sorted
 */
template<typename T>
void heap_sort(std::vector<T>& arr) {
    int n = static_cast<int>(arr.size());
    
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; --i) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap one by one
    for (int i = n - 1; i > 0; --i) {
        // Move current root to end
        std::swap(arr[0], arr[i]);
        
        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
}

/**
 * Heap sort with custom comparator.
 */
template<typename T, typename Compare>
void heapify_custom(std::vector<T>& arr, int n, int i, Compare comp) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && comp(arr[largest], arr[left])) {
        largest = left;
    }
    
    if (right < n && comp(arr[largest], arr[right])) {
        largest = right;
    }
    
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        heapify_custom(arr, n, largest, comp);
    }
}

template<typename T, typename Compare>
void heap_sort_custom(std::vector<T>& arr, Compare comp) {
    int n = static_cast<int>(arr.size());
    
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; --i) {
        heapify_custom(arr, n, i, comp);
    }
    
    // Extract elements
    for (int i = n - 1; i > 0; --i) {
        std::swap(arr[0], arr[i]);
        heapify_custom(arr, i, 0, comp);
    }
}

/**
 * STL-based heap sort using make_heap and sort_heap.
 */
template<typename T>
void heap_sort_stl(std::vector<T>& arr) {
    std::make_heap(arr.begin(), arr.end());
    std::sort_heap(arr.begin(), arr.end());
}

template<typename T>
void print_vector(const std::vector<T>& vec, const std::string& label = "") {
    if (!label.empty()) {
        std::cout << label << ": ";
    }
    
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) std::cout << ", ";
    }
    std::cout << "]" << std::endl;
}

int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    print_vector(numbers, "Original");
    
    // Manual heap sort
    auto numbers_manual = numbers;
    heap_sort(numbers_manual);
    print_vector(numbers_manual, "Heap sort (manual)");
    
    // STL heap sort
    auto numbers_stl = numbers;
    heap_sort_stl(numbers_stl);
    print_vector(numbers_stl, "Heap sort (STL)");
    
    // Custom comparator (descending order)
    auto numbers_desc = numbers;
    heap_sort_custom(numbers_desc, std::less<int>());
    print_vector(numbers_desc, "Heap sort (descending)");
    
    return 0;
}`,
    explanation: "Heap sort uses a binary heap data structure to sort elements. It builds a max heap then repeatedly extracts the maximum.",
    timeComplexity: "O(n log n) in all cases",
    spaceComplexity: "O(1)"
  },

  "bfs": {
    algorithm: "Breadth-First Search (BFS)",
    code: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <algorithm>

template<typename T>
class Graph {
public:
    std::unordered_map<T, std::vector<T>> adjacency_list;
    
    void add_edge(const T& u, const T& v) {
        adjacency_list[u].push_back(v);
        adjacency_list[v].push_back(u); // For undirected graph
    }
    
    void add_directed_edge(const T& u, const T& v) {
        adjacency_list[u].push_back(v);
    }
    
    /**
     * Breadth-First Search traversal starting from given vertex.
     * 
     * @param start_vertex Starting vertex for BFS
     * @return Vector containing BFS traversal order
     */
    std::vector<T> bfs(const T& start_vertex) const {
        std::unordered_set<T> visited;
        std::queue<T> queue;
        std::vector<T> result;
        
        visited.insert(start_vertex);
        queue.push(start_vertex);
        
        while (!queue.empty()) {
            T vertex = queue.front();
            queue.pop();
            result.push_back(vertex);
            
            // Visit all unvisited neighbors
            if (adjacency_list.find(vertex) != adjacency_list.end()) {
                for (const T& neighbor : adjacency_list.at(vertex)) {
                    if (visited.find(neighbor) == visited.end()) {
                        visited.insert(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
        }
        
        return result;
    }
    
    /**
     * Find shortest path between two vertices using BFS.
     */
    std::vector<T> shortest_path(const T& start, const T& end) const {
        if (start == end) {
            return {start};
        }
        
        std::unordered_set<T> visited;
        std::queue<std::pair<T, std::vector<T>>> queue;
        
        visited.insert(start);
        queue.push({start, {start}});
        
        while (!queue.empty()) {
            auto [vertex, path] = queue.front();
            queue.pop();
            
            if (adjacency_list.find(vertex) != adjacency_list.end()) {
                for (const T& neighbor : adjacency_list.at(vertex)) {
                    if (neighbor == end) {
                        auto result_path = path;
                        result_path.push_back(neighbor);
                        return result_path;
                    }
                    
                    if (visited.find(neighbor) == visited.end()) {
                        visited.insert(neighbor);
                        auto new_path = path;
                        new_path.push_back(neighbor);
                        queue.push({neighbor, new_path});
                    }
                }
            }
        }
        
        return {}; // No path found
    }
    
    /**
     * Check if the graph is connected using BFS.
     */
    bool is_connected() const {
        if (adjacency_list.empty()) {
            return true;
        }
        
        // Get all vertices
        std::unordered_set<T> all_vertices;
        for (const auto& [vertex, neighbors] : adjacency_list) {
            all_vertices.insert(vertex);
            for (const T& neighbor : neighbors) {
                all_vertices.insert(neighbor);
            }
        }
        
        // Start BFS from any vertex
        T start = *all_vertices.begin();
        auto reachable = bfs(start);
        
        return reachable.size() == all_vertices.size();
    }
    
    /**
     * Find all connected components using BFS.
     */
    std::vector<std::vector<T>> connected_components() const {
        std::unordered_set<T> visited;
        std::vector<std::vector<T>> components;
        
        // Get all vertices
        std::unordered_set<T> all_vertices;
        for (const auto& [vertex, neighbors] : adjacency_list) {
            all_vertices.insert(vertex);
            for (const T& neighbor : neighbors) {
                all_vertices.insert(neighbor);
            }
        }
        
        for (const T& vertex : all_vertices) {
            if (visited.find(vertex) == visited.end()) {
                // Start BFS from unvisited vertex
                std::vector<T> component;
                std::queue<T> queue;
                
                visited.insert(vertex);
                queue.push(vertex);
                
                while (!queue.empty()) {
                    T current = queue.front();
                    queue.pop();
                    component.push_back(current);
                    
                    if (adjacency_list.find(current) != adjacency_list.end()) {
                        for (const T& neighbor : adjacency_list.at(current)) {
                            if (visited.find(neighbor) == visited.end()) {
                                visited.insert(neighbor);
                                queue.push(neighbor);
                            }
                        }
                    }
                }
                
                components.push_back(component);
            }
        }
        
        return components;
    }
};

template<typename T>
void print_vector(const std::vector<T>& vec, const std::string& label = "") {
    if (!label.empty()) {
        std::cout << label << ": ";
    }
    
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) std::cout << ", ";
    }
    std::cout << "]" << std::endl;
}

int main() {
    Graph<int> graph;
    
    // Add edges
    graph.add_edge(0, 1);
    graph.add_edge(0, 2);
    graph.add_edge(1, 3);
    graph.add_edge(1, 4);
    graph.add_edge(2, 4);
    graph.add_edge(3, 5);
    graph.add_edge(4, 5);
    
    // Perform BFS
    auto bfs_result = graph.bfs(0);
    print_vector(bfs_result, "BFS traversal from vertex 0");
    
    // Find shortest path
    auto path = graph.shortest_path(0, 5);
    std::cout << "Shortest path from 0 to 5: ";
    for (size_t i = 0; i < path.size(); ++i) {
        std::cout << path[i];
        if (i < path.size() - 1) std::cout << " -> ";
    }
    std::cout << std::endl;
    
    // Check connectivity
    std::cout << "Graph is connected: " << (graph.is_connected() ? "true" : "false") << std::endl;
    
    // String graph example
    Graph<std::string> string_graph;
    string_graph.add_edge("Alice", "Bob");
    string_graph.add_edge("Bob", "Charlie");
    string_graph.add_edge("Alice", "David");
    
    auto string_bfs = string_graph.bfs("Alice");
    print_vector(string_bfs, "\nString graph BFS from Alice");
    
    return 0;
}`,
    explanation: "BFS explores all vertices at the present depth before moving to vertices at the next depth level.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)"
  },

  "dfs": {
    algorithm: "Depth-First Search (DFS)",
    code: `#include <iostream>
#include <vector>
#include <stack>
#include <unordered_map>
#include <unordered_set>
#include <functional>

template<typename T>
class Graph {
public:
    std::unordered_map<T, std::vector<T>> adjacency_list;
    
    void add_edge(const T& u, const T& v) {
        adjacency_list[u].push_back(v);
        adjacency_list[v].push_back(u); // For undirected graph
    }
    
    void add_directed_edge(const T& u, const T& v) {
        adjacency_list[u].push_back(v);
    }
    
    /**
     * Depth-First Search traversal using recursion.
     */
    std::vector<T> dfs_recursive(const T& start_vertex) const {
        std::unordered_set<T> visited;
        std::vector<T> result;
        
        dfs_util(start_vertex, visited, result);
        return result;
    }
    
 private:
    void dfs_util(const T& vertex, std::unordered_set<T>& visited, std::vector<T>& result) const {
        visited.insert(vertex);
        result.push_back(vertex);
        
        if (adjacency_list.find(vertex) != adjacency_list.end()) {
            for (const T& neighbor : adjacency_list.at(vertex)) {
                if (visited.find(neighbor) == visited.end()) {
                    dfs_util(neighbor, visited, result);
                }
            }
        }
    }
    
 public:
    /**
     * Depth-First Search traversal using iteration (stack).
     */
    std::vector<T> dfs_iterative(const T& start_vertex) const {
        std::unordered_set<T> visited;
        std::stack<T> stack;
        std::vector<T> result;
        
        stack.push(start_vertex);
        
        while (!stack.empty()) {
            T vertex = stack.top();
            stack.pop();
            
            if (visited.find(vertex) == visited.end()) {
                visited.insert(vertex);
                result.push_back(vertex);
                
                // Add neighbors to stack (in reverse order for correct traversal)
                if (adjacency_list.find(vertex) != adjacency_list.end()) {
                    auto neighbors = adjacency_list.at(vertex);
                    for (auto it = neighbors.rbegin(); it != neighbors.rend(); ++it) {
                        if (visited.find(*it) == visited.end()) {
                            stack.push(*it);
                        }
                    }
                }
            }
        }
        
        return result;
    }
    
    /**
     * Check if path exists between two vertices using DFS.
     */
    bool has_path(const T& start, const T& end) const {
        std::unordered_set<T> visited;
        return has_path_util(start, end, visited);
    }
    
 private:
    bool has_path_util(const T& current, const T& target, std::unordered_set<T>& visited) const {
        if (current == target) {
            return true;
        }
        
        visited.insert(current);
        
        if (adjacency_list.find(current) != adjacency_list.end()) {
            for (const T& neighbor : adjacency_list.at(current)) {
                if (visited.find(neighbor) == visited.end()) {
                    if (has_path_util(neighbor, target, visited)) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
    
 public:
    /**
     * Find all paths between two vertices using DFS.
     */
    std::vector<std::vector<T>> find_all_paths(const T& start, const T& end) const {
        std::vector<T> path;
        std::vector<std::vector<T>> all_paths;
        find_all_paths_util(start, end, path, all_paths);
        return all_paths;
    }
    
 private:
    void find_all_paths_util(const T& current, const T& target, 
                             std::vector<T>& path, std::vector<std::vector<T>>& all_paths) const {
        path.push_back(current);
        
        if (current == target) {
            all_paths.push_back(path);
        } else if (adjacency_list.find(current) != adjacency_list.end()) {
            for (const T& neighbor : adjacency_list.at(current)) {
                // Check if neighbor is not already in current path (to avoid cycles)
                if (std::find(path.begin(), path.end(), neighbor) == path.end()) {
                    find_all_paths_util(neighbor, target, path, all_paths);
                }
            }
        }
        
        path.pop_back(); // Backtrack
    }
    
 public:
    /**
     * Detect cycle in undirected graph using DFS.
     */
    bool has_cycle() const {
        std::unordered_set<T> visited;
        
        for (const auto& [vertex, _] : adjacency_list) {
            if (visited.find(vertex) == visited.end()) {
                if (has_cycle_util(vertex, T{}, visited)) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
 private:
    bool has_cycle_util(const T& vertex, const T& parent, std::unordered_set<T>& visited) const {
        visited.insert(vertex);
        
        if (adjacency_list.find(vertex) != adjacency_list.end()) {
            for (const T& neighbor : adjacency_list.at(vertex)) {
                if (visited.find(neighbor) == visited.end()) {
                    if (has_cycle_util(neighbor, vertex, visited)) {
                        return true;
                    }
                } else if (neighbor != parent) {
                    return true; // Back edge found
                }
            }
        }
        
        return false;
    }
};

template<typename T>
void print_vector(const std::vector<T>& vec, const std::string& label = "") {
    if (!label.empty()) {
        std::cout << label << ": ";
    }
    
    std::cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        std::cout << vec[i];
        if (i < vec.size() - 1) std::cout << ", ";
    }
    std::cout << "]" << std::endl;
}

int main() {
    Graph<int> graph;
    
    // Add edges
    graph.add_edge(0, 1);
    graph.add_edge(0, 2);
    graph.add_edge(1, 3);
    graph.add_edge(1, 4);
    graph.add_edge(2, 4);
    graph.add_edge(3, 5);
    graph.add_edge(4, 5);
    
    // Perform DFS
    auto dfs_recursive = graph.dfs_recursive(0);
    print_vector(dfs_recursive, "DFS recursive from vertex 0");
    
    auto dfs_iterative = graph.dfs_iterative(0);
    print_vector(dfs_iterative, "DFS iterative from vertex 0");
    
    // Check path existence
    bool has_path = graph.has_path(0, 5);
    std::cout << "Path exists from 0 to 5: " << (has_path ? "true" : "false") << std::endl;
    
    // Find all paths
    auto all_paths = graph.find_all_paths(0, 5);
    std::cout << "All paths from 0 to 5:" << std::endl;
    for (size_t i = 0; i < all_paths.size(); ++i) {
        std::cout << "  Path " << (i + 1) << ": ";
        for (size_t j = 0; j < all_paths[i].size(); ++j) {
            std::cout << all_paths[i][j];
            if (j < all_paths[i].size() - 1) std::cout << " -> ";
        }
        std::cout << std::endl;
    }
    
    // Check for cycles
    std::cout << "Graph has cycle: " << (graph.has_cycle() ? "true" : "false") << std::endl;
    
    return 0;
}`,
    explanation: "DFS explores as far as possible along each branch before backtracking.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)"
  }
};

export const getAllCppImplementations = (): CppImplementation[] => {
  return Object.values(CPP_IMPLEMENTATIONS);
};

export const getCppImplementation = (algorithm: string): CppImplementation | undefined => {
  return CPP_IMPLEMENTATIONS[algorithm];
};