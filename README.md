# PhysicsSimulator

## 概要

Webブラウザ上で動作する物理シミュレータ群

## 起動

Docker, docker-composeが整備された環境下で以下のコマンドを実行する．

```sh
(初回起動のみ)
$ make build

(デフォルトポートは50000)
$ PORT=xxxxx docker-compose up
```

## ディレクトリ構成

### core

基礎計算部分 (WebAssembly(Rust))

### front

GUI部分 (Node.js + React(TypeScript))

## Docker構成

### proxy

Nginxが動いているコンテナ  
アクセスは一度このコンテナで受け止める  

アクセス先に応じて次のように振り分ける

- /
  - kepler/ : (front)Node.js → 天体シミュレータKepler☆
- /sites/
  - kepler/ : (proxy)Nginx → Keplerが参照する静的コンテンツ

### front

Reactアプリケーションを動かす
