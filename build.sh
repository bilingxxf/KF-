#!/bin/bash

export PATH=PATH:/home/centos/.local/bin/:/usr/bin/
rm -rf dist

npm install
if node build/build.js
then
ssh -i ~/aws_key centos@10.0.0.110 "rm -rf /opt/public"
scp -i ~/aws_key -r dist centos@10.0.0.110:/opt/public
else
echo the build.js had error
fi
