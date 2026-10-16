#include <stdio.h>
#include <stdlib.h>

int cmp_asc_ll(const void *a, const void *b) {
    long long x = *(const long long*)a, y = *(const long long*)b;
    return (x > y) - (x < y);
}

int main() {
    int n, k, m;
    scanf("%d %d %d", &n, &k, &m);

    long long arr[1005];
    for (int i = 0; i < n; i++) scanf("%lld", &arr[i]);

    qsort(arr, n, sizeof(long long), cmp_asc_ll);

    long long total = 0;

    // smallest m (indices 0..m-1)
    for (int i = 0; i < m; i++) {
        printf("%lld ", arr[i]);
        total += arr[i];
    }
    // largest k (indices n-k..n-1)
    for (int i = n - k; i < n; i++) {
        printf("%lld ", arr[i]);
        total += arr[i];
    }
    printf("\n%lld\n", total);

    return 0;
}