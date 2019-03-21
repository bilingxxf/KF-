#!/bin/bash
npm install
cp  static/config.json    static/configOnline.json
if npm  run  build
then
ssh   app@192.168.2.211 "rm -rf /home/app/WWW/oucloud/dist"
scp  -r dist app@192.168.2.211:/home/app/WWW/oucloud/
echo 'scp success '
else
echo the build.js had error
fi
