# PDF Project -ADMIN

This guide serves as an introduction to our project focused on PDF-related development. Here, you'll find comprehensive details about the inception, objectives, and progress of our work in the realm of PDF technologies.

### Prerequisites

Make sure you have the following installed on your machine:

- [react-toastify](https://github.com/fkhadra/react-toastify#readme) for toast notifications
- [axios](https://axios-http.com/) for sending HTTP requests and handling responses
- [lodash](https://lodash.com/) for common programming tasks in JavaScript.
- [moment](https://momentjs.com/) for parsing, validating, manipulating, and formatting dates and times in JavaScript.
- [jwt-decode](https://github.com/auth0/jwt-decode#readme) for decoding JSON Web Tokens (JWT) in JavaScript.
- [pdfjs](https://github.com/rkusa/pdfjs) for rendering PDF files in the browser.
- [zustand](https://github.com/pmndrs/zustand) for managing state in React applications with a minimalistic approach.

### Main Initial Development Directory

```
PUBLIC/
├── src/
│ ├── app/
│ │ ├── [lng]/
│ │ │ ├── admin/
│ │ │ │ ├── workflows/
│ │ │ │ │ ├──pdf-innofyre/
│ │ │ │ │ | ├──[workflow_id]/
```

The ApplySign component is a React component designed for displaying and interacting with PDF documents within a web application. It offers features for users to add text, checkboxes, static images, and drawings to PDF files. Additionally, it facilitates the management of attachments and instructions associated with PDF documents, allowing users to save changes and upload attachments to a database.

In this directory, there are three folders in addition to page.js. They are as follows:

## constants

PDF Module Tools and Initial Data Configuration.This section outlines the tools and initial data configuration available within the PDF module.

### Tools Configuration

The tools array lists various tools available for use within the PDF module. Each tool is defined by its name and corresponding icon.

### Document Fields Configuration

The documentFields array contains different document fields that users can incorporate into their documents. Each field is defined with its name and associated icon.

### Placeholder Initial Data

The placeholderInitialData object provides initial data for different types of attachments (e.g., text, image, signature). This data includes properties like position, size, and type for each attachment type.

## helpers

This file provides utility functions to map attachment types and usage in a PDF module. It includes functions to map attachment types based on their usage, as well as to map usage based on attachment types. Additionally, there's a function to map instruction types to static image types if necessary.

### mapAttachmentTypeByUsage

This function maps attachment types based on their usage within the PDF module. It takes an attachment object as input and returns the corresponding attachment type, considering the specified usage scenario.

### mapUsageByAttachmentType

This function maps usage scenarios based on attachment types. Given an attachment type, it returns the corresponding usage scenario within the PDF module.

### mapInstructionTypeToStaticImage

This utility function maps instruction types to static image types if necessary. It determines whether a given type corresponds to an image or signature and converts it to a static image type for better management.

## impl

### Document Instruction Builder

This section provides utility functions for formatting attachments and building payload objects to create document instructions, guiding users through processes or tasks associated with a document.

### formatAttachmentForInstructionCreation

This function formats individual attachments for instruction creation, removing unnecessary properties, assigning attachment types based on usage, and adding essential details such as a unique key, order, page, dimensions, position, and user details.

### buildPayloadToCreateDocumentInstructions

This function builds the payload object required to create document instructions, aggregating attachments from all pages, transforming them into instructions using formatAttachmentForInstructionCreation, and handling any errors that may occur during the process.

## In this directory, the main development occurs in the page.js file. In this file, the descriptions are as follows:

Importent Component

### Dashboard Layout Component

```
PUBLIC/
├── src/
│ ├── app/
│ │ ├── components/
│ │ │ ├── pdf/
│ │ │ │ ├── DashboardLayout/

```

The DashboardLayout component is designed for the PDF module's dashboard layout, providing a structured interface for managing PDF documents and workflow tasks.

### PDF-Module Components

```
PUBLIC/
├── src/
│ ├── pdf-module/
│ │ ├── components/
│ │ │ ├── page.jsx
│ │ │ ├── attachments.jsx
│ │ │ ├── draggable-actions.jsx
│ │ │ ├── image-static.jsx
│ │ │ ├── menu-bar.jsx
│ │ │ ├── text-view.jsx
│ │ │ ├── text.jsx
│ │ │ ├── user-selection.jsx
│ │ │ ├── thumbnail-view.jsx
│ │ │ ├── text-options.jsx

```

- `page.jsx`: Is a designed for rendering PDF pages.
- `attachments`: Responsible for rendering a list of attachments based on the provided data.
- `thumbnail-view`: Rendering thumbnails of the pages within a PDF document. It leverages the pdfjs library to generate thumbnails dynamically for each page.
- `draggable-actions`: Is designed to be used within draggable elements in a user interface.
- `image-static`: This allows users to interact with the image element by performing various actions such as moving, resizing, and deleting.
- `menu-bar`: This component provides various actions and functionalities to interact with the PDF document being edited.
- `text-view`: This component allows users to view and interact with text content, providing various customization options and event handling functionalities.
- `text`: This component allows users to interactively add and edit text content within PDF documents.
- `user-selection`: This component provides a user-friendly interface for users to choose assignees from internal, external, or dynamic user pools and add them to specific placeholders within the document.
- `TextOptions`: This component is responsible for rendering a panel of options related to text styling. It allows users to customize properties such as font weight, font style, background color, and border style for selected text elements. The component dynamically updates based on the type of attachment selected on the page, providing appropriate options for text and image attachments.

### PDF-Module Modals Components

```
PUBLIC/
├── src/
│ ├── pdf-module/
│ │ ├── models/
│ │ │ ├── components/
│ │ │ │ ├── drawing-modal.jsx

```

- `drawing-modal.jsx`: Contains enums representing various aspects of the PDF module.

### utils Components

```
PUBLIC/
├── src/
│ ├── utils/
│ │ ├── utils.js

```

- `utils.js`: Specifically, it contains a function called getFirstPageOfPdfInImage that takes a base64-encoded PDF as input and returns the URL of the first page of the PDF as an image (in PNG format). Useful for tasks such as generating thumbnails or previews of PDF files.

### service Components

```
PUBLIC/
├── src/
│ ├── service/
│ │ ├── UserService.js

```

- `UserService.js`:contains a collection of functions for making HTTP requests to various endpoints using Axios and a custom HTTP service

Importent Hooks

### PDF-Module Hooks

```
PUBLIC/
├── src/
│ ├── pdf-module/
│ │ ├── hooks/
│ │ │ ├── use-pdf.js
│ │ │ ├── use-attachments.js
│ │ │ ├── use-uploader.js
│ │ │ ├── use-pdf-static.js

```

- `use-pdf.js`: The usePdf custom hook manages the state of a PDF viewer in a application. It encompasses the current page, page dimensions, PDF file, PDF name, and attachments. Additionally, it provides functions to navigate between pages, save the PDF, and initialize the state.

- `use-attachments.js`: Designed to manage attachments within a PDF module. It provides functions and state variables for efficiently handling attachments, including adding, removing, and updating attachments, setting the current page index, and loading instructions for attachments. This hook enables seamless management of attachments throughout the application.

- `use-uploader.js`: Handle file uploads in application.

- `use-pdf-static`: Handle static PDF files in a React application. It accepts options to specify the type of file to load (url_pdf), an optional callback function to handle the loaded PDF, and the file path or URL of the PDF file.

### PDF-Module Utils

```
PUBLIC/
├── src/
│ ├── pdf-module/
│ │ ├── utils/
│ │ │ ├── rest.ts
```

- `rest.ts`: Contains utility functions and API request handlers related to managing PDF documents and instructions.

### PDF-Module Entities

```
PUBLIC/
├── src/
│ ├── pdf-module/
│ │ ├── entities/
│ │ │ ├── index.ts

```

- `index.ts`: Contains enums representing various aspects of the PDF module

Importent Containers

#### CheckBox

```
The Checkbox component is a versatile tool designed for use within a PDF module, allowing users to interact with checkboxes embedded in PDF documents. This component provides functionality for rendering checkboxes, updating their positions, and managing user interactions such as dragging and editing.
```

- File directory

```
src/
|  ├──pdf-module/
|  |  ├──containers/
|  |  |  ├──checkbox.jsx
```

#### Drawing

```
The Drawing component represents a graphical drawing within a PDF document. It allows users to interact with drawings by moving or resizing them on the document page. This component is designed to handle user actions such as mouse clicks, drags, and resizing events.
```

- File directory

```
src/
|  ├──pdf-module/
|  |  ├──containers/
|  |  |  ├──drawing.jsx
```

#### ImageStatic

```
The ImageStatic component represents a static image element within a PDF viewer. It allows users to view and interact with images by providing functionalities such as moving the image within the document, handling mouse events, and triggering actions on image click.
```

- File directory

```
src/
|  ├──pdf-module/
|  |  ├──containers/
|  |  |  ├──image-static.jsx
```

#### Image

```
The Image component is a React-based module designed for handling image annotations within a PDF document. It provides functionalities for adding, resizing, moving, and deleting image annotations on a PDF page.
```

- File directory

```
src/
|  ├──pdf-module/
|  |  ├──containers/
|  |  |  ├──image.jsx
```

#### Text

```
The Text component represents a customizable text element within a web application. It allows users to input and manipulate text content with various functionalities such as editing, moving, and resizing.
```

- File directory

```
src/
|  ├──pdf-module/
|  |  ├──containers/
|  |  |  ├──text.jsx
```

#### TextView

```
The TextView component is responsible for rendering a text view within a PDF document. This component allows users to view and interact with text content, including editing and moving the text view within the document.
```

- File directory

```
src/
|  ├──pdf-module/
|  |  ├──containers/
|  |  |  ├──text-view.jsx
```

#### UseOptionStore

Is a custom React hook created with Zustand, a minimalist state management library. It provides a simple store for managing various UI options related to attachment panels and font weights.

- File directory

```
src/
|  ├──store/
|  |  ├──OptionStore.ts/

```

Importent Functions

### getDecodedToken

This file contains utility functions and dependencies used within the project. It includes functions for managing cookies, decoding JWT tokens, and interacting with external APIs.

```
src/
|  ├──utils/
|  |  ├──utils.js
```

### createDocumentInstructions

It sends a POST request to a specified endpoint in the PDF editor API, providing the necessary instructions object as the payload.

```
src/
|  ├──pdf-module/
|  |  ├──utils/
|  |  |  ├──rest.ts
```

### getDocumentInstructionsById

The getDocumentInstructionsById function is a utility for fetching document instructions by their unique identifier (ID) from a remote API.

```
src/
|  ├──pdf-module/
|  |  ├──utils/
|  |  |  ├──rest.ts
```

### getInternalUsers

The function sends an HTTP GET request to the specified API URL, appending the provided ID to the endpoint path. Upon successful execution, it retrieves internal user data from the server.

```
src/
|  ├──services/
|  |  ├──UsersService.js
```

### getExternalUsers

This function retrieves information about external users from a designated API endpoint.

```
src/
|  ├──services/
|  |  ├──UsersService.js
```

## Development Flow

### Component Structure

The ApplySign component follows a structured layout. The component structure includes:

- Dashboard display section.
- Pagination and thumbnail view sections.
- PDF content display section.
- Navigation controls section.
- Drawing modal component.

### Key Functionalities

#### PDF Rendering and Navigation

- The component utilizes the usePdf hook to render the PDF document and provides navigation controls to switch between pages.
- Thumbnail view is available for quick navigation through pages.

#### Attachments Management

- Attachments such as signatures and images can be added to the document.
- Placeholders are provided for attaching images and signatures to specific areas on the pages.

#### Document Submission

- Users can submit the document along with attachments.
- Submission involves processing document instructions and building submission arrays for answer submission.

#### User Interaction

- Users can interact with the PDF document, add attachments, and navigate through pages seamlessly.
- Feedback and loading indicators are provided to enhance user experience.

## Execution flow

### Initial Setup

1. State Initialization:

- Various states are initialized, including drawingModalOpen, numPages, fileDetails, placeholderId,currentBlockInfo, internalUsers and externalUsers.

2. Execution of useEffect Hooks:

- The first useEffect hook is executed to fetch internal and external users' data (getInternalAndExternalUsers).
- The second useEffect hook is executed to load the PDF file (pdf) and instructions (fetchInstructions) based on the 'currentBlockInfo'.
- The third useEffect hook is executed to update instructions with user information (updateInstructionsWithUserInfo).
- The function getInternalAndExternalUsers asynchronously retrieves internal and external user data. It concurrently fetches internal and external users' data using a ID. Upon completion, it sets the internal and external user data accordingly. If the requests are successful, it extracts the user data from the responses and sets them using the setInternalUsers and setExternalUsers functions. If either request fails, it sets the corresponding user data as an empty array.
- The pdf function is called to fetch document details. These details are then assigned to the staticPdf function within the usePdfStatic hook. Subsequently, this function invokes the pdfView function, passing the document details as the 'result' parameter.
- The function fetchInstructions asynchronously retrieves instructions associated with a document by its ID. It attempts to fetch instructions using the provided workflow_id. If the request is successful and returns data, it updates the current block information with the fetched instructions. In case of an error during the request or if the response doesn't contain any data, it logs the error and displays a toast notification indicating the failure to load instructions.
- The function updateInstructionsWithUserInfo updates instructions with user information based on the provided currentBlockInfo. It first checks if instructions exist in currentBlockInfo. Then, it retrieves the user ID from a decoded token. Next, it iterates over each instruction, extracting the user_id. If the user_id matches a specific pattern, it extracts the user ID and creates a user object with a first name and last name. If not, it searches for the user within internal or external users based on the ID. It then creates a user_name based on the found user's details or assigns a default value. Finally, it returns an array of updated instructions with the added user_name, and calls loadInstructions with the updated instructions and the user ID obtained earlier.

### PDF Initialization and Display

1. PDF Initialization:

- The usePdfStatic hook is utilized to load the PDF file specified in template*aws_path* into the viewer.
- The initializePageAndAttachments function initializes the PDF viewer with the loaded PDF details and resets attachment-related states.

2. Rendering PDF Viewer:

- The PDF viewer is rendered, consisting of pagination controls, the PDF display area, and attachment functionalities.
- The thumbnail view of the PDF is rendered, allowing users to navigate between pages.
