#!/bin/bash

app_name="amazon_web_search"

option=$1
browser=$2
version=$3

if [ -z $version ]; then
    version=$(date +%s)
fi

function pkg_ext() {
    cwd=$(pwd)
    releasesFolder="$cwd/ext-artifacts/releases/"
    newArtifactFolder="$cwd/ext-artifacts/$browser/ext-$version/"

    mkdir -pv $releasesFolder
    zip -r "$releasesFolder/${browser}_${app_name}_${version}.zip" ${newArtifactFolder}*
}

function build_ext() {
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
}

if [[ $option == "package" ]]; then
    build_ext;
    pkg_ext;
elif [[ $option == "build" ]]; then
    build_ext;
else
    echo "Please enter a valid option: build, package"
    exit 1
fi