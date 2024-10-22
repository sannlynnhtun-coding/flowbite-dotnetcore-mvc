# Flowbite with ASP.NET Core MVC (.NET 8)

### 1. **Install Flowbite and Tailwind CSS**

Flowbite is built on top of Tailwind CSS, so you’ll need to install both Tailwind and Flowbite into your project. Follow these steps:

- First, install the necessary dependencies by initializing your project with Node.js. If you haven't already, install `npm` from [Node.js](https://nodejs.org/).

- In your ASP.NET Core MVC project directory, run the following commands:

```bash
npm init -y
npm install tailwindcss flowbite
```

### 2. **Configure Tailwind CSS**

Create a `tailwind.config.js` file in your project’s root directory and configure it to include Flowbite:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './Views/**/*.cshtml',
    './Pages/**/*.cshtml',
    './Shared/**/*.cshtml',
    './**/*.html',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
```

### 3. **Set Up Tailwind in Your ASP.NET Core App**

Create a `styles.css` file in the `wwwroot/css/` folder of your ASP.NET Core app and include the Tailwind and Flowbite imports:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import 'flowbite';
```

Then, reference this stylesheet in your layout file (e.g., `_Layout.cshtml`):

```html
<link href="~/css/styles.css" rel="stylesheet" />
```

### 4. **Run Tailwind CSS**

You need to run Tailwind CSS to process the `styles.css` file:

```bash
npx tailwindcss -i ./wwwroot/css/styles.css -o ./wwwroot/css/output.css --watch
```

Alternatively, you can set up a script in your `package.json` to simplify this process:

```json
"scripts": {
  "build:css": "tailwindcss -i ./wwwroot/css/styles.css -o ./wwwroot/css/output.css",
  "watch:css": "tailwindcss -i ./wwwroot/css/styles.css -o ./wwwroot/css/output.css --watch"
}
```

### 5. **Set Up Flowbite Chart**

To integrate Flowbite Charts, which use ApexCharts, follow these steps:

#### a) Enable Flowbite Charts

In the `tailwind.config.js` file, set charts to true within the Flowbite plugin options:

```javascript
plugins: [
  require('flowbite/plugin')({
      charts: true,
  }),
  // ... other plugins
]
```

#### b) Install ApexCharts

Install ApexCharts via npm and save it in your `package.json`:

```bash
npm install apexcharts --save
```

Alternatively, you can also include the CDN link in your layout file:

```html
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
```

### 6. **Create a View for Chart**

Create a new `.cshtml` file (for example, `Chart.cshtml`) and add the following code for a simple chart layout:

```html
<div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
  <div class="flex justify-between">
    <div>
      <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">32.4k</h5>
      <p class="text-base font-normal text-gray-500 dark:text-gray-400">Users this week</p>
    </div>
    <div
      class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
      12%
      <svg class="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
      </svg>
    </div>
  </div>
  <div id="area-chart"></div>
  <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
    <div class="flex justify-between items-center pt-5">
      <!-- Button -->
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="lastDaysdropdown"
        data-dropdown-placement="bottom"
        class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
        type="button">
        Last 7 days
        <svg class="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <!-- Dropdown menu -->
      <div id="lastDaysdropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
            </li>
          </ul>
      </div>
      <a
        href="#"
        class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
        Users Report
        <svg class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
      </a>
    </div>
  </div>
</div>
```

### 7. **Add JavaScript for Chart Rendering**

In the same view or your layout file, add the following JavaScript code for rendering the chart:

```csharp
@section Scripts {
<script>
    const options = {
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: 0
        },
      },
      series: [
        {
          name: "New users",
          data: [6500, 6418, 6456, 6526, 6356, 6456],
          color: "#1A56DB",
        },
      ],
      xaxis: {
        categories: ['01 February', '02 February', '03 February', '04 February', '05 February', '06 February', '07 February'],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    }

    if (

    document.getElementById("area-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("area-chart"), options);
      chart.render();
    }
</script>
}
```