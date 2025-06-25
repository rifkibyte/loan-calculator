This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


promt
Buatkan sebuah perhitungan
KPR lengkap seperti ini spek nya ikuti refernsi

Simulasi Kredit Rumah
Kalkulator kredit rumah dengan perhitungan yang lengkap.


* Hasil simulasi ada di bawah.
Simulasi KPR Lengkap
Harga Rumah	:	
500000000
 rupiahmasukkan angka, tidak boleh pakai koma atau titik
Rp 500.000.000,00
Tenor
(jangka waktu)
:	
10
 tahunmasukkan angka, tidak boleh pakai koma atau titik
= 120 bulan
Bunga Pinjaman	:	
14.6
 % / tahunmasukkan angka, misal 6.5
= 1.22 % / bulan
Uang Muka
(DP)
:	
20
 %
(persen dari harga rumah)
Biaya Bank
Biaya Provisi	:	
1.5
 %
(persen dari plafon)
Biaya Appraisal	:	
500000
 rupiahmasukkan angka, tidak boleh pakai koma atau titik
Rp 500.000,00
Biaya Administrasi	:	
450000
 rupiahmasukkan angka, tidak boleh pakai koma atau titik
Rp 450.000,00
Biaya Lain
Biaya Notaris	:	
12000000
 rupiahmasukkan angka, tidak boleh pakai koma atau titik
Rp 12.000.000,00
Biaya Asuransi	:	
7500000
 rupiahmasukkan angka, tidak boleh pakai koma atau titik
Rp 7.500.000,00
Pajak
NJOPTKP/NPTKP*:	:	
60000000
 rupiahmasukkan angka, tidak boleh pakai koma atau titik
Rp 60.000.000,00
*Nilai yang tidak kena pajak; tiap daerah berbeda dan berubah sejalan waktu; contoh untuk DKI Rp 60juta, Bekasi & Tangerang Rp 30juta, Depok Rp 20juta
print

Data Pinjaman Anda
Harga Rumah	:	Rp 500.000.000,00
Uang Muka
(DP)
:	Rp 100.000.000,00
(20 %)
Tenor	:	10 tahun
(120 bulan)
Bunga	:	14.6 % / tahun
(1.22 % / bulan)
Perhitungan Bunga	:	Anuitas

KPR Anda
Plafon Pinjaman
(Harga Rumah - Uang Muka)
:	Rp 400.000.000,00
Angsuran per Periode	:	Rp 6.355.768,43
Total Periode	:	120 bulan

Biaya & Pajak
Biaya Provisi
(1.5 % plafon)
:	
Rp 6.000.000,00
Biaya Appraisal	:	
Rp 500.000,00
Biaya Administrasi	:	
Rp 450.000,00
Biaya Notaris	:	
Rp 12.000.000,00
Biaya Asuransi	:	
Rp 7.500.000,00
Pajak Pembeli / BPHTB
(5% x (Harga Jual - NJOPTKP/NPTKP))
:	
Rp 22.000.000,00
________________ (+)
Total Biaya & Pajak	:	
Rp 48.450.000,00

Pembayaran Pertama Kali
Uang Muka	:	
Rp 100.000.000,00
Biaya dan Pajak	:	
Rp 48.450.000,00
________________ (+)
Total Pembayaran Pertama	:	
Rp 148.450.000,00

Tabel Angsuran
Bulan	Angsuran Bunga	Angsuran Pokok	Total Angsuran	Sisa pinjaman
0	0	0	0	Rp 400.000.000,00
1	Rp 4.866.666,67	Rp 1.489.101,76	Rp 6.355.768,43	Rp 398.510.898,24
2	Rp 4.848.549,26	Rp 1.507.219,16	Rp 6.355.768,43	Rp 397.003.679,08
3	Rp 4.830.211,43	Rp 1.525.557,00	Rp 6.355.768,43	Rp 395.478.122,08
4	Rp 4.811.650,49	Rp 1.544.117,94	Rp 6.355.768,43	Rp 393.934.004,14
5	Rp 4.792.863,72	Rp 1.562.904,71	Rp 6.355.768,43	Rp 392.371.099,43
6	Rp 4.773.848,38	Rp 1.581.920,05	Rp 6.355.768,43	Rp 390.789.179,39
7	Rp 4.754.601,68	Rp 1.601.166,74	Rp 6.355.768,43	Rp 389.188.012,64
8	Rp 4.735.120,82	Rp 1.620.647,60	Rp 6.355.768,43	Rp 387.567.365,04
9	Rp 4.715.402,94	Rp 1.640.365,48	Rp 6.355.768,43	Rp 385.926.999,56
10	Rp 4.695.445,16	Rp 1.660.323,26	Rp 6.355.768,43	Rp 384.266.676,29
11	Rp 4.675.244,56	Rp 1.680.523,86	Rp 6.355.768,43	Rp 382.586.152,43
12	Rp 4.654.798,19	Rp 1.700.970,24	Rp 6.355.768,43	Rp 380.885.182,19
13	Rp 4.634.103,05	Rp 1.721.665,38	Rp 6.355.768,43	Rp 379.163.516,82
14	Rp 4.613.156,12	Rp 1.742.612,30	Rp 6.355.768,43	Rp 377.420.904,51
15	Rp 4.591.954,34	Rp 1.763.814,09	Rp 6.355.768,43	Rp 375.657.090,42
16	Rp 4.570.494,60	Rp 1.785.273,82	Rp 6.355.768,43	Rp 373.871.816,60
17	Rp 4.548.773,77	Rp 1.806.994,66	Rp 6.355.768,43	Rp 372.064.821,94
18	Rp 4.526.788,67	Rp 1.828.979,76	Rp 6.355.768,43	Rp 370.235.842,19
19	Rp 4.504.536,08	Rp 1.851.232,35	Rp 6.355.768,43	Rp 368.384.609,84
20	Rp 4.482.012,75	Rp 1.873.755,67	Rp 6.355.768,43	Rp 366.510.854,17
21	Rp 4.459.215,39	Rp 1.896.553,03	Rp 6.355.768,43	Rp 364.614.301,14
22	Rp 4.436.140,66	Rp 1.919.627,76	Rp 6.355.768,43	Rp 362.694.673,37
23	Rp 4.412.785,19	Rp 1.942.983,23	Rp 6.355.768,43	Rp 360.751.690,14
24	Rp 4.389.145,56	Rp 1.966.622,86	Rp 6.355.768,43	Rp 358.785.067,28
25	Rp 4.365.218,32	Rp 1.990.550,11	Rp 6.355.768,43	Rp 356.794.517,17
26	Rp 4.340.999,96	Rp 2.014.768,47	Rp 6.355.768,43	Rp 354.779.748,71
27	Rp 4.316.486,94	Rp 2.039.281,48	Rp 6.355.768,43	Rp 352.740.467,23
28	Rp 4.291.675,68	Rp 2.064.092,74	Rp 6.355.768,43	Rp 350.676.374,48
29	Rp 4.266.562,56	Rp 2.089.205,87	Rp 6.355.768,43	Rp 348.587.168,62
30	Rp 4.241.143,88	Rp 2.114.624,54	Rp 6.355.768,43	Rp 346.472.544,08
31	Rp 4.215.415,95	Rp 2.140.352,47	Rp 6.355.768,43	Rp 344.332.191,60
32	Rp 4.189.375,00	Rp 2.166.393,43	Rp 6.355.768,43	Rp 342.165.798,18
33	Rp 4.163.017,21	Rp 2.192.751,21	Rp 6.355.768,43	Rp 339.973.046,96
34	Rp 4.136.338,74	Rp 2.219.429,69	Rp 6.355.768,43	Rp 337.753.617,28
35	Rp 4.109.335,68	Rp 2.246.432,75	Rp 6.355.768,43	Rp 335.507.184,53
36	Rp 4.082.004,08	Rp 2.273.764,35	Rp 6.355.768,43	Rp 333.233.420,18
37	Rp 4.054.339,95	Rp 2.301.428,48	Rp 6.355.768,43	Rp 330.931.991,70
38	Rp 4.026.339,23	Rp 2.329.429,19	Rp 6.355.768,43	Rp 328.602.562,51
39	Rp 3.997.997,84	Rp 2.357.770,58	Rp 6.355.768,43	Rp 326.244.791,93
40	Rp 3.969.311,64	Rp 2.386.456,79	Rp 6.355.768,43	Rp 323.858.335,14
41	Rp 3.940.276,41	Rp 2.415.492,01	Rp 6.355.768,43	Rp 321.442.843,12
42	Rp 3.910.887,92	Rp 2.444.880,50	Rp 6.355.768,43	Rp 318.997.962,62
43	Rp 3.881.141,88	Rp 2.474.626,55	Rp 6.355.768,43	Rp 316.523.336,08
44	Rp 3.851.033,92	Rp 2.504.734,50	Rp 6.355.768,43	Rp 314.018.601,57
45	Rp 3.820.559,65	Rp 2.535.208,77	Rp 6.355.768,43	Rp 311.483.392,80
46	Rp 3.789.714,61	Rp 2.566.053,81	Rp 6.355.768,43	Rp 308.917.338,99
47	Rp 3.758.494,29	Rp 2.597.274,13	Rp 6.355.768,43	Rp 306.320.064,85
48	Rp 3.726.894,12	Rp 2.628.874,30	Rp 6.355.768,43	Rp 303.691.190,55
49	Rp 3.694.909,49	Rp 2.660.858,94	Rp 6.355.768,43	Rp 301.030.331,61
50	Rp 3.662.535,70	Rp 2.693.232,72	Rp 6.355.768,43	Rp 298.337.098,89
51	Rp 3.629.768,04	Rp 2.726.000,39	Rp 6.355.768,43	Rp 295.611.098,50
52	Rp 3.596.601,70	Rp 2.759.166,73	Rp 6.355.768,43	Rp 292.851.931,77
53	Rp 3.563.031,84	Rp 2.792.736,59	Rp 6.355.768,43	Rp 290.059.195,18
54	Rp 3.529.053,54	Rp 2.826.714,88	Rp 6.355.768,43	Rp 287.232.480,30
55	Rp 3.494.661,84	Rp 2.861.106,58	Rp 6.355.768,43	Rp 284.371.373,72
56	Rp 3.459.851,71	Rp 2.895.916,71	Rp 6.355.768,43	Rp 281.475.457,01
57	Rp 3.424.618,06	Rp 2.931.150,36	Rp 6.355.768,43	Rp 278.544.306,64
58	Rp 3.388.955,73	Rp 2.966.812,69	Rp 6.355.768,43	Rp 275.577.493,95
59	Rp 3.352.859,51	Rp 3.002.908,92	Rp 6.355.768,43	Rp 272.574.585,03
60	Rp 3.316.324,12	Rp 3.039.444,31	Rp 6.355.768,43	Rp 269.535.140,73
61	Rp 3.279.344,21	Rp 3.076.424,21	Rp 6.355.768,43	Rp 266.458.716,51
62	Rp 3.241.914,38	Rp 3.113.854,04	Rp 6.355.768,43	Rp 263.344.862,47
63	Rp 3.204.029,16	Rp 3.151.739,26	Rp 6.355.768,43	Rp 260.193.123,21
64	Rp 3.165.683,00	Rp 3.190.085,43	Rp 6.355.768,43	Rp 257.003.037,78
65	Rp 3.126.870,29	Rp 3.228.898,13	Rp 6.355.768,43	Rp 253.774.139,65
66	Rp 3.087.585,37	Rp 3.268.183,06	Rp 6.355.768,43	Rp 250.505.956,59
67	Rp 3.047.822,47	Rp 3.307.945,95	Rp 6.355.768,43	Rp 247.198.010,64
68	Rp 3.007.575,80	Rp 3.348.192,63	Rp 6.355.768,43	Rp 243.849.818,01
69	Rp 2.966.839,45	Rp 3.388.928,97	Rp 6.355.768,43	Rp 240.460.889,03
70	Rp 2.925.607,48	Rp 3.430.160,94	Rp 6.355.768,43	Rp 237.030.728,09
71	Rp 2.883.873,86	Rp 3.471.894,57	Rp 6.355.768,43	Rp 233.558.833,53
72	Rp 2.841.632,47	Rp 3.514.135,95	Rp 6.355.768,43	Rp 230.044.697,58
73	Rp 2.798.877,15	Rp 3.556.891,27	Rp 6.355.768,43	Rp 226.487.806,30
74	Rp 2.755.601,64	Rp 3.600.166,78	Rp 6.355.768,43	Rp 222.887.639,52
75	Rp 2.711.799,61	Rp 3.643.968,81	Rp 6.355.768,43	Rp 219.243.670,71
76	Rp 2.667.464,66	Rp 3.688.303,76	Rp 6.355.768,43	Rp 215.555.366,95
77	Rp 2.622.590,30	Rp 3.733.178,13	Rp 6.355.768,43	Rp 211.822.188,82
78	Rp 2.577.169,96	Rp 3.778.598,46	Rp 6.355.768,43	Rp 208.043.590,36
79	Rp 2.531.197,02	Rp 3.824.571,41	Rp 6.355.768,43	Rp 204.219.018,95
80	Rp 2.484.664,73	Rp 3.871.103,69	Rp 6.355.768,43	Rp 200.347.915,26
81	Rp 2.437.566,30	Rp 3.918.202,12	Rp 6.355.768,43	Rp 196.429.713,13
82	Rp 2.389.894,84	Rp 3.965.873,58	Rp 6.355.768,43	Rp 192.463.839,55
83	Rp 2.341.643,38	Rp 4.014.125,04	Rp 6.355.768,43	Rp 188.449.714,51
84	Rp 2.292.804,86	Rp 4.062.963,57	Rp 6.355.768,43	Rp 184.386.750,94
85	Rp 2.243.372,14	Rp 4.112.396,29	Rp 6.355.768,43	Rp 180.274.354,65
86	Rp 2.193.337,98	Rp 4.162.430,44	Rp 6.355.768,43	Rp 176.111.924,21
87	Rp 2.142.695,08	Rp 4.213.073,35	Rp 6.355.768,43	Rp 171.898.850,86
88	Rp 2.091.436,02	Rp 4.264.332,41	Rp 6.355.768,43	Rp 167.634.518,46
89	Rp 2.039.553,31	Rp 4.316.215,12	Rp 6.355.768,43	Rp 163.318.303,34
90	Rp 1.987.039,36	Rp 4.368.729,07	Rp 6.355.768,43	Rp 158.949.574,27
91	Rp 1.933.886,49	Rp 4.421.881,94	Rp 6.355.768,43	Rp 154.527.692,33
92	Rp 1.880.086,92	Rp 4.475.681,50	Rp 6.355.768,43	Rp 150.052.010,83
93	Rp 1.825.632,80	Rp 4.530.135,63	Rp 6.355.768,43	Rp 145.521.875,21
94	Rp 1.770.516,15	Rp 4.585.252,28	Rp 6.355.768,43	Rp 140.936.622,93
95	Rp 1.714.728,91	Rp 4.641.039,51	Rp 6.355.768,43	Rp 136.295.583,42
96	Rp 1.658.262,93	Rp 4.697.505,49	Rp 6.355.768,43	Rp 131.598.077,92
97	Rp 1.601.109,95	Rp 4.754.658,48	Rp 6.355.768,43	Rp 126.843.419,45
98	Rp 1.543.261,60	Rp 4.812.506,82	Rp 6.355.768,43	Rp 122.030.912,62
99	Rp 1.484.709,44	Rp 4.871.058,99	Rp 6.355.768,43	Rp 117.159.853,64
100	Rp 1.425.444,89	Rp 4.930.323,54	Rp 6.355.768,43	Rp 112.229.530,10
101	Rp 1.365.459,28	Rp 4.990.309,14	Rp 6.355.768,43	Rp 107.239.220,95
102	Rp 1.304.743,85	Rp 5.051.024,57	Rp 6.355.768,43	Rp 102.188.196,38
103	Rp 1.243.289,72	Rp 5.112.478,70	Rp 6.355.768,43	Rp 97.075.717,68
104	Rp 1.181.087,90	Rp 5.174.680,53	Rp 6.355.768,43	Rp 91.901.037,15
105	Rp 1.118.129,29	Rp 5.237.639,14	Rp 6.355.768,43	Rp 86.663.398,01
106	Rp 1.054.404,68	Rp 5.301.363,75	Rp 6.355.768,43	Rp 81.362.034,27
107	Rp 989.904,75	Rp 5.365.863,67	Rp 6.355.768,43	Rp 75.996.170,59
108	Rp 924.620,08	Rp 5.431.148,35	Rp 6.355.768,43	Rp 70.565.022,24
109	Rp 858.541,10	Rp 5.497.227,32	Rp 6.355.768,43	Rp 65.067.794,92
110	Rp 791.658,17	Rp 5.564.110,25	Rp 6.355.768,43	Rp 59.503.684,67
111	Rp 723.961,50	Rp 5.631.806,93	Rp 6.355.768,43	Rp 53.871.877,74
112	Rp 655.441,18	Rp 5.700.327,25	Rp 6.355.768,43	Rp 48.171.550,49
113	Rp 586.087,20	Rp 5.769.681,23	Rp 6.355.768,43	Rp 42.401.869,27
114	Rp 515.889,41	Rp 5.839.879,02	Rp 6.355.768,43	Rp 36.561.990,25
115	Rp 444.837,55	Rp 5.910.930,88	Rp 6.355.768,43	Rp 30.651.059,37
116	Rp 372.921,22	Rp 5.982.847,20	Rp 6.355.768,43	Rp 24.668.212,17
117	Rp 300.129,91	Rp 6.055.638,51	Rp 6.355.768,43	Rp 18.612.573,66
118	Rp 226.452,98	Rp 6.129.315,45	Rp 6.355.768,43	Rp 12.483.258,21
119	Rp 151.879,64	Rp 6.203.888,78	Rp 6.355.768,43	Rp 6.279.369,43
120	Rp 76.398,99	Rp 6.279.369,43	Rp 6.355.768,43	Rp 0,00
Total	Rp 362.692.211,01	Rp 400.000.000,00	Rp 762.692.211,01	 




Referensi

types/common.ts
export interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface CommonLoanResult {
  loanAmount: number;
  monthlyPayment?: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment?: number;
  totalInterest?: number;
  amortizationSchedule: AmortizationItem[];
}

types/car-loan.ts
import { AmortizationItem, CommonLoanResult } from './common';

// Car Loan Budget Types
export interface CarLoanBudgetResult extends CommonLoanResult {
  carPrice: number;
  downPaymentAmount: number;
  firstPayment: number;
}

// Car Loan Complete Types
export interface CarLoanCompleteResult extends CommonLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  insuranceAmount: number;
  provisionAmount: number;
  policyFee: number;
  adminFee: number;
  firstPayment: number;
}

// Car Loan Simple Types
export interface CarLoanSimpleResult extends CommonLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  firstPayment: number;
}

list directory
── src
│   ├── app
│   │   ├── (calculators)
│   │   │   ├── car-loan
│   │   │   │   ├── budget
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── complete
│   │   │   │   │   └── page.tsx
│   │   │   │   └── simple
│   │   │   │       └── page.tsx
│   │   │   ├── mortgage
│   │   │   │   ├── budget
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── complete
│   │   │   │   │   └── page.tsx
│   │   │   │   └── house-price
│   │   │   │       └── page.tsx
│   │   │   └── personal-loan
│   │   │       ├── amount
│   │   │       │   └── page.tsx
│   │   │       └── budget
│   │   │           └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── car-loan
│   │   │   ├── budget
│   │   │   │   ├── CarLoanBudgetForm.tsx
│   │   │   │   ├── CarLoanBudgetResult.tsx
│   │   │   │   ├── CarLoanBudgetSchedule.tsx
│   │   │   │   └── index.ts
│   │   │   ├── complete
│   │   │   │   ├── CarLoanForm.tsx
│   │   │   │   ├── CarLoanResult.tsx
│   │   │   │   ├── CarLoanSchedule.tsx
│   │   │   │   └── index.ts
│   │   │   └── simple
│   │   │       ├── CarLoanSimpleForm.tsx
│   │   │       ├── CarLoanSimpleResult.tsx
│   │   │       ├── CarLoanSimpleSchedule.tsx
│   │   │       └── index.ts
│   │   ├── common
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── index.ts
│   │   ├── mortgage
│   │   │   ├── budget
│   │   │   │   ├── MortgageBudgetForm.tsx
│   │   │   │   ├── MortgageBudgetResult.tsx
│   │   │   │   ├── MortgageBudgetSchedule.tsx
│   │   │   │   └── index.ts
│   │   │   ├── complete
│   │   │   │   ├── MortgageCompleteForm.tsx
│   │   │   │   ├── MortgageCompleteResult.tsx
│   │   │   │   ├── MortgageCompleteSchedule.tsx
│   │   │   │   └── index.ts
│   │   │   └── house-price
│   │   │       ├── MortgageHousePriceForm.tsx
│   │   │       ├── MortgageHousePriceResult.tsx
│   │   │       ├── MortgageHousePriceSchedule.tsx
│   │   │       └── index.ts
│   │   └── personal-loan
│   │       ├── amount
│   │       │   ├── PersonalLoanAmountForm.tsx
│   │       │   ├── PersonalLoanAmountResult.tsx
│   │       │   ├── PersonalLoanAmountSchedule.tsx
│   │       │   └── index.ts
│   │       └── budget
│   │           ├── PersonalLoanForm.tsx
│   │           ├── PersonalLoanResult.tsx
│   │           ├── PersonalLoanSchedule.tsx
│   │           └── index.ts
│   ├── types
│   │   ├── car-loan.ts
│   │   ├── common.ts
│   │   ├── mortgage-budget.ts
│   │   ├── mortgage-house-price.ts
│   │   ├── mortgage.ts
│   │   ├── personal-loan-amount.ts
│   │   └── personal-loan.ts
│   └── utils
│       ├── calculators
│       │   ├── car-loan
│       │   │   ├── budgetCalculator.ts
│       │   │   ├── completeCalculator.ts
│       │   │   └── simpleCalculator.ts
│       │   ├── mortgage
│       │   │   ├── budgetCalculator.ts
│       │   │   ├── housePriceCalculator.ts
│       │   │   └── mortgageCalculator.ts
│       │   └── personal-loan
│       │       ├── personalLoanAmountCalculator.ts
│       │       └── personalLoanCalculator.ts
│       ├── formatters.ts
│       └── index.ts
└── tsconfig.json



page.tsx
"use client";

import { useState } from "react";
import { CarLoanForm, CarLoanResult, CarLoanSchedule } from "@/components/car-loan/complete";
import { Header, Footer } from "@/components/common";
import { calculateLoan } from "@/utils/calculators/car-loan/completeCalculator";
import { AmortizationItem } from "@/types/common";
import { CarLoanCompleteResult as LoanDetails } from "@/types/car-loan";

// Interface for form data
interface FormData {
  carPrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
  insurancePercent: number;
  provisionPercent: number;
  policyFee: number;
  adminFee: number;
}

export default function CarLoanCompletePage(): JSX.Element {
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
  const [schedule, setSchedule] = useState<AmortizationItem[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle form calculation
  const handleCalculate = (formData: FormData): void => {
    const calculationResult = calculateLoan(
      formData.carPrice,
      formData.downPaymentPercent,
      formData.loanTerm,
      formData.interestRate,
      formData.insurancePercent,
      formData.provisionPercent,
      formData.policyFee,
      formData.adminFee
    );
    
    setLoanDetails({
      carPrice: formData.carPrice,
      downPaymentPercent: formData.downPaymentPercent,
      downPaymentAmount: formData.carPrice * (formData.downPaymentPercent / 100),
      loanTerm: formData.loanTerm,
      interestRate: formData.interestRate,
      monthlyInterestRate: formData.interestRate / 12,
      loanAmount: calculationResult.loanAmount,
      monthlyPayment: calculationResult.monthlyPayment,
      monthlyPrincipal: calculationResult.monthlyPrincipal,
      monthlyInterest: calculationResult.monthlyInterest,
      totalPayment: calculationResult.totalPayment,
      totalInterest: calculationResult.totalInterest,
      insurancePercent: formData.insurancePercent,
      insuranceAmount: calculationResult.insuranceAmount,
      provisionPercent: formData.provisionPercent,
      provisionAmount: calculationResult.provisionAmount,
      policyFee: formData.policyFee,
      adminFee: formData.adminFee,
      firstPayment: calculationResult.firstPayment,
      amortizationSchedule: calculationResult.amortizationSchedule
    });
    
    setSchedule(calculationResult.amortizationSchedule);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <div className="container mx-auto py-8 px-4 flex-grow">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Simulasi Kredit Mobil Lengkap
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <CarLoanForm onCalculate={handleCalculate} />
          </div>
          
          <div className="lg:col-span-2">
            {showResults && loanDetails && (
              <div className="space-y-6">
                <CarLoanResult loanDetails={loanDetails} />
                <CarLoanSchedule schedule={schedule} />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}



Form
"use client";

import { useState } from "react";

// Interface for form data
interface FormData {
  carPrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  interestRate: number;
  insurancePercent: number;
  provisionPercent: number;
  policyFee: number;
  adminFee: number;
}

// Interface for form validation errors
interface FormErrors {
  [key: string]: string;
}

// Interface for component props
interface LoanFormProps {
  onCalculate: (formData: FormData) => void;
}

export default function LoanForm({ onCalculate }: LoanFormProps): JSX.Element {
  // Form state variables
  const [carPrice, setCarPrice] = useState<string>("250000000");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("30");
  const [loanTerm, setLoanTerm] = useState<string>("5");
  const [interestRate, setInterestRate] = useState<string>("4.8");
  const [insurancePercent, setInsurancePercent] = useState<string>("5");
  const [provisionPercent, setProvisionPercent] = useState<string>("0.5");
  const [policyFee, setPolicyFee] = useState<string>("40000");
  const [adminFee, setAdminFee] = useState<string>("700000");
  const [errors, setErrors] = useState<FormErrors>({});

  // Derived values for display
  const loanTermMonths: number = Number(loanTerm) * 12;
  const monthlyInterestRate: number = Number(interestRate) / 12;

  /**
   * Validate form inputs
   * @returns boolean indicating if form is valid
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!carPrice || isNaN(Number(carPrice)) || Number(carPrice) <= 0) {
      newErrors.carPrice = "Harga mobil harus berupa angka positif";
    }

    if (
      !downPaymentPercent ||
      isNaN(Number(downPaymentPercent)) ||
      Number(downPaymentPercent) <= 0 ||
      Number(downPaymentPercent) >= 100
    ) {
      newErrors.downPaymentPercent =
        "Persentase uang muka harus antara 0 dan 100";
    }

    if (
      !loanTerm ||
      isNaN(Number(loanTerm)) ||
      Number(loanTerm) <= 0 ||
      !Number.isInteger(Number(loanTerm))
    ) {
      newErrors.loanTerm = "Tenor harus berupa bilangan bulat positif";
    }

    if (
      !interestRate ||
      isNaN(Number(interestRate)) ||
      Number(interestRate) < 0
    ) {
      newErrors.interestRate = "Suku bunga harus berupa angka positif atau nol";
    }

    if (
      !insurancePercent ||
      isNaN(Number(insurancePercent)) ||
      Number(insurancePercent) < 0
    ) {
      newErrors.insurancePercent =
        "Persentase asuransi harus berupa angka positif atau nol";
    }

    if (
      !provisionPercent ||
      isNaN(Number(provisionPercent)) ||
      Number(provisionPercent) < 0
    ) {
      newErrors.provisionPercent =
        "Persentase provisi harus berupa angka positif atau nol";
    }

    if (!policyFee || isNaN(Number(policyFee)) || Number(policyFee) < 0) {
      newErrors.policyFee =
        "Biaya polis asuransi harus berupa angka positif atau nol";
    }

    if (!adminFee || isNaN(Number(adminFee)) || Number(adminFee) < 0) {
      newErrors.adminFee =
        "Biaya administrasi harus berupa angka positif atau nol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   * @param e - Form event
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate({
        carPrice: Number(carPrice),
        downPaymentPercent: Number(downPaymentPercent),
        loanTerm: Number(loanTerm),
        interestRate: Number(interestRate),
        insurancePercent: Number(insurancePercent),
        provisionPercent: Number(provisionPercent),
        policyFee: Number(policyFee),
        adminFee: Number(adminFee)
      });
    }
  };

  /**
   * Format input to remove non-numeric characters
   * @param value - Input value
   * @returns Formatted numeric string
   */
  const formatInputCurrency = (value: string): string => {
    // Remove non-numeric characters
    return value.replace(/[^\d]/g, "");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Car Price Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Harga Mobil OTR:
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">Rp</span>
          </div>
          <input
            type="text"
            value={carPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setCarPrice(formatInputCurrency(e.target.value))
            }
            className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="250000000"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">,00</span>
          </div>
        </div>
        {errors.carPrice && (
          <p className="mt-1 text-sm text-red-600">{errors.carPrice}</p>
        )}
      </div>

      {/* Down Payment Percentage Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Uang Muka (DP):
        </label>
        <div className="relative">
          <input
            type="text"
            value={downPaymentPercent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setDownPaymentPercent(e.target.value)
            }
            className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="30"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">%</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-900">(persen dari harga OTR)</p>
        {errors.downPaymentPercent && (
          <p className="mt-1 text-sm text-red-600">
            {errors.downPaymentPercent}
          </p>
        )}
      </div>

      {/* Loan Term Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Tenor (jangka waktu):
        </label>
        <div className="relative">
          <input
            type="text"
            value={loanTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setLoanTerm(e.target.value)
            }
            className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="5"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">tahun</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-900">= {loanTermMonths} bulan</p>
        {errors.loanTerm && (
          <p className="mt-1 text-sm text-red-600">{errors.loanTerm}</p>
        )}
      </div>

      {/* Interest Rate Input */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-1">
          Bunga Pinjaman (Flat):
        </label>
        <div className="relative">
          <input
            type="text"
            value={interestRate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setInterestRate(e.target.value)
            }
            className="w-full pr-14 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="4.8"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">% / tahun</span>
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-900">
          = {monthlyInterestRate.toFixed(2)}% / bulan
        </p>
        {errors.interestRate && (
          <p className="mt-1 text-sm text-red-600">{errors.interestRate}</p>
        )}
      </div>

      {/* Additional Fees Section */}
      <div className="border-t border-gray-200 pt-4">
        <h3 className="font-medium text-gray-900 mb-3">Biaya Lain</h3>

        <div className="space-y-4">
          {/* Insurance Percentage Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Asuransi:
            </label>
            <div className="relative">
              <input
                type="text"
                value={insurancePercent}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setInsurancePercent(e.target.value)
                }
                className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="5"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-900">
              (persen dari harga OTR)
            </p>
            {errors.insurancePercent && (
              <p className="mt-1 text-sm text-red-600">
                {errors.insurancePercent}
              </p>
            )}
          </div>

          {/* Provision Percentage Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Provisi:
            </label>
            <div className="relative">
              <input
                type="text"
                value={provisionPercent}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  setProvisionPercent(e.target.value)
                }
                className="w-full pr-8 pl-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.5"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">%</span>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-900">(persen dari plafon)</p>
            {errors.provisionPercent && (
              <p className="mt-1 text-sm text-red-600">
                {errors.provisionPercent}
              </p>
            )}
          </div>

          {/* Policy Fee Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Biaya Polis Asuransi:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">Rp</span>
              </div>
              <input
                type="text"
                value={policyFee}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPolicyFee(formatInputCurrency(e.target.value))
                }
                className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="40000"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">,00</span>
              </div>
            </div>
            {errors.policyFee && (
              <p className="mt-1 text-sm text-red-600">{errors.policyFee}</p>
            )}
          </div>

          {/* Admin Fee Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Biaya Administrasi:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">Rp</span>
              </div>
              <input
                type="text"
                value={adminFee}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setAdminFee(formatInputCurrency(e.target.value))
                }
                className="w-full pl-12 pr-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="700000"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 sm:text-sm">,00</span>
              </div>
            </div>
            {errors.adminFee && (
              <p className="mt-1 text-sm text-red-600">{errors.adminFee}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
      >
        Hitung Simulasi
      </button>
    </form>
  );
}


Result
"use client";

import { useState } from "react";
import { formatCurrency } from "@/utils/formatters";
import { jsPDF } from "jspdf";

interface LoanResultProps {
  loanDetails: {
    carPrice: number;
    downPaymentPercent: number;
    downPaymentAmount: number;
    loanTerm: number;
    interestRate: number;
    monthlyInterestRate: number;
    loanAmount: number;
    monthlyPayment: number;
    monthlyPrincipal: number;
    monthlyInterest: number;
    totalPayment: number;
    totalInterest: number;
    insurancePercent: number;
    insuranceAmount: number;
    provisionPercent: number;
    provisionAmount: number;
    policyFee: number;
    adminFee: number;
    firstPayment: number;
  };
}

export default function LoanResult({ loanDetails }: LoanResultProps) {
  const [activeTab, setActiveTab] = useState("info");

  // Helper function to safely format currency and handle NaN values
  const safeFormatCurrency = (value: number) => {
    if (isNaN(value) || !isFinite(value)) {
      return "Rp 0";
    }
    return formatCurrency(value);
  };

  // Helper function to safely format percentage
  const safeFormatPercent = (value: number) => {
    if (isNaN(value) || !isFinite(value)) {
      return "0";
    }
    return value.toString();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text("Simulasi Kredit Mobil", 105, 15, { align: "center" });
    
    // Add loan details
    doc.setFontSize(12);
    doc.text("Informasi Pinjaman", 14, 30);
    
    const loanInfo = [
      ["Harga Mobil OTR", safeFormatCurrency(loanDetails.carPrice)],
      ["Uang Muka (DP)", `${safeFormatCurrency(loanDetails.downPaymentAmount)} (${safeFormatPercent(loanDetails.downPaymentPercent)}%)`],
      ["Tenor", `${loanDetails.loanTerm} tahun (${loanDetails.loanTerm * 12} bulan)`],
      ["Bunga (Flat)", `${safeFormatPercent(loanDetails.interestRate)}% / tahun (${(loanDetails.interestRate / 12).toFixed(2)}% / bulan)`],
      ["Plafon Pinjaman", safeFormatCurrency(loanDetails.loanAmount)],
      ["Angsuran per Bulan", safeFormatCurrency(loanDetails.monthlyPayment)],
      ["Total Pembayaran", safeFormatCurrency(loanDetails.totalPayment)]
    ];
    
    (doc as any).autoTable({
      startY: 35,
      head: [["Keterangan", "Nilai"]],
      body: loanInfo,
      theme: "grid",
      headStyles: { fillColor: [66, 133, 244] }
    });
    
    doc.save("simulasi-kredit-mobil.pdf");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "info" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("info")}
        >
          Informasi Pinjaman
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "payment" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("payment")}
        >
          Pembayaran
        </button>
      </div>
        
      <div className="p-6">
        {activeTab === "info" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Pinjaman Anda</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Harga Mobil OTR:</p>
                <p className="text-lg font-bold text-gray-900">{safeFormatCurrency(loanDetails.carPrice)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Uang Muka (DP):</p>
                <p className="text-lg font-bold text-gray-900">
                  {safeFormatCurrency(loanDetails.downPaymentAmount)}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({safeFormatPercent(loanDetails.downPaymentPercent)}%)
                  </span>
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Tenor:</p>
                <p className="text-lg font-bold text-gray-900">
                  {loanDetails.loanTerm} tahun
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({loanDetails.loanTerm * 12} bulan)
                  </span>
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Bunga (Flat):</p>
                <p className="text-lg font-bold text-gray-900">
                  {safeFormatPercent(loanDetails.interestRate)}% / tahun
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    ({(loanDetails.interestRate / 12).toFixed(2)}% / bulan)
                  </span>
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Plafon Pinjaman Anda</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Harga Mobil OTR:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.carPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Uang Muka (DP):</span>
                  <span className="font-medium text-gray-900">- {safeFormatCurrency(loanDetails.downPaymentAmount)}</span>
                </div>
                <div className="border-t border-blue-200 my-2 pt-2 flex justify-between">
                  <span className="font-medium text-gray-900">Plafon Pinjaman Anda:</span>
                  <span className="font-bold text-blue-700">{safeFormatCurrency(loanDetails.loanAmount)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Biaya Lain</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">Asuransi:</span>
                    <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.insuranceAmount)}</span>
                  </div>
                  <p className="text-xs text-gray-500">({safeFormatPercent(loanDetails.insurancePercent)}% dari harga OTR)</p>
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <span className="text-gray-900">Provisi:</span>
                    <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.provisionAmount)}</span>
                  </div>
                  <p className="text-xs text-gray-500">({safeFormatPercent(loanDetails.provisionPercent)}% dari plafon)</p>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-900">Polis Asuransi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.policyFee)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-900">Administrasi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.adminFee)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "payment" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Pembayaran</h2>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Angsuran per Bulan</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Angsuran Pokok per Bulan:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.monthlyPrincipal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Angsuran Bunga per Bulan:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.monthlyInterest)}</span>
                </div>
                <div className="border-t border-green-200 my-2 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total Angsuran per Bulan:</span>
                    <span className="font-bold text-green-700">{safeFormatCurrency(loanDetails.monthlyPayment)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Pembayaran Pertama Kali</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Uang Muka (DP):</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.downPaymentAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Angsuran Pertama:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.monthlyPayment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Asuransi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.insuranceAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Provisi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.provisionAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Polis Asuransi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.policyFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Administrasi:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.adminFee)}</span>
                </div>
                <div className="border-t border-purple-200 my-2 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total Pembayaran Pertama:</span>
                    <span className="font-bold text-purple-700">{safeFormatCurrency(loanDetails.firstPayment)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Total Pembayaran</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-900">Total Pokok:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.loanAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900">Total Bunga:</span>
                  <span className="font-medium text-gray-900">{safeFormatCurrency(loanDetails.totalInterest)}</span>
                </div>
                <div className="border-t border-indigo-200 my-2 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">Total Pembayaran:</span>
                    <span className="font-bold text-indigo-700">{safeFormatCurrency(loanDetails.totalPayment)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6">
          <button
            onClick={handleExportPDF}
            className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
}



Schedule

"use client";

import { useState, useMemo } from "react";
import { formatCurrency } from "@/utils/formatters";

interface ScheduleItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

interface LoanScheduleProps {
  schedule: ScheduleItem[];
}

export default function LoanSchedule({ schedule }: LoanScheduleProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(schedule.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = schedule.slice(startIndex, startIndex + itemsPerPage);

    // Hitung total akumulasi
  const { totalInterest, totalPrincipal, totalPayment } = useMemo(() => {
    return schedule.reduce((acc, item) => ({
      totalInterest: acc.totalInterest + item.interest,
      totalPrincipal: acc.totalPrincipal + item.principal,
      totalPayment: acc.totalPayment + item.payment,
    }), {
      totalInterest: 0,
      totalPrincipal: 0,
      totalPayment: 0
    });
  }, [schedule]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Tabel Angsuran
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Bulan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Angsuran Bunga
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Angsuran Pokok
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Angsuran
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sisa Pinjaman
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr
                key={item.period}
                className={item.period % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {item.period}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(item.interest)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(item.principal)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
                  {formatCurrency(item.payment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(item.remainingBalance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-300"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === totalPages
                  ? "text-gray-300"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(startIndex + itemsPerPage, schedule.length)}
                </span>{" "}
                of <span className="font-medium">{schedule.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => goToPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                    currentPage === 1
                      ? "text-gray-300"
                      : "text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        currentPage === pageNum
                          ? "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    goToPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                    currentPage === totalPages
                      ? "text-gray-300"
                      : "text-gray-400 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
        <div>
          <p className="text-sm text-gray-600">Total Bunga:</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalInterest)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Pokok:</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalPrincipal)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Angsuran:</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalPayment)}
          </p>
        </div>
      </div>
    </div>
  );
}


import make easier
export { default as CarLoanForm } from './CarLoanForm';
export { default as CarLoanResult } from './CarLoanResult';
export { default as CarLoanSchedule } from './CarLoanSchedule';


car-LoanDetails.ts
export interface CarLoanCompleteResult extends CommonLoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  insuranceAmount: number;
  provisionAmount: number;
  policyFee: number;
  adminFee: number;
  firstPayment: number;
}


calculator
// Interface for amortization schedule item
interface AmortizationItem {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Interface for calculation result
interface CalculationResult {
  loanAmount: number;
  monthlyPayment: number;
  monthlyPrincipal: number;
  monthlyInterest: number;
  totalPayment: number;
  totalInterest: number;
  insuranceAmount: number;
  provisionAmount: number;
  policyFee: number;
  adminFee: number;
  firstPayment: number;
  amortizationSchedule: AmortizationItem[];
}

/**
 * Calculate loan details using flat rate method
 * @param carPrice - On The Road price of the car
 * @param downPaymentPercent - Down payment percentage
 * @param loanTermYears - Loan term in years
 * @param annualInterestRate - Annual interest rate percentage
 * @param insurancePercent - Insurance percentage
 * @param provisionPercent - Provision percentage
 * @param policyFee - Policy fee amount
 * @param adminFee - Administration fee amount
 * @returns Calculation result with all loan details
 */
export function calculateLoan(
  carPrice: number,
  downPaymentPercent: number,
  loanTermYears: number,
  annualInterestRate: number,
  insurancePercent: number,
  provisionPercent: number,
  policyFee: number,
  adminFee: number
): CalculationResult {
  // Calculate basic loan parameters
  const downPaymentAmount: number = carPrice * (downPaymentPercent / 100);
  const loanAmount: number = carPrice - downPaymentAmount;
  const loanTermMonths: number = loanTermYears * 12;
  
  // Calculate insurance and provision amounts
  const insuranceAmount: number = carPrice * (insurancePercent / 100);
  const provisionAmount: number = loanAmount * (provisionPercent / 100);
  
  // Calculate monthly payments using flat rate method
  const monthlyPrincipal: number = loanAmount / loanTermMonths;
  const monthlyInterest: number = loanAmount * (annualInterestRate / 100) / 12;
  const monthlyPayment: number = monthlyPrincipal + monthlyInterest;
  
  // Calculate totals
  const totalPayment: number = monthlyPayment * loanTermMonths;
  const totalInterest: number = monthlyInterest * loanTermMonths;
  
  // Calculate first payment (all upfront costs)
  const firstPayment: number = downPaymentAmount + monthlyPayment + insuranceAmount + provisionAmount + policyFee + adminFee;
  
  // Generate amortization schedule for flat rate
  const amortizationSchedule: AmortizationItem[] = [];
  let remainingBalance: number = loanAmount;
  
  for (let period: number = 1; period <= loanTermMonths; period++) {
    remainingBalance -= monthlyPrincipal;
    
    // Ensure the last payment eliminates any rounding errors
    const adjustedRemainingBalance: number = period === loanTermMonths ? 0 : remainingBalance;
    
    amortizationSchedule.push({
      period,
      payment: monthlyPayment,
      principal: monthlyPrincipal,
      interest: monthlyInterest,
      remainingBalance: adjustedRemainingBalance
    });
  }
  
  return {
    loanAmount,
    monthlyPayment,
    monthlyPrincipal,
    monthlyInterest,
    totalPayment,
    totalInterest,
    insuranceAmount,
    provisionAmount,
    policyFee,
    adminFee,
    firstPayment,
    amortizationSchedule
  };
}
