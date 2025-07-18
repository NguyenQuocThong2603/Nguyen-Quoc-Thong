function sum_to_n_a(n) {
    // Complexity: O(n)
    var sum = 0;
    if (n >= 0) {
        for (var i = 1; i <= n; i++) {
            sum += i;
        }
    }
    else {
        for (var i = -1; i >= n; i--) {
            sum += i;
        }
    }
    return sum;
}
;
function sum_to_n_b(n) {
    // Complexity: O(n)
    if (n == 0) {
        return 0;
    }
    if (n > 0) {
        return n + sum_to_n_b(n - 1);
    }
    return n + sum_to_n_b(n + 1);
}
;
function sum_to_n_c(n) {
    // Complexity: O(1)
    return n > 0 ? (n * (n + 1)) / 2 : (-n * (n - 1)) / 2;
}
;
function main() {
    var n = 5;
    console.log('The first solution');
    console.log(sum_to_n_a(n));
    console.log('The second solution');
    console.log(sum_to_n_b(n));
    console.log('The third solution');
    console.log(sum_to_n_c(n));
}
main();
