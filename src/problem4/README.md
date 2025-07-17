# Problem 4

## `sum_to_n_a` Solution

This is a straightforward iterative approach.
I use a loop to sum the numbers from `1` to `n`.

* **Time Complexity:** O(n) — one iteration per number.
* **Space Complexity:** O(1) — no additional memory used beyond a few variables.

---

## `sum_to_n_b` Solution

In this approach, I use recursion instead of a loop.
The function makes `n` recursive calls, each adding one number to the total.

* **Time Complexity:** O(n) — one recursive call per number.
* **Space Complexity:** O(n) — each recursive call adds a new frame to the call stack.

---

## `sum_to_n_c` Solution

This is the most efficient solution.
It uses the mathematical formula for the sum of the first `n` natural numbers:

$$
\text{Sum} = \frac{n(n + 1)}{2}
$$

* **Time Complexity:** O(1) — constant time calculation.
* **Space Complexity:** O(1) — no extra space required.
