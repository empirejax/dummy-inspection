module.exports = {
  printWidth: 100, // Specify the code length, exceed the bank
  tabWidth: 2, // tab Bond width
  useTabs: false, // Do not use tab
  semi: true, // End with a segment number
  singleQuote: true, // Use single quotation number
  quoteProps: 'as-needed', // See whether the object's literal quantity attribute is wrapped in quotation marks,(‘as-needed’: No special requirements, prohibited use,'consistent': be consistent , preserve: No limit, just use it if you want to use it)
  jsxSingleQuote: false, // jsx Use single quotes in grammar
  trailingComma: 'es5', // Make sure that the last attribute of the object is comma after the attribute
  bracketSpacing: true, // Large brackets have space { name: 'rose' }
  jsxBracketSameLine: false, // Add in the last line of multi -line JSX elements >
  arrowParens: 'always', // Arrow function, a single parameter add brackets
  requirePragma: false, // Whether the code is formatted in strictly according to the special annotation of the file at the top of the file
  insertPragma: false, // Whether to insert the Pragma mark at the top of the format file to indicate that the file has been formatted by the Prettier
  proseWrap: 'preserve', // Fold according to the original file
  htmlWhitespaceSensitivity: 'ignore', // The space sensitivity of the html file, whether the space is controlled to affect the layout
  endOfLine: 'auto', // At the end \n \r \n\r auto
};
