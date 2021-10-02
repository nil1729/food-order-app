#!/bin/sh

# Decrypt the file
echo $HOME
pwd
ls -al
# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" \
--output $HOME/runner/work/food-order-app/food-order-app/config/secret.json admin.json.gpg

# gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" \
# --output $HOME/client/src/firebase/config.js firebase-config.js.gpg