module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
  globals: {
    __DEV__: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'import', 'react-hooks'],
  rules: {
    // Aponte inconsistências do prettier como erro
    'prettier/prettier': 'error',
    // Aponte como aviso o uso de jsx em arquivos diferentes de jsx ou js
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    // Não obrigue export default em arquivos com uma única exportação
    'import/prefer-default-export': 'off',
    // Não aponte erro ao utilizar console.tron
    'no-console': ['error', { allow: ['tron'] }],
    // Não aponte erro ao editar variáveis recebidas na função
    'no-param-reassign': 'off',
    // Não obrigue usar this em funções de classes
    'class-methods-use-this': 'off',
    // Avise sobre qualquer erro no uso das hooks
    'react-hooks/rules-of-hooks': 'error',
    // Avise sobre falta de dependências em useEffect
    'react-hooks/exhaustive-deps': 'warn',
    // Permita repassar propriedades como {...props}
    'react/jsx-props-no-spreading': 'off',
    // Permite usar variável _id vinda do mongo
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
  settings: {
    'import/resolver': {},
  },
};
