#include<stdio.h>

int g[100005];
int n;

int works(long long k) {
    long long cur = k;
    for(int i=0; i<n;i++) {
        if(g[i]>cur) return 0;
        if(g[i] == cur) cur--;
    }
    return 1;
}

int main() {
    int t;
    scanf("%d", &t);

    for(int i=0; i<=t;i++) {
        scanf("%d", &n);

        long long prev=0, maxGap=0;

        for(int j=0; j<n;j++) {
            long long r;
            scanf("%lld", &r);
            g[i] = (int)(r-prev);
            if(g[i]>maxGap) {
                maxGap = g[i];
            }
            prev = r;
        }

        long long lo = maxGap, hi = maxGap + n;
        while(lo<hi) {
            long long mid= lo+ (hi-lo) / 2;
            if(works(mid)) hi = mid;
            else lo = mid -1;
        }

        printf("Case %d: %lld\n", i, lo);
    }
    return 0;
}
