function sum_to_n_a(n: number): number {
  // Complexity: O(n)
  let sum = 0;
  if (n >= 0) {
    for (let i = 1; i <= n; i++) {
      sum += i
    }
  } else {
    for (let i = -1; i >= n; i--) {
      sum += i
    }
  }

  return sum
};

function sum_to_n_b(n: number): number {
  // Complexity: O(n)
  if (n == 0) {
    return 0
  }

  if (n > 0) {
    return n + sum_to_n_b(n - 1)
  }

  return n + sum_to_n_b(n + 1);
};

function sum_to_n_c(n: number): number {
  // Complexity: O(1)
  return n > 0 ? (n * (n + 1)) / 2 : (-n * (n - 1)) / 2;
};

function main() {
  const n = 5;
  console.log('The first solution')
  console.log(sum_to_n_a(n))

  console.log('The second solution')
  console.log(sum_to_n_b(n))

  console.log('The third solution')
  console.log(sum_to_n_c(n))
}


main()
