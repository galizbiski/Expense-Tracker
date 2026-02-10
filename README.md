# DataMate 📊

**DataMate** is a modern, client-side web application for analyzing, filtering, and visualizing CSV and Excel data instantly in your browser.

> 📘 **Documentation**: [View Project Requirements (PRD)](./PRD1.md)

![DataMate Preview](https://via.placeholder.com/800x400?text=DataMate+Preview) 
*(Replace with actual screenshot)*

## Features

- **📂 Multi-Format Support**: Upload `.csv`, `.xlsx`, or `.xls` files.
- **🔒 Privacy First**: All data processing happens locally in your browser. No data is uploaded to any server.
- **⚡ Instant Analysis**:
    - **Filtering**: Quickly find rows containing specific text.
    - **Sorting**: Sort columns in ascending or descending order.
    - **Metrics**: Calculate Sum, Average, Minimum, Maximum, and Count for numeric columns.
- **📱 Responsive Design**: Fully responsive dark-mode UI that works on desktop and tablets.
- **💾 Export**: Export your filtered datasets back to CSV.

## Getting Started

### Prerequisites

Since DataMate is a client-side application, you just need a modern web browser (Chrome, Firefox, Edge, Safari).

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/datamate.git
    ```
2.  Open the project folder.
3.  Open `index.html` in your browser.

That's it! No `npm install` or backend server required.

## Usage

> 📖 **User Guide**: For detailed instructions, open [help.html](./help.html) in your browser.

1.  **Upload**: Drag and drop a file into the upload zone or click "Example Data" to try it out.
2.  **Filter**: Select a column, type a value, and click "Add Filter" to narrow down your data.
3.  **Analyze**: Use the "Metrics" section to calculate stats on specific columns.
4.  **Export**: Click "Export" to save your current view as a new CSV file.

## Tech Stack

- **HTML5 & CSS3**: Custom "Dark Modern" theme using CSS Variables and Flexbox/Grid.
- **JavaScript (ES6+)**: Vanilla JS for logic and state management.
- **Libraries**:
    - [PapaParse](https://www.papaparse.com/) (CSV parsing)
    - [SheetJS (xlsx)](https://sheetjs.com/) (Excel parsing)
    - [FontAwesome](https://fontawesome.com/) (Icons)

## Scope & Limitations

This is an MVP (Minimum Viable Product) designed for:
- Files up to ~30MB (browser memory dependent).
- Flat tabular data (headers in row 1).

## License

MIT
