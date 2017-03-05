import typescript from 'rollup-plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import sass from 'rollup-plugin-sass';
import uglify from 'rollup-plugin-uglify';

const config = {
  entry: './src/client/entry.ts',
  dest: './dist/client/scripts/bundle.js',
  format: 'es',
  plugins: [
    sass({
      output: './dist/client/styles/bundle.css',
    }),
    nodeResolve({
      module: true,
      jsnext: true,
      browser: true,
      extensions: [ '.js', '.json', '.ts', '.tsx' ]
    }),
    commonjs({
      include: 'node_modules/**',
      extensions: [ '.js', '.json', '.ts', '.tsx' ],
      ignoreGlobal: false,
      sourceMap: false,
      namedExports: {
        'node_modules/react-dom/index.js': [ 'render' ],
        'node_modules/react/react.js': [ 'Component', 'PropTypes', 'Children', 'createElement' ]
      }
    }),
    typescript({ 
      "tsconfig": false,
      "typescript": require('typescript'),
      "allowJs": false,
      "outFile": "dist/client/scripts/bundle.js",
      "jsx": "react",
      "jsxFactory": "React.createElement",
      "target": "es5",
      "lib": [
        "ES7",
        "dom"
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV )
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = config.plugins.concat([
    uglify()
  ])
}

export default config
