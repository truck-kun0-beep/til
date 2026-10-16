#include<stdio.h>
#include<stdlib.h>

int cmp(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int main() {
    int n;
    while(scanf("%d", &n)==2 || scanf("%d", &n)==1)
}