#!/bin/bash

# Variables:
#   SIZE: Cache Size in Mb
#   NX_CACHE_DIR: The path to the NX cache directory

set -e

# Create a potential empty folder.
mkdir -p $NX_CACHE_DIR

# This script accepts as an argument a number of megabytes. It will then
# delete entries in the nx cache, oldest first, until the overall size
# of the folder's contents is beneath that number of megabytes.

maxSizeKB=$(($SIZE*1024)) # in MB

# Sort files by modification time, oldest first
taskHashes=($(ls -tr "$NX_CACHE_DIR" | grep '\.commit$' | cut -d'.' -f1))

# Calculate current total size
totalSize=0
for hash in "${taskHashes[@]}"; do
  totalSize=$((totalSize + $(du -sk "$NX_CACHE_DIR/$hash"                 | cut -f 1)))
  totalSize=$((totalSize + $(du -sk "$NX_CACHE_DIR/$hash.commit"          | cut -f 1)))
  totalSize=$((totalSize + $(du -sk "$NX_CACHE_DIR/terminalOutputs/$hash" | cut -f 1)))
done

echo "Starting total size: $totalSize, requested max size: $maxSizeKB KB"

# Delete oldest files until the total size is below the threshold
i=0
while [ "$totalSize" -gt "$maxSizeKB" ]; do
  hash=${taskHashes[$i]}
  totalSize=$((totalSize - $(du -sk "$NX_CACHE_DIR/$hash"                 | cut -f 1)))
  totalSize=$((totalSize - $(du -sk "$NX_CACHE_DIR/$hash.commit"          | cut -f 1)))
  totalSize=$((totalSize - $(du -sk "$NX_CACHE_DIR/terminalOutputs/$hash" | cut -f 1)))

  echo "Deleting files associated with hash $hash; totalSize is now $totalSize"
  rm -rf "$NX_CACHE_DIR/$hash"
  rm -rf "$NX_CACHE_DIR/$hash.commit"
  rm -rf "$NX_CACHE_DIR/terminalOutputs/$hash"
  i=$i+1
done

echo "Finished total size: $totalSize"
