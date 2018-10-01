#!/bin/bash
git checkout master
git add --all .
git commit -m "Automatic production build for pm2 deploy."
git push origin master
# Terminate our shell script with success message
exit 0