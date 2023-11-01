export const cdnLink: { [x: string]: Array<string> } = {
  js: [
    'https://unpkg.com/redux@4.2.0/dist/redux.min.js',
    'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js'
  ]
}

export const webExternals: { [x: string]: string } = {
  react: 'React',
  'react-dom': 'ReactDOM',
  redux: 'Redux',
  'redux-thunk': 'ReduxThunk'
}
