#include <stdio.h>

int main() {
    int n, x;
    scanf("%d", &n);
    int arr[10005];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    scanf("%d", &x);

    int found = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == x) { found = 1; break; }
    }

    printf("%s\n", found ? "YES" : "NO");
    return 0;
}