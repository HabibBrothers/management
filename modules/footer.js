import d from "../assets/js/NTechDOM.js";

const footer = d.createElement("div").setAttribute({ class: "footer" });

const home = d.createElement(
  "div",
  d.createElement(
    "svg",
    `
<g fill="#870000">
<path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391
  v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158
  c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747
  c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
<path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401
  c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79
  c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
</g>`,
    {
      viewBox: "0 0 495.398 495.398",
    }
  ),
  { class: "item" }
);

const analysis = d.createElement(
  "div",
  d.createElement(
    "svg",
    `
<g>
  <path d="M495.026,173.549c-5.137-2.336-11.188-1.435-15.438,2.285L278.777,351.87c-22.73,19.922-56.828,19.431-78.979-1.137
    l-67.47-62.662c-5.424-5.054-13.811-5.144-19.364-0.226L17.05,372.941c-5.424,4.814-8.53,11.722-8.53,18.972v48.82
    c0,7.952,6.437,14.399,14.389,14.399h466.179c7.952,0,14.394-6.447,14.394-14.399V186.668
    C503.48,181.016,500.177,175.882,495.026,173.549z"/>
  <path d="M34.244,266.348l60.4-49.665c9.61,7.52,21.556,12.188,34.707,12.188c12.815,0,24.501-4.429,33.999-11.607l25.228,24.977
    c-1.547,5.159-2.622,10.52-2.622,16.188c0,31.254,25.339,56.593,56.599,56.593c31.265,0,56.604-25.339,56.604-56.593
    c0-5.684-1.094-11.068-2.658-16.244l99.81-81.716c9.176,6.367,20.27,10.15,32.277,10.15c31.359,0,56.878-25.517,56.878-56.875
    c0-31.359-25.519-56.875-56.878-56.875c-31.358,0-56.872,25.516-56.872,56.875c0,7.961,1.672,15.536,4.647,22.416l-97.102,79.496
    c-9.92-8.51-22.637-13.838-36.707-13.838c-13.828,0-26.303,5.144-36.142,13.369l-24.065-23.641
    c2.205-6.035,3.608-12.468,3.608-19.27c0-31.271-25.34-56.61-56.604-56.61s-56.604,25.339-56.604,56.61
    c0,6.649,1.354,12.928,3.447,18.851l-61.947,50.945c-6.696,5.52-7.66,15.431-2.156,22.134
    C17.628,270.901,27.512,271.861,34.244,266.348z M428.588,88.307c14.021,0,25.438,11.405,25.438,25.436
    c0,14.021-11.416,25.426-25.438,25.426c-14.021,0-25.433-11.405-25.433-25.426C403.155,99.712,414.567,88.307,428.588,88.307z
      M242.555,233.032c14.008,0,25.371,11.365,25.371,25.386c0,14.021-11.363,25.387-25.371,25.387
    c-14.039,0-25.401-11.365-25.401-25.387C217.153,244.397,228.516,233.032,242.555,233.032z M129.352,146.88
    c14.008,0,25.371,11.365,25.371,25.389c0,14.021-11.363,25.387-25.371,25.387c-14.038,0-25.401-11.365-25.401-25.387
    C103.95,158.245,115.313,146.88,129.352,146.88z"/>
  </g>`,
    {
      viewBox: "0 0 495.398 495.398",
    }
  ),
  { class: "item" }
);

const tool = d.createElement(
  "div",
  d.createElement(
    "svg",
    `<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none">
<path d="M800 5105 c-365 -73 -668 -356 -772 -720 l-23 -80 -3 -1898 c-3
-2109 -8 -1947 65 -2091 47 -93 152 -199 248 -248 135 -70 109 -68 939 -68
l746 0 0 200 0 199 -722 3 c-684 3 -725 4 -758 22 -49 26 -69 45 -94 91 l-21
40 -3 1683 -2 1682 400 0 400 0 0 400 0 401 1083 -3 1082 -3 40 -21 c46 -25
65 -45 91 -94 17 -32 19 -65 22 -357 l3 -323 200 0 199 0 0 346 c0 386 -3 411
-67 538 -48 96 -153 201 -249 249 -141 71 -52 67 -1465 66 -1007 -1 -1288 -4
-1339 -14z m-3 -782 c-2 -2 -84 -2 -181 -1 l-177 3 33 65 c44 88 170 214 258
258 l65 33 3 -177 c1 -97 1 -179 -1 -181z"/>
<path d="M2755 3581 c-205 -60 -367 -225 -420 -428 -13 -49 -15 -238 -15
-1351 0 -1436 -4 -1345 67 -1486 47 -93 152 -199 248 -248 136 -71 93 -68
1085 -68 990 0 945 -3 1084 67 96 48 201 153 249 249 71 141 67 50 67 1484 0
1434 4 1343 -67 1484 -48 96 -153 201 -249 249 -139 70 -93 67 -1090 66 -826
0 -904 -2 -959 -18z m1850 -407 c46 -25 65 -45 91 -94 18 -34 19 -83 19 -1280
l0 -1245 -21 -40 c-25 -46 -45 -65 -94 -91 -33 -18 -74 -19 -880 -19 -806 0
-847 1 -880 19 -49 26 -69 45 -94 91 l-21 40 0 1245 c0 1197 1 1246 19 1280
35 66 75 96 146 111 19 4 404 6 855 6 818 -2 820 -2 860 -23z"/>
<path d="M3120 2600 l0 -200 600 0 600 0 0 200 0 200 -600 0 -600 0 0 -200z"/>
<path d="M3213 1974 c-62 -37 -93 -95 -93 -174 0 -123 77 -200 200 -200 123 0
200 77 200 200 0 123 -77 200 -201 200 -51 0 -73 -5 -106 -26z"/>
<path d="M4013 1974 c-62 -37 -93 -95 -93 -174 0 -123 77 -200 200 -200 123 0
200 77 200 200 0 123 -77 200 -201 200 -51 0 -73 -5 -106 -26z"/>
<path d="M3213 1174 c-62 -37 -93 -95 -93 -174 0 -123 77 -200 200 -200 123 0
200 77 200 200 0 123 -77 200 -201 200 -51 0 -73 -5 -106 -26z"/>
<path d="M4013 1174 c-62 -37 -93 -95 -93 -174 0 -123 77 -200 200 -200 123 0
200 77 200 200 0 123 -77 200 -201 200 -51 0 -73 -5 -106 -26z"/>
<path d="M800 2960 l0 -200 600 0 600 0 0 200 0 200 -600 0 -600 0 0 -200z"/>
<path d="M800 2160 l0 -200 600 0 600 0 0 200 0 200 -600 0 -600 0 0 -200z"/>
<path d="M800 1360 l0 -200 600 0 600 0 0 200 0 200 -600 0 -600 0 0 -200z"/>
</g>`,
    {
      viewBox: "0 0 512.000000 512.000000",
    }
  ),
  { class: "item" }
);

const about = d.createElement(
  "div",
  d.createElement(
    "svg",
    `
<path d="M37,40H11l-6,6V12c0-3.3,2.7-6,6-6h26c3.3,0,6,2.7,6,6v22C43,37.3,40.3,40,37,40z"/>
<g fill="#fff">
    <rect x="22" y="20" width="4" height="11"/>
    <circle cx="24" cy="15" r="2"/>
</g>`,
    {
      viewBox: "0 0 48 48",
    }
  ),
  { class: "item" }
);

footer.append(home, analysis, tool, about);
export { footer };
