#!/bin/bash

browser=$1

cwd=$(pwd)
newArtifactFolder="$cwd/ext-artifacts/$browser/ext-$(date +%s)/"
mkdir -pv $newArtifactFolder
cp $cwd/$browser/* $newArtifactFolder
cp $cwd/shared/* $newArtifactFolder
cp -R $cwd/icons $newArtifactFolder