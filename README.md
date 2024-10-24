# Avalanche Turkish Validators

## Overview
Avalanche Turkish Validators is a Vue.js application that displays a list of validators for the Avalanche network, utilizing a card-based layout for better user experience. Each validator is represented as a card, showcasing important information such as username, node ID, delegation fee, uptime, and more.

## Features
- **Card-based UI**: Each validator is displayed in a card format, making it visually appealing and easy to read.
- **Dynamic Data Fetching**: The application fetches validator data from the Avalanche network and a JSON file containing additional validator information.
- **Error Handling**: Displays error messages if data fetching fails.
- **Responsive Design**: The layout adapts to different screen sizes, ensuring a good user experience on both desktop and mobile devices.

## Project Setup

### Prerequisites
- Node.js (version 12 or higher)
- npm (Node package manager)

### Installation
To set up the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/avalanche-turkish-validators.git
   cd avalanche-turkish-validators
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application
To run the application in development mode, use the following command:
```bash
npm run serve
```
This will start a local development server. Open your browser and navigate to `http://localhost:8080` to view the application.

### Building for Production
To compile and minify the application for production, run:
```bash
npm run build
```
The compiled files will be available in the `dist` directory.

### Linting
To lint and fix files, use:
```bash
npm run lint
```

## Customize Configuration
For more information on customizing the configuration, refer to the [Vue CLI Configuration Reference](https://cli.vuejs.org/config/).

## Contributing
Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Thanks to the Avalanche community for their support and resources.
- Special thanks to the developers of Vue.js for creating such a powerful framework.
