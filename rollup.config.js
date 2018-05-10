import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-local-resolve'
import uglify from 'rollup-plugin-uglify'

const NODE_ENV = process.env.NODE_ENV || 'development'
const PROD = NODE_ENV === 'production'

export default {
  // core input options
  input: 'src/index.js',
  plugins: [
    babel({ include: 'src/**' }),
    resolve(),

    // production-only plugins
    PROD && uglify(),
  ].filter(Boolean),

  // danger zone
  treeshake: {
    pureExternalModules: true,
  },

  output: [
    !PROD && {
      // core output options
      file: `lib/redux-io-util.es.js`,
      format: 'es',
      name: 'redux-io-util',

      // advanced output options
      sourcemap: true,

      // danger zone
      exports: 'named',
    },
    {
      // core output options
      file: `lib/redux-io-util.${NODE_ENV}.js`,
      format: 'cjs',
      name: 'redux-io-util',

      // advanced output options
      sourcemap: true,

      // danger zone
      exports: 'named',
    },
  ].filter(Boolean),
}
