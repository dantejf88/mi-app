#!/bin/bash
git checkout development
git add --all .
git commit -m "Automatic staging build for pm2 deploy."
git push origin development
# Terminate our shell script with success message
exit 0