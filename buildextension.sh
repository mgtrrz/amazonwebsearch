#!/bin/bash

browser=$1
version=$2

if [ -z $version ]; then
    version=$(date +%s)
fi

cwd=$(pwd)
newArtifactFolder="$cwd/ext-artifacts/$browser/ext-$version/"

curFiles=($newArtifactFolder/*)
if [ ${#curFiles[@]} -gt 1 ]; then 
    echo "Current version is already built. Replacing.."; 
    rm -r $newArtifactFolder 
fi

mkdir -pv $newArtifactFolder
cp $cwd/$browser/* $newArtifactFolder
cp $cwd/shared/* $newArtifactFolder
cp -R $cwd/icons $newArtifactFolder