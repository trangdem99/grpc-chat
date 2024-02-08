#!/bin/bash

# ./node_modules/.bin/proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=protos/ protos/*.proto

mkdir -p ./views/src/protos
protoc -I=. ./protos/*.proto \
  --js_out=import_style=commonjs,binary:./views/src \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./views/src