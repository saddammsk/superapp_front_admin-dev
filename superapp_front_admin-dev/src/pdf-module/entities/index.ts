/**
 * Enum representing the different modules in the PDF module.
 */
export enum PdfModule {
  ASSIGNEE = 'Assignee',
}

/**
 * Enum representing the different drag actions.
 */
export enum DragActions {
  MOVE = 'MOVE',
  SCALE = 'SCALE',
  NO_MOVEMENT = 'NO_MOVEMENT',
}

/**
 * Enum representing different colors.
 */
export enum Color {
  RED = 'red',
  ORANGE = 'orange',
  YELLOW = 'yellow',
  OLIVE = 'olive',
  GREEN = 'green',
  TEAL = 'teal',
  BLUE = 'blue',
  VIOLOET = 'violet',
  PURPLE = 'purple',
  BROWN = 'brown',
  GREY = 'grey',
  BLACK = 'black',
  // Add more enum values here if needed
}

/**
 * Enum representing different attachment types.
 */
export enum AttachmentTypes {
  IMAGE = 'image',
  SIGNATURE = 'signature',
  TEXT = 'text',
  CHECKBOX = 'checkbox',
  TEXT_VIEW = 'autogenerated',
  IMAGE_STATIC = 'imageStatic',
  // Add more enum values here if needed
}

/**
 * Enum representing different text modes.
 */
export enum TextMode {
  INSERT = 'insert',
  COMMAND = 'command',
  // Add more enum values here if needed
}

/**
 * Enum representing the usage of image placeholders.
 */
export enum ImagePlaceHolderUsage {
  IMAGE = 'imagePlaceholder',
  SIGNATURE = 'signaturePlaceholder',
  // Add more enum values here if needed
}

/**
 * Enum representing different user types.
 */
export enum UserTypes {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  RESPONSIBLES = 'responsibles',
  DYNAMIC = 'dynamic',
  // Add more enum values here if needed
}

export enum FontWeights {
  LIGHT = '200',
  NORMAL = '400',
  SEMI_BOLD = '600',
  BOLD = '700',
  BOLDER = '800',
  // Add more enum values here if needed
}

export enum FontStyle {
  NORMAL = 'normal',
  ITALIC = 'italic',
  OBLIQUE = 'oblique',
}

export enum BackgroundColor {
  NONE = 'none',
  LIGHT_GRAY = '#d3d3d3',
  BLACK = '#000000',
}

export enum Borders {
  NONE = 'none',
  SOLID = '1px solid #000000',
  DASHED = '2px dashed #000000',
}

export enum Text {
  SIZE_DEFAULT = 12,
  TEXT_DEFAULT = 'Aa',
}
