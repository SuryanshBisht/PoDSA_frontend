import numpy as np

BIBC = np.array(
    [
    [1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 1],
    [0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, -1],
    [0, 0, 0, 0, 0, 1],
    ]
)

BCBV = np.array(
    [
    [0.279 + 0.015j, 0             , 0             ,              0, 0, 0],
    [0.279 + 0.015j, 0.444 + 0.439j, 0             ,              0, 0, 0],
    [0.279 + 0.015j, 0.444 + 0.439j, 0.864 + 0.751j,              0, 0, 0],
    [0.279 + 0.015j, 0.444 + 0.439j, 0.864 + 0.751j, 0.864 + 0.751j, 0, 0],
    [0.279 + 0.015j, 0.444 + 0.439j, 0,           0, 1.374 + 0.774j, 0],
    [0, 0, 0.864 + 0.751j, 0.864 + 0.751j, -1.374 + 0.774j, 0.896 + 0.155j]
    ]
)
l = 1
n = len(BCBV)

DCF = np.vdot(BCBV, BIBC)
A = np.array([])
B = np.array([])
C = np.array([])
D = np.array([])

for i in range(n):
    if i < n - l:
        A.append(DCF[0: n - l])
        B.append(DCF[n - l + 1: n - 1])
    else:
        C.append(DCF[0: n - l])
        D.append(DCF[n - l + 1: n - 1])
    

print(DCF)
print(A)
print(B)
print(C)
print(D)

