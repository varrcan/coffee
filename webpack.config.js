require('webpack');
let path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

// Устанавливаем дополнительные пути статики
// =========================================
const nodePath            = path.join('node_modules/');
const customNodePath      = path.join('static/modules/');
const customNodePathBuild = path.join('static/build/');
const projectCssPath = path.join('static/build/css/');

const sourceMaps = (process.env.MODE === 'development') ? 'cheap-eval-source-map' : false;
const sourceMapsCss = (process.env.MODE === 'development');

module.paths.unshift(customNodePath);
module.paths.unshift(customNodePathBuild);

const extractSass = new ExtractTextPlugin({
    filename: '/css/[name].css',
    allChunks: true,
    disable: false
});


// Стартовый конфиг
// ===============
let config = {
    entry:  {
        // пример entry - меняем их на свои.
        'coffee': './static/src/index.jsx',
        'project': './static/sass/project.sass'
    },
    output: {
        path:       path.resolve(__dirname, 'static/bundle'),
        filename:   '[name].js',
        publicPath: '/static/bundle/'
    },
    module: {
        rules: [
            // JSX
            // ===
            {
                test:    /\.jsx$/,
                exclude: /node_modules/,
                loader:  'babel-loader'
            },

            // CSS
            // ===
            {
                test: /\.css$/,
                use:  ['style-loader', 'css-loader']
            },

            // SASS
            // ====
            {
                test: /\.(scss|sass)$/,
                use:  extractSass.extract({
                    fallback: "style-loader",
                    use:      [
                        {
                            loader: 'raw-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['ie >= 8', 'last 25 version']
                                    })
                                ],
                                sourceMap: sourceMapsCss
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                    publicPath: projectCssPath
                })
            },
        ]
    },

    // игнорируем папку с модулями для скорости. Можно раскомментировать.
    watchOptions: {ignored: /node_modules/},

    // метод сборки source-map. Sourcemaps включаются только в режиме development.
    devtool: sourceMaps,

    resolve:       {
        modules:    [nodePath, customNodePath, customNodePathBuild],
        extensions: ['.js', '.json', '.jsx']
    },

    plugins: [extractSass],

    resolveLoader: {
        modules: [nodePath]
    }

    // optimization: {
    //     runtimeChunk: 'single', // Extract the runtime to its own chunk
    //     splitChunks:  {
    //         chunks:      'all', // Split all chunks, not only dynamic ones
    //         name:        true,
    //         cacheGroups: {
    //             filter: {
    //                 priority:           -20,
    //                 reuseExistingChunk: true
    //             }
    //         }
    //     }
    // }
};

module.exports = config;
