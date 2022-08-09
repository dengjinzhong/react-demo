# 项目初始化
使用 Create React App 进行项目初始化
```shell
npx create-react-app react-demo
```
# 项目简化
为了项目简单，将 src 目录下只留 `App.js` 和 `index.js` 其他文件全部删除
```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

```javascript
// App.js
function App() {
  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default App;
```
