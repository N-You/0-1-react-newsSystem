module.exports = {
  "presets": [
    ["@babel/preset-env",
    {
      "useBuiltIns": 'entry',//按需加载自动引入
      "corejs": "3.25.5"
    }],
    ["@babel/preset-react", {"runtime": "automatic"}],
    "@babel/preset-typescript",
]
}