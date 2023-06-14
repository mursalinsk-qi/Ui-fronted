#!/bin/bash
NPMRC=../../.npmrc
REPOSITORY=https://quantuminventions.jfrog.io/quantuminventions/api/npm/npm/auth/qi

if [ -z "$1" ]; then
    echo "No arguments supplied! \n
    sh ./auth.sh [Artifactory Username] [Token]
    sh ./auth.sh jenkins AKCp5ZjzBbNFPiZmXak4QmHSEUVMYMiEou2LFYNXdLGRqeCGyLNa7J2eSwrFkLUupeVxPAjmu"
    exit 1
fi

# Requesting token if file is not present or present but empty
if ! [[ -f ${NPMRC} && -s "${NPMRC}" ]]; then
  curl -s -u"${1}":"${2}" ${REPOSITORY} >> ${NPMRC}
fi